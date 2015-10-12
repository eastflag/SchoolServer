package com.aura.smartschool.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.exceptions.PersistenceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.AbstractView;

import com.aura.smartschool.domain.BoardVO;
import com.aura.smartschool.domain.MemberVO;
import com.aura.smartschool.domain.NotiVO;
import com.aura.smartschool.domain.SearchVO;
import com.aura.smartschool.domain.SmsVO;
import com.aura.smartschool.result.Result;
import com.aura.smartschool.result.ResultData;
import com.aura.smartschool.result.ResultDataTotal;
import com.aura.smartschool.service.MobileService;
import com.aura.smartschool.util.CommonUtil;
import com.aura.smartschool.util.SmsUtil;

@Controller
public class AuraHomeController {

	private static Logger logger = LoggerFactory.getLogger(AuraHomeController.class);
	
	@Autowired
	private MobileService mobileService;
	
	private String randomString(int len){
		String n = "0123456789";
		Random rnd = new Random();
		
		StringBuilder sb = new StringBuilder( len );
			for( int i = 0; i < len; i++ ) { 
				int t = rnd.nextInt(n.length());
				if(i==0 && t==0){
					i--; continue;
				}else{
					sb.append( n.charAt( t ) );
				}
			}
		return sb.toString();
	}
	
	@RequestMapping(value={"/aura/index","/aura/login","/aura/notice", "/aura/request","/aura/introduce","/aura/inquiry"}, method=RequestMethod.GET)
	public String aura(HttpServletRequest request){
		
		return "home/index";
	}
	
	/**
	 * 전화번호 인증
	 * @param rphone
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/aura/api/getSmsCertifyKey", method=RequestMethod.POST)
	public Result requestSmsCertifyKey(
			@RequestBody MemberVO in,
			HttpSession session){
		//회원여부 확인
		MemberVO member = mobileService.getMemberByMdn(in);
		if(member==null){
			return new Result(100, "Request failed!");
		}else {
			//전화번호 인증
			//랜덤 6자리숫자 만들기
			String certifyKey = this.randomString(6);
			String msg = "[인증번호:"+certifyKey+"]\n인증번호를 입력해주세요.";
			logger.info(msg);
			
			SmsVO sms = new SmsVO();
			sms.setMsg(msg);
			sms.setRphone(member.getMdn());
			sms.setSmsType("S");		//SMS 단문
			//sms.setTestflag("Y");	//테스트 요청 설정
			
			//SMS 전송
			try {
				String[] rMsg = SmsUtil.smsSend(sms);
				logger.debug(rMsg[0]);
				session.setAttribute("certifyKey", certifyKey);
				Map<String,Object> data = new HashMap<String,Object>();
				data.put("rsCode", rMsg[0]);
				
				return new Result(0, rMsg[0]);
			} catch (Exception e) {
				e.printStackTrace();
				return new Result(200, e.getMessage());
			}
		}
	}
	
	/**
	 * 로그인
	 * @param MemberVO in
	 * @param HttpSession session
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/aura/api/login", method=RequestMethod.POST)
	public ResultData<Map<String,Object>> login(
			@RequestBody MemberVO in,
			HttpSession session){
		ResultData<Map<String,Object>> result = null;
		String certifyKey = (String) session.getAttribute("certifyKey");
		
		//인증번호 확인
		if(!certifyKey.equals(in.getCertifyKey())){
			logger.debug("not equal certifyKey!!");
			result = new ResultData<Map<String,Object>>(100,"인증번호를 다시 확인하세요.");
		}else {
			MemberVO member = mobileService.getMemberByMdn(in);
			if(member != null){
				/*
				 * 구성원 리스트 조회
				HomeVO home = new HomeVO();
				home.setHome_id(member.getHome_id());
				List<MemberVO> memberList = mobileService.getMemberList(home); 
				ResultData<List<MemberVO>> result = new ResultData<List<MemberVO>>(0, "success", memberList);
				*/
				//인증번호삭제
				session.removeAttribute("certifyKey");
				
				try {
					Map<String,Object> data = new HashMap<String,Object>();
					//토큰만들기
					String token = CommonUtil.createJWT(member.getHome_id(), member.getHome_id(), String.valueOf(member.getMember_id()), 600 * 60 * 1000);
					data.put("token", token);
					data.put("member_id", member.getMember_id());
					data.put("mdn", member.getMdn());
					result = new ResultData<Map<String,Object>>(0, "success", data);
				} catch (IOException e) {
					result = new ResultData<Map<String,Object>>(200, "오류가 발생하였습니다.\n잠시후에 시도하세요.");
				} 
			} else {
				result = new ResultData<Map<String,Object>>(300, "입력하신 휴대폰번호를 확인하세요.");
			}
		}
		return result;
	}
	
	/**
	 * 로그아웃 시, 세션의 회원정보 삭제
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/aura/api/logout")
	public Result logout(HttpSession session){
		session.removeAttribute("user");
		session.invalidate();
		
		return new Result(0,"success");
	}
	
	/**
	 * 공지사항 조회
	 * @param SearchVO search
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/aura/api/getNotiList")
	public ResultData<List<NotiVO>> getNotiList(@RequestBody SearchVO search) {
		logger.debug("Request URL : /aura/api/getNotiList");
		List<NotiVO> notiList = new ArrayList<NotiVO>();
		int total = mobileService.countNotiList(search);
		logger.debug("Total Count : "+total);
		if(total>0){
			notiList = mobileService.getNotiList(search);
		}else{
			NotiVO noti = new NotiVO();
			noti.setTitle("등록된 공지사항이 없습니다.");
			notiList.add(noti);
		}

		return new ResultDataTotal<List<NotiVO>>(0, "success", notiList, total);
	}
	
	/**
	 * 회원정보조회
	 * @param in
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/aura/api/getMemberInfo", method=RequestMethod.POST)
	public ResultData<MemberVO> getMemberInfo(@RequestBody MemberVO in){
		
		MemberVO member = mobileService.getMemberByMdn(in);
		return new ResultData<MemberVO>(0,"success", member);
	}
	
	/**
	 * 문의하기 등록
	 * @param BoardVO in
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/aura/api/requestQnA", method=RequestMethod.POST)
	public Result requestQnA(@RequestBody BoardVO in){
		try {
			in.setBoard_type(1);
			long resultCount = mobileService.addBoard(in);
			if(resultCount > 0) {
				return new Result(0, "success");
			} else {
				return new Result(100, "insert failed");
			}
		} catch (PersistenceException e) {
			return new Result(100, "insert failed");
		}
	}
	
	@RequestMapping("/aura/download/doc")
	public View downloadDocument(
			@RequestParam(value="g") String g){
		
		final File file = new File("path", g);
		
		View view = new AbstractView(){

			@Override
			protected void renderMergedOutputModel(
					Map<String, Object> arg0, HttpServletRequest req, HttpServletResponse res) throws Exception {
				res.setContentType("application/octet-stream");
				res.setContentLength((int)file.length());
				res.setHeader("Content-Transfer-Encoding", "binary");
				res.setHeader("Content-Disposition", "attachment;filename=\""+file.getName()+"\";");
				
				OutputStream out = res.getOutputStream();
				FileInputStream fis = null;
				
				try{
					fis = new FileInputStream(file);
					FileCopyUtils.copy(fis,out);
				}
				catch(IOException ioe){
					ioe.printStackTrace();
				}
				finally{
					if(fis != null) fis.close();
					if(out != null) out.close();
				}
			}
			
		};
		
		return view;
	}
	
	/**
	 * 공지사항 - 목록
	 * @param start_index
	 * @param page_size
	 * @param model
	 * @return
	@RequestMapping("/aura/notice")
	public String noticeList(
			@RequestParam(value="page",defaultValue="1") int page
			,@RequestParam(value="page_size",defaultValue="10") int page_size
			,ModelMap model){
		
		SearchVO search = new SearchVO();
		search.setStart_index((page-1)*page_size);
		search.setPage_size(page_size);
		
		int total = mobileService.countNotiList(search);
		logger.info("Total : "+total);
		model.addAttribute("total", total);
		//model.addAttribute("pagination", paginagionRenderder("/aura/notice/list", page, page_size, total));
		if(total>0){
			model.addAttribute("list", mobileService.getNotiList(search));
		}
		
		return "home/notice/notice";
	}
	 */
	
	/**
	@RequestMapping(value="/aura/login", method=RequestMethod.POST)
	public String login(){
		return "home/login";
	}
	
	@RequestMapping(value="/aura/notice", method=RequestMethod.POST)
	public String login(){
		return "home/notice";
	}
	
	@RequestMapping(value="/aura/request", method=RequestMethod.POST)
	public String login(){
		return "home/request";
	}
	
	@RequestMapping(value="/aura/customer", method=RequestMethod.GET)
	public String customer(){
		
		return "home/customer";
	}
	*/
}

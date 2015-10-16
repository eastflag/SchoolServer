package com.aura.smartschool.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.exceptions.PersistenceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aura.smartschool.domain.BoardVO;
import com.aura.smartschool.domain.MemberVO;
import com.aura.smartschool.domain.NotiVO;
import com.aura.smartschool.domain.PressVO;
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
	
	/**
	 * 전화번호 인증
	 * @param rphone
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/home/api/getSmsCertifyKey")
	public Result requestSmsCertifyKey(
			@RequestBody MemberVO in,
			HttpServletRequest reqst,
			HttpSession session){
		logger.debug("/home/api/getSmsCertifyKey");
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
			sms.setTestflag("Y");	//테스트 요청 설정
			
			//SMS 전송
			try {
				String[] rMsg = SmsUtil.smsSend(sms);
				logger.debug(rMsg[0]);
				session.setAttribute("certifyKey", certifyKey);
				Map<String,Object> data = new HashMap<String,Object>();
				data.put("rsCode", rMsg[0]);
				
				logger.debug((String) session.getAttribute("certifyKey")); 
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
	@RequestMapping(value="/home/api/login")
	public ResultData<Map<String,Object>> login(
			@RequestBody MemberVO in,
			HttpServletRequest reqst,
			HttpSession session){
		logger.debug("/home/api/login");
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
				logger.debug((String) session.getAttribute("certifyKey")); 
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
	 * 공지사항 조회
	 * @param SearchVO search
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/home/api/getNotiList")
	public ResultDataTotal<List<NotiVO>> getNotiList(@RequestBody SearchVO search) {
		logger.debug("/home/api/getNotiList");
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
	 * 언론자료 조회
	 * @param SearchVO search
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/home/api/getPressList")
	public ResultDataTotal<List<PressVO>> getPressList(@RequestBody SearchVO search){
		List<PressVO> pressList = new ArrayList<PressVO>();
		logger.debug("/home/api/getPressList");
		int total = mobileService.countPressList(search);
		if(total > 0){
			pressList = mobileService.getPressList(search);
		}else{
			PressVO press = new PressVO();
			press.setTitle("등록된 언론자료가 없습니다.");
			pressList.add(press);
		}
		return new ResultDataTotal<List<PressVO>>(0, "success", pressList, total);
	}
	
	/**
	 * 회원정보조회
	 * @param in
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/home/api/getMemberInfo")
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
	@RequestMapping(value="/home/api/requestQnA", method=RequestMethod.POST, headers="Accept=application/json")
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
}

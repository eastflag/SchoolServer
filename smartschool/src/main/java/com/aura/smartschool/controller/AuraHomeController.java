package com.aura.smartschool.controller;

import java.io.ByteArrayInputStream;
import java.io.DataInputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.rowset.serial.SerialException;

import org.apache.ibatis.exceptions.PersistenceException;
import org.apache.tomcat.util.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.aura.smartschool.domain.BoardVO;
import com.aura.smartschool.domain.ChallengeVO;
import com.aura.smartschool.domain.HomeVO;
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
import com.google.gson.Gson;

@RestController
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
	@RequestMapping(value="/web/api/getSmsCertifyKey")
	public Result requestSmsCertifyKey(
			@RequestBody MemberVO in,
			HttpServletRequest reqst,
			HttpSession session){
		logger.debug("/web/api/getSmsCertifyKey");
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
				session.setAttribute("member", member);
				
				String[] rMsg = SmsUtil.smsSend(sms);
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
	
	@RequestMapping("/web/api/confirmCertify")
	public ResultData<Map<String,Object>> confirmCertify(
			@RequestBody SmsVO sms,
			HttpServletRequest reqst,
			HttpSession session){
		
		String certifyKey = String.valueOf(session.getAttribute("certifyKey"));
		logger.info("session certifyKey => "+certifyKey);
		logger.info("params certifyKey => "+sms.getCertifyKey());
		
		if(certifyKey.equals(sms.getCertifyKey())){
			MemberVO myInfo = (MemberVO)session.getAttribute("member");
			
			session.removeAttribute("certifyKey");
			session.removeAttribute("member");
			
			Map<String,Object> data = new HashMap<String,Object>();
			data.put("home_id", myInfo.getHome_id());
			
			return new ResultData<Map<String,Object>>(0, "success", data);
		}else{
			return new ResultData<Map<String,Object>>(100, "confirm failed", null);
		}
	}
	
	/**
	 * 로그인
	 * @param MemberVO in
	 * @param HttpSession session
	 * @return
	 */
	@RequestMapping(value="/web/api/login")
	public ResultData<MemberVO> login(@RequestBody MemberVO in){
		logger.debug("/web/api/login------------------------------------");
		
		//회원여부 조회
		MemberVO myInfo = mobileService.signInOfWeb(in);
		if(myInfo != null){
			return new ResultData<MemberVO>(0, "success", myInfo);
		}else{
			return new ResultData<MemberVO>(100, "login failed", null);
		}
	}
	
	/**
	 * 공지사항 조회
	 * @param SearchVO search
	 * @return
	 */
	@RequestMapping(value="/web/api/getNotiList")
	public ResultDataTotal<List<NotiVO>> getNotiList(@RequestBody SearchVO search) {
		logger.debug("/web/api/getNotiList");
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
	@RequestMapping(value="/web/api/getPressList")
	public ResultDataTotal<List<PressVO>> getPressList(@RequestBody SearchVO search){
		List<PressVO> pressList = new ArrayList<PressVO>();
		logger.debug("/web/api/getPressList");
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
	 * 언론자료 상세
	 * @param in
	 * @return
	 */
	@RequestMapping(value="home/api/getPress")
	public ResultData<PressVO> getPress(@RequestBody PressVO in){
		PressVO rs = mobileService.getPress(in);
		if(rs != null){
			return new ResultData<PressVO>(0,"success", rs);
		}else{
			return new ResultData<PressVO>(100,"no-data", new PressVO());
		}
	}
	
	/**
	 * 회원정보조회
	 * @param in
	 * @return
	 */
	@RequestMapping(value="/web/api/getMember")
	public ResultData<MemberVO> getMember(@RequestBody MemberVO in){
		
		return new ResultData<MemberVO>(0,"success", mobileService.selectMember(in));
	}
	
	/**
	 * 문의하기 등록
	 * @param BoardVO in
	 * @return
	 */
	@RequestMapping(value="/web/api/requestQnA")
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
	
	/**
	 * 도전건강 목록[상위 5개]
	 * @param search
	 * @return
	 */
	@RequestMapping(value="/web/api/getChallengeTop5List")
	public ResultData<List<ChallengeVO>> getChallengeTop5List(){
		return new ResultData<List<ChallengeVO>>(0,"success", mobileService.getChallengeTop5List());
	}

	/**
	 * 도전건강! 응모하기
	 * @param request
	 * @param data
	 * @param files
	 * @return
	 */
	@RequestMapping(value="/web/api/addChallenge")
	public Result addChallenge(HttpServletRequest request, @ModelAttribute ChallengeVO challenge) {
		logger.debug("/web/api/addChallenge---------------------------------------------------");
		String path = request.getServletContext().getRealPath("/upload") + "challenge/"+challenge.getHome_id();
		//String path = request.getServletContext().getRealPath("/upload") + "/challenge/"+challenge.getHome_id();
		logger.debug("path : " + path);
		
		try{
			int rs = this.mobileService.addChallenge(challenge, path);
			if (rs != 0) {
				return new Result(0, "success");
			}else{
				return new Result(100, "오류가 발생하였습니다.\n잠시후에 시도하세요.");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(200, "오류가 발생하였습니다.\n잠시후에 시도하세요.");
		}
	}
	
	/**
	 * 회원가입(아우라웹)
	 * @param request
	 * @param member
	 * @return
	 */
	@RequestMapping("/web/api/signUpWeb")
	public Result signUpWeb(
			HttpServletRequest request,
			@RequestParam(value="data") String data,
			@RequestParam(value="profile", required=false) MultipartFile file) {
		logger.debug("/web/api/signUpWeb----------------------------------------------------------------");
		
		Result rs = null;
		try { 
			Gson gson = new Gson();
			MemberVO member = gson.fromJson(data, MemberVO.class);
			
			rs = mobileService.signUpWeb(member,file);
			
			return rs;
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("Exception");
			return new Result(500, "server error");
		}
	}
	
	/**
	 * 프로필 이미지 보기
	 * @param member_id
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping("/profile/{member_id}")
	public ResponseEntity<byte[]> showImage(
			@PathVariable("member_id") int member_id
			,HttpServletResponse response
			,ModelMap model){
		
		MemberVO member = mobileService.getMemberProfile(member_id);
		if(member != null){
			byte[] imageContent = Base64.decodeBase64(member.getPhoto());
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.IMAGE_JPEG);
			return new ResponseEntity<byte[]>(imageContent, headers, HttpStatus.OK);
		} else {
			return null;
		}
		
	}
	
	/**
	 * 가족구성원 추가
	 * @param request
	 * @param data
	 * @param file
	 * @return
	 */
	@RequestMapping("/web/api/addMember")
	public Result addMember(HttpServletRequest request,
			@RequestParam(value="data") String data,
			@RequestParam(value="profile", required=false) MultipartFile file) {
		logger.debug("/web/api/addMember----------------------------------------------------------------");
		
		Result rs = null;
		try { 
			Gson gson = new Gson();
			MemberVO member = gson.fromJson(data, MemberVO.class);
			
			rs = mobileService.addMember(member,file);
			
			return rs;
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("Exception");
			return new Result(500, "server error");
		}
	}
	
	/**
	 * 가족구성원 수정
	 * @param request
	 * @param data
	 * @param file
	 * @return
	 */
	@RequestMapping("/web/api/modMember")
	public Result modMember(HttpServletRequest request,
			@RequestParam(value="data") String data,
			@RequestParam(value="profile", required=false) MultipartFile file) {
		logger.debug("/web/api/modMember----------------------------------------------------------------");
		
		try { 
			Gson gson = new Gson();
			MemberVO member = gson.fromJson(data, MemberVO.class);
			
			long rs = mobileService.modMember(member,file);
			
			if(rs != 0){
				return new Result(0, "success");
			}else{
				return new Result(100, "fail");
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("Exception");
			return new Result(500, "server error");
		}
	}
}

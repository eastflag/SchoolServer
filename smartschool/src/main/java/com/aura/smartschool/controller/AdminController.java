package com.aura.smartschool.controller;

import java.util.List;

import org.apache.ibatis.exceptions.PersistenceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aura.smartschool.domain.ConsultVO;
import com.aura.smartschool.domain.ManagerVO;
import com.aura.smartschool.domain.MemberVO;
import com.aura.smartschool.domain.SchoolNotiVO;
import com.aura.smartschool.domain.SchoolVO;
import com.aura.smartschool.domain.SearchVO;
import com.aura.smartschool.domain.SessionVO;
import com.aura.smartschool.result.Result;
import com.aura.smartschool.result.ResultData;
import com.aura.smartschool.result.ResultDataTotal;
import com.aura.smartschool.service.MobileService;
import com.aura.smartschool.util.NetworkUtil;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

@RestController
public class AdminController {
	private static Logger logger = LoggerFactory.getLogger(AdminController.class);
	
	@Autowired
	private MobileService mobileService;
    
	//get school list of member
	@RequestMapping("/admin/api/getSchoolListOfMember")
    public ResultData<List<SchoolVO>> getSchoolListOfMember(@RequestBody SearchVO search) {
		logger.debug("/admin/api/getSchoolListOfMember-------------------------------------------");
		List<SchoolVO> schoolList = mobileService.getSchoolListOfMember(search);
		int total = mobileService.countSchoolListOfMember(search);
		
		return new ResultDataTotal<List<SchoolVO>>(0, "success", schoolList, total);
	}
	
	@RequestMapping("/admin/api/modifySchool")
    public Result updateSchool(@RequestBody SchoolVO school) {
		logger.debug("/admin/api/modifySchool----------------------------------------------------");
		
		long resultCount = mobileService.updateSchool(school);
		if(resultCount > 0) {
			return new Result(0, "success");
		} else {
			return new Result(100, "update failed");
		}
	}
	
	@RequestMapping("/admin/api/addSchoolNoti")
    public Result addSchoolNoti(@RequestBody SchoolNotiVO noti) {
		logger.debug("/admin/api/addSchoolNoti---------------------------------------------------");
		long resultCount = mobileService.addSchoolNoti(noti);
		if(resultCount > 0) {
			//send gcm
			SchoolVO school = new SchoolVO();
			school.setSchool_id(noti.getSchool_id());;
			List<MemberVO> memberList = mobileService.selectMemberOfSchool(school);
			JsonArray array = new JsonArray(); //get gcm_id
			for(MemberVO m : memberList) {
				array.add(new JsonPrimitive(m.getGcm_id()));
			}
			
			JsonObject data = new JsonObject();
			JsonObject value = new JsonObject();
			value.addProperty("category", noti.getCategory());
			value.addProperty("title", noti.getTitle());
			value.addProperty("content", noti.getContent());
			value.addProperty("noti_date", noti.getNoti_date());
			data.addProperty("command", "school");
			data.addProperty("value", value.toString());
			
			NetworkUtil.requestGCM(array, data);
			
			return new Result(0, "success");
		} else {
			return new Result(100, "update failed");
		}
	}
	
	@RequestMapping("/admin/api/modifySchoolNoti")
    public Result modifySchoolNoti(@RequestBody SchoolNotiVO noti) {
		logger.debug("/admin/api/modifySchoolNoti------------------------------------------------");
		long resultCount = mobileService.modifySchoolNoti(noti);
		if(resultCount > 0) {
			return new Result(0, "success");
		} else {
			return new Result(100, "update failed");
		}
	}
	
	@RequestMapping("/admin/api/removeSchoolNoti")
    public Result removeSchoolNoti(@RequestBody SchoolNotiVO noti) {
		logger.debug("/admin/api/removeSchoolNoti------------------------------------------------");
		long resultCount = mobileService.removeSchoolNoti(noti);
		if(resultCount > 0) {
			return new Result(0, "success");
		} else {
			return new Result(100, "update failed");
		}
	}
	
	@RequestMapping("/admin/api/getSchoolNotiList")
    public ResultData<List<SchoolNotiVO>> getSchoolNotiList(@RequestBody SchoolNotiVO noti) {
		logger.debug("/admin/api/getSchoolNotiList-----------------------------------------------");
		List<SchoolNotiVO> notiList = mobileService.getSchoolNotiList(noti);
		int total = mobileService.countSchoolNotiList(noti);
		return new ResultDataTotal<List<SchoolNotiVO>>(0, "success", notiList, total);
	}
	
	
	
	//add session and consult
	@RequestMapping("/admin/api/addConsult")
    public Result addConsult(@RequestBody SessionVO inSession) {
		logger.debug("/admin/api/addConsult----------------------------------------------------");
		SessionVO outSession = mobileService.selectSession(inSession);
		
		int session_id;
		if(outSession == null) {
			mobileService.insertSession(inSession);
			SessionVO session = mobileService.selectLastSession();
			session_id = session.getSession_id();
		} else {
			session_id = outSession.getSession_id();
		}
		ConsultVO consult = new ConsultVO();
		consult.setSession_id(session_id);
		consult.setContent(inSession.getContent());
		consult.setWho(inSession.getWho());
		mobileService.insertConsult(consult);
		
		//if who is 1, send gcm : member_id = > gcm id, content
		if(inSession.getWho() == 1) {
			JsonArray array = new JsonArray(); //get gcm_id
			MemberVO m = new MemberVO();
			m.setMember_id(inSession.getMember_id());
			MemberVO member = mobileService.selectMember(m);
			array.add(new JsonPrimitive(member.getGcm_id()));
			
			JsonObject data = new JsonObject();
			JsonObject value = new JsonObject();
			value.addProperty("category", inSession.getCategory());
			value.addProperty("content", inSession.getContent());
			data.addProperty("command", "consult");
			data.addProperty("value", value.toString());
			
			NetworkUtil.requestGCM(array, data);
		}
		
		return new Result(0, "success");
	}
	
	//get current session
	@RequestMapping("/admin/api/getSessionList")
    public ResultData<List<SessionVO>> getSessionList(@RequestBody SessionVO inSession) {
		logger.debug("/admin/api/getSessionList--------------------------------------------------");
		List<SessionVO> sessionList = mobileService.selectSessionOngoingList(inSession);

		return new ResultData<List<SessionVO>>(0, "success", sessionList);
	}
	
	//get consult list
	@RequestMapping("/admin/api/getConsultList")
    public ResultData<List<ConsultVO>> getConsultList(@RequestBody SessionVO inSession) {
		logger.debug("/admin/api/getConsultList--------------------------------------------------");
		List<ConsultVO> consultList = mobileService.selectConsultList(inSession);

		return new ResultData<List<ConsultVO>>(0, "success", consultList);
	}
	
	//관리자화면: 사용자 관리=====================================================================
	@RequestMapping("/admin/api/addManager")
    public Result addManager(@RequestBody ManagerVO manager) {
		logger.debug("/api/addManager-------------------------------------------------------------");
		
		try {
			long resultCount = mobileService.addManager(manager);
			if(resultCount > 0) {
				return new Result(0, "success");
			} else {
				return new Result(100, "insert failed");
			}
		} catch (PersistenceException e) {
			return new Result(100, "insert failed");
		} 
	}
	
	@RequestMapping("/admin/api/modifyManager")
    public Result modifyManager(@RequestBody ManagerVO manager) {
		logger.debug("/api/modifyManager----------------------------------------------------------");
		
		long resultCount = mobileService.modifyManager(manager);
		if(resultCount > 0) {
			return new Result(0, "success");
		} else {
			return new Result(100, "update failed");
		}
	}
	
	@RequestMapping("/admin/api/removeManager")
    public Result removeManager(@RequestBody ManagerVO manager) {
		logger.debug("/api/removeManager----------------------------------------------------------");
		
		long resultCount = mobileService.removeManager(manager);
		if(resultCount > 0) {
			return new Result(0, "success");
		} else {
			return new Result(100, "delete failed");
		}
	}
	
	@RequestMapping("/admin/api/getManager")
    public ResultData<ManagerVO> getManager(@RequestBody ManagerVO inManager) {
		logger.debug("/api/getManager--------------------------------------------------");
		ManagerVO manager = mobileService.getManager(inManager);
		
		if(manager == null) {
			return new ResultData<ManagerVO>(100, "fail", manager);
		} else {
			manager.setPass("");
			return new ResultData<ManagerVO>(0, "success", manager);
		}
	}
	
	@RequestMapping("/admin/api/getManagerList")
    public ResultData<List<ManagerVO>> getManagerList(@RequestBody SearchVO search) {
		logger.debug("/api/getManagerList--------------------------------------------------");
		List<ManagerVO> managerList = mobileService.getManagerList(search);
		
		int total = mobileService.countManager(search);
		
		return new ResultDataTotal<List<ManagerVO>>(0, "success", managerList, total);
	}
}

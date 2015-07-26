package com.aura.smartschool.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aura.smartschool.domain.SchoolNoti;
import com.aura.smartschool.domain.SchoolVO;
import com.aura.smartschool.result.Result;
import com.aura.smartschool.result.ResultData;
import com.aura.smartschool.result.ResultDataTotal;
import com.aura.smartschool.service.MobileService;

@RestController
public class AdminController {
	private static Logger logger = LoggerFactory.getLogger(AdminController.class);
	
	@Autowired
	private MobileService mobileService;
    
	//get school list of member
	@RequestMapping("/admin/api/getSchoolListOfMember")
    public ResultData<List<SchoolVO>> getSchoolListOfMember(@RequestBody SchoolVO school) {
		logger.debug("/admin/api/getSchoolListOfMember-------------------------------------------");
		List<SchoolVO> schoolList = mobileService.getSchoolListOfMember(school);
		int total = mobileService.countSchoolListOfMember();
		
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
    public Result addSchoolNoti(@RequestBody SchoolNoti noti) {
		logger.debug("/admin/api/modifySchool----------------------------------------------------");
		long resultCount = mobileService.addSchoolNoti(noti);
		if(resultCount > 0) {
			return new Result(0, "success");
		} else {
			return new Result(100, "update failed");
		}
	}
	
	@RequestMapping("/admin/api/modifySchoolNoti")
    public Result modifySchoolNoti(@RequestBody SchoolNoti noti) {
		logger.debug("/admin/api/modifySchoolNoti------------------------------------------------");
		long resultCount = mobileService.modifySchoolNoti(noti);
		if(resultCount > 0) {
			return new Result(0, "success");
		} else {
			return new Result(100, "update failed");
		}
	}
	
	@RequestMapping("/admin/api/removeSchoolNoti")
    public Result removeSchoolNoti(@RequestBody SchoolNoti noti) {
		logger.debug("/admin/api/removeSchoolNoti------------------------------------------------");
		long resultCount = mobileService.removeSchoolNoti(noti);
		if(resultCount > 0) {
			return new Result(0, "success");
		} else {
			return new Result(100, "update failed");
		}
	}
	
	@RequestMapping("/admin/api/getSchoolNotiList")
    public ResultData<List<SchoolNoti>> getSchoolNotiList(@RequestBody SchoolNoti noti) {
		logger.debug("/admin/api/getSchoolNotiList-----------------------------------------------");
		List<SchoolNoti> notiList = mobileService.getSchoolNotiList(noti);
		int total = mobileService.countSchoolNotiList(noti);
		return new ResultDataTotal<List<SchoolNoti>>(0, "success", notiList, total);
	}
}

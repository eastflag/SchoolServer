package com.aura.smartschool.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aura.smartschool.domain.Home;
import com.aura.smartschool.domain.Mobile;
import com.aura.smartschool.result.Result;
import com.aura.smartschool.service.MobileService;

@RestController
public class ApiController {
	
	@Autowired
	private MobileService mobileService;
    
	//로그인하기 :home_id, mdn
	@RequestMapping("/api/signIn")
    public Result<List<Mobile>> signIn(@RequestBody Mobile mobile) {
		//home_id, mdn이 존재하는지 체크, 
		int is_exist = mobileService.signIn(mobile);
		//존재한다면 학생 정보를 리턴
		if(is_exist >0) {
			List<Mobile> mobileList = mobileService.getFamily(mobile); 
			return new Result<List<Mobile>>(0, "success", mobileList);
		} else {
			return new Result<List<Mobile>>(100, "login id does not exist", null);
		}
    }
	
	//가입하기
	@Transactional
	@RequestMapping("/api/signUp")
    public Result signUp(@RequestBody Mobile mobile) {
		//home_id가 없다면 home_id를 먼저 생성후 mobile 생성
		if(mobile.getHome_id() == 0) {
			Home home = new Home();
	        mobileService.insertHome(home);  //인서트후 primary키를 리턴받는다.
	        mobile.setHome_id(home.getHome_id());
	        
	        mobileService.insertMobile(mobile);
	        return new Result(0, "success");
		} else {
			mobileService.insertMobile(mobile);
			//home_id와 매핑된 가족 정보를 리턴한다.
			List<Mobile> mobileList = mobileService.getFamily(mobile);
			return new Result(0, "success", mobileList);
		}
    }
}

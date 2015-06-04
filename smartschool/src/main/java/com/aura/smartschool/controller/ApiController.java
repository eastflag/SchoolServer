package com.aura.smartschool.controller;

import java.sql.SQLException;
import java.sql.SQLSyntaxErrorException;
import java.util.List;

import org.apache.ibatis.exceptions.PersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aura.smartschool.domain.Home;
import com.aura.smartschool.domain.Member;
import com.aura.smartschool.result.Result;
import com.aura.smartschool.result.ResultData;
import com.aura.smartschool.result.SignIn;
import com.aura.smartschool.service.MobileService;

@RestController
public class ApiController {
	
	@Autowired
	private MobileService mobileService;
    
	//로그인하기 :home_id, mdn
	@RequestMapping("/api/signIn")
    public ResultData<SignIn> signIn(@RequestBody Member member) {
		//home_id 존재하는지 체크, 
		Member myInfo = mobileService.signIn(member);
		//존재한다면 구성원 리스트를 리턴
		if(myInfo != null) {
			List<Member> memberList = mobileService.getMemberList(member); 
			
			SignIn signInData = new SignIn();
			signInData.setMyInfo(myInfo);
			signInData.setMemberList(memberList);
			ResultData<SignIn> result = new ResultData<SignIn>(0, "success", signInData);
			
			return result;
		} else {
			return new ResultData<SignIn>(100, "login failed", null);
		}
    }
	
	//회원가입
	@Transactional
	@RequestMapping("/api/signUp")
    public Result signUp(@RequestBody Member member) {
		int result = 0;
		String msg = "success";
		try { 
			Home home = new Home();
			home.setHome_id(member.getHome_id());
			
			//home_id 가 존재하는지 체크
			if(mobileService.selectHome(home) > 0) {
				result = 100;
				msg = "home_id exists";
			} else {
				long insertCount = mobileService.insertHome(home);
				System.out.println("insertCount:" + insertCount);
				if(insertCount > 0) {
					mobileService.insertMember(member);
				}
			}
		} catch (PersistenceException e) {
			System.out.println("PersistenceException:");
			result = 500;
			msg = "server error";
		}
		
		return new Result(result, msg);
    }
	
	//구성원 등록
	@RequestMapping("/api/addMember")
    public Result addMember(@RequestBody Member member) {
		try {
			long resultCount = mobileService.insertMember(member);
			if(resultCount > 0) {
				return new Result(0, "success");
			} else {
				return new Result(100, "insert failed");
			}
		} catch (PersistenceException e) {
			return new Result(100, "insert failed");
		} 
	}
	
	//구성원 수정
	@RequestMapping("/api/updateMember")
    public Result updateMember(@RequestBody Member member) {
		System.out.println("school_name:" + member.getSchool_name());
		
		long resultCount = mobileService.updateMember(member);
		if(resultCount > 0) {
			return new Result(0, "success");
		} else {
			return new Result(100, "update failed");
		}

	}
}

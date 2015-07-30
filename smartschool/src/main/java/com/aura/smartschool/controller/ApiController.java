package com.aura.smartschool.controller;

import java.util.List;

import org.apache.ibatis.exceptions.PersistenceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aura.smartschool.domain.AreaVO;
import com.aura.smartschool.domain.BodyMeasureGrade;
import com.aura.smartschool.domain.BodyMeasureSummary;
import com.aura.smartschool.domain.ConsultVO;
import com.aura.smartschool.domain.Home;
import com.aura.smartschool.domain.LocationVO;
import com.aura.smartschool.domain.MeasureItem;
import com.aura.smartschool.domain.Member;
import com.aura.smartschool.domain.SchoolVO;
import com.aura.smartschool.domain.SessionVO;
import com.aura.smartschool.result.Result;
import com.aura.smartschool.result.ResultData;
import com.aura.smartschool.service.MobileService;

@RestController
public class ApiController {
	
	private static Logger logger = LoggerFactory.getLogger(ApiController.class);
	
	@Autowired
	private MobileService mobileService;
    
	//로그인하기 :home_id, mdn
	@RequestMapping("/api/signIn")
    public ResultData<List<Member>> signIn(@RequestBody Member member) {
		logger.debug("/api/signIn----------------------------------------------------------------");
		
		//home_id 존재하는지 체크, 
		Member myInfo = mobileService.signIn(member);
		//존재한다면 구성원 리스트를 리턴
		if(myInfo != null) {
			Home home = new Home();
			home.setHome_id(member.getHome_id());
			List<Member> memberList = mobileService.getMemberList(home); 
			ResultData<List<Member>> result = new ResultData<List<Member>>(0, "success", memberList);
			//reg id update
			mobileService.updateGcmId(member);
			
			return result;
		} else {
			return new ResultData<List<Member>>(100, "login failed", null);
		}
    }
	
	//회원가입
	@Transactional
	@RequestMapping("/api/signUp")
    public Result signUp(@RequestBody Member member) {
		logger.debug("/api/signUp----------------------------------------------------------------");
		
		int result = 0;
		String msg = "success";
		try { 
			Home home = new Home();
			home.setHome_id(member.getHome_id());
			
			//home_id 가 존재하는지 체크
			if(mobileService.selectHome(home) > 0) {
				result = 100;
				msg = "home_id exists";
			} else if (mobileService.selectMember(member) != null) {
				result = 200;
				msg = "phone number already registered";
			} else {
				long insertCount = mobileService.insertHome(home);
				logger.debug("insertCount:" + insertCount);
				if(insertCount > 0) {
					mobileService.insertMember(member);
				}
			}
		} catch (PersistenceException e) {
			logger.debug("PersistenceException:");
			result = 500;
			msg = "server error";
		}
		
		return new Result(result, msg);
    }
	
	//가족 멤버 등록
	@RequestMapping("/api/addMember")
    public Result addMember(@RequestBody Member member) {
		logger.debug("/api/addMember-------------------------------------------------------------");
		
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
	
	//가족 멤버 수정
	@RequestMapping("/api/updateMember")
    public Result updateMember(@RequestBody Member member) {
		logger.debug("/api/updateMember----------------------------------------------------------");
		
		long resultCount = mobileService.updateMember(member);
		if(resultCount > 0) {
			return new Result(0, "success");
		} else {
			return new Result(100, "update failed");
		}

	}
	
	//가족 멤버 리스트 가져오기
	@RequestMapping("/api/getMemberList")
    public Result getMemberList(@RequestBody Home home) {
		logger.debug("/api/getMemberList---------------------------------------------------------");
		
		List<Member> memberList = mobileService.getMemberList(home);
		
		if(memberList.size() > 0) {
			return new ResultData<List<Member>>(0, "success", memberList);
		} else {
			return new ResultData<List<Member>>(100, "home id does not exist", memberList);
		}
	}
	
	//자녀 위치 등록
	@RequestMapping("/api/addLocation")
    public Result addLocation(@RequestBody LocationVO location) {
		logger.debug("/api/addLocation-----------------------------------------------------------");
		
		int result = 0;
		String msg = "success";
		try {
			mobileService.insertLocation(location);
		} catch (PersistenceException e) {
			result = 500;
			msg = "server error";
		} 
		return new Result(result, msg);
	}
	
	//오늘날짜의 위치 데이터 가져오기
	@RequestMapping("/api/getLocationList")
    public Result getLocationList(@RequestBody Member member) {
		logger.debug("/api/getLocationList-------------------------------------------------------");
		
		List<LocationVO> locationList = mobileService.selectLocationList(member);
		
		if(locationList.size() > 0) {
			return new ResultData<List<LocationVO>>(0, "success", locationList);
		} else {
			return new ResultData<List<LocationVO>>(100, "location does not exist", locationList);
		}
	}
	
	//오늘날짜의 가장 최근 위치 가져오기
	@RequestMapping("/api/getLastLocation")
	public Result getLastLocation(@RequestBody Member member) {
		logger.debug("/api/getLastLocation-------------------------------------------------------");
		
		LocationVO location = mobileService.selectLastLocation(member);
		
		if(location == null) {
			return new ResultData<LocationVO>(100, "location does not exist", location);
		} else {
			return new ResultData<LocationVO>(0, "success", location);
		}
	}
	
	//학교 검색 API
	@RequestMapping("/api/getSchoolList")
	public Result getSchoolList(@RequestBody SchoolVO school) {
		logger.debug("/api/getSchoolList---------------------------------------------------------");
		
		List<SchoolVO> schoolList = mobileService.getSchoolList(school);
		
		if(schoolList.size() > 0) {
			return new ResultData<List<SchoolVO>>(0, "success", schoolList);
		} else {
			return new ResultData<List<SchoolVO>>(100, "school does not exist", schoolList);
		}
	}
	
	
	@RequestMapping("/api/addArea")
	public Result addArea(@RequestBody AreaVO area) {
		logger.debug("/api/addArea---------------------------------------------------------------");
		
		long result = mobileService.addArea(area);
		
		if(result > 0) {
			return new Result(0, "success");
		} else {
			return new Result(100, "fail");
		}
	}
	
	@RequestMapping("/api/getArea")
	public Result getArea(@RequestBody AreaVO area) {
		logger.debug("/api/getArea---------------------------------------------------------------");
		
		AreaVO areaVO = mobileService.getArea(area);
		
		if(areaVO == null) {
			return new ResultData<AreaVO>(100, "area does not exist", areaVO);
		} else {
			return new ResultData<AreaVO>(0, "success", areaVO);
		}
	}
	
	@RequestMapping("/api/getAreaList")
    public Result getMemberList() {
		logger.debug("/api/getAreaList-----------------------------------------------------------");
		
		List<AreaVO> areaList = mobileService.getAreaList();
		
		if(areaList.size() > 0) {
			return new ResultData<List<AreaVO>>(0, "success", areaList);
		} else {
			return new ResultData<List<AreaVO>>(100, "area does not exist", areaList);
		}
	}
	
	
	//학생 신체정보 가져오기
	@RequestMapping("/api/getMeasureSummary")
	public Result getMeasureSummary(@RequestBody Member member) {
		logger.debug("/api/getMeasureSummary-----------------------------------------------------");
		
		BodyMeasureSummary summary = mobileService.getSummary(member);
		if(summary != null) {
			return new ResultData<BodyMeasureSummary>(0, "success", summary);
		} else {
			return new ResultData<BodyMeasureSummary>(100, "data does not exist", summary);
		}
	}
	
	//학생 신체정보 가져오기
	@RequestMapping("/api/getHeight")
	public Result getHeight(@RequestBody Member m) {
		logger.debug("/api/getHeight-----------------------------------------------------");
		ResultData<MeasureItem> result = new ResultData<MeasureItem>();
		
		MeasureItem vo = new MeasureItem();
		
		BodyMeasureGrade bodyMeasureGrade = mobileService.getMeasureGrade(m, "Height");
		if(bodyMeasureGrade != null) {
			vo.setValue(bodyMeasureGrade.getValue());
			vo.setBeforeValue(bodyMeasureGrade.getBeforeValue());
			vo.setGradeId(bodyMeasureGrade.getGradeId());
			vo.setGradeString(bodyMeasureGrade.getGradeDesc());
			vo.setSchoolGrade(bodyMeasureGrade.getSchoolGrade());
			vo.setBeforeSchoolGrade(bodyMeasureGrade.getBeforeSchoolGrade());
			vo.setTotalNumberOfStudent(bodyMeasureGrade.getTotalNumberOfStudent());
			vo.setAverageOfClass(bodyMeasureGrade.getAverageOfClass());
			vo.setAverageOfSchool(bodyMeasureGrade.getAverageOfSchool());
			vo.setAverageOfLocal(bodyMeasureGrade.getAverageOfLocal());
			//전국 평균은 향후 데이터가 많아지면 추출 예정
			vo.setAverageOfNation(bodyMeasureGrade.getAverageOfLocal());
			vo.setAverageOfStandard(bodyMeasureGrade.getAverageOfNation());
			vo.setRank(bodyMeasureGrade.getRank());
			vo.setBeforeRank(bodyMeasureGrade.getBeforeRank());
			
			result.setResult(0);
			result.setMsg("success");
			result.setData(vo);
		} else {
			
			result.setResult(100);
			result.setMsg("error");
		}
		
		return result;
	}
	
	@RequestMapping("/api/getWeight")
	public Result getWeight(@RequestBody Member m) {
		logger.debug("/api/getWeight-----------------------------------------------------");
		ResultData<MeasureItem> result = new ResultData<MeasureItem>();
		
		MeasureItem vo = new MeasureItem();
		
		BodyMeasureGrade bodyMeasureGrade = mobileService.getMeasureGrade(m, "Weight");
		if(bodyMeasureGrade != null) {
			vo.setValue(bodyMeasureGrade.getValue());
			vo.setBeforeValue(bodyMeasureGrade.getBeforeValue());
			vo.setGradeId(bodyMeasureGrade.getGradeId());
			vo.setGradeString(bodyMeasureGrade.getGradeDesc());
			vo.setSchoolGrade(bodyMeasureGrade.getSchoolGrade());
			vo.setBeforeSchoolGrade(bodyMeasureGrade.getBeforeSchoolGrade());
			vo.setTotalNumberOfStudent(bodyMeasureGrade.getTotalNumberOfStudent());
			vo.setAverageOfClass(bodyMeasureGrade.getAverageOfClass());
			vo.setAverageOfSchool(bodyMeasureGrade.getAverageOfSchool());
			vo.setAverageOfLocal(bodyMeasureGrade.getAverageOfLocal());
			//전국 평균은 향후 데이터가 많아지면 추출 예정
			vo.setAverageOfNation(bodyMeasureGrade.getAverageOfLocal());
			vo.setAverageOfStandard(bodyMeasureGrade.getAverageOfNation());
			vo.setRank(bodyMeasureGrade.getRank());
			vo.setBeforeRank(bodyMeasureGrade.getBeforeRank());
			
			result.setResult(0);
			result.setMsg("success");
			result.setData(vo);
		} else {
			
			result.setResult(100);
			result.setMsg("error");
		}
		
		return result;
	}
	
	//get consult list
	@RequestMapping("/api/getConsultList")
    public ResultData<List<ConsultVO>> getConsultList(@RequestBody SessionVO inSession) {
		logger.debug("/api/getConsultList--------------------------------------------------");
		SessionVO session = mobileService.selectSession(inSession);
		
		if(session == null) {
			return new ResultData<List<ConsultVO>>(100, "data does not exist", null);
		} else {
			List<ConsultVO> consultList = mobileService.selectConsultList(session);

			return new ResultData<List<ConsultVO>>(0, "success", consultList);
		}
	}
}

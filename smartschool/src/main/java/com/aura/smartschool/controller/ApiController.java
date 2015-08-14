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

import com.aura.smartschool.domain.ActivityVO;
import com.aura.smartschool.domain.AreaVO;
import com.aura.smartschool.domain.BoardVO;
import com.aura.smartschool.domain.BodyMeasureGrade;
import com.aura.smartschool.domain.BodyMeasureSummary;
import com.aura.smartschool.domain.ConsultVO;
import com.aura.smartschool.domain.HomeVO;
import com.aura.smartschool.domain.LocationVO;
import com.aura.smartschool.domain.MeasureItem;
import com.aura.smartschool.domain.MemberVO;
import com.aura.smartschool.domain.NotiVO;
import com.aura.smartschool.domain.PayVO;
import com.aura.smartschool.domain.SchoolVO;
import com.aura.smartschool.domain.SearchVO;
import com.aura.smartschool.domain.SessionVO;
import com.aura.smartschool.result.Result;
import com.aura.smartschool.result.ResultData;
import com.aura.smartschool.result.ResultDataTotal;
import com.aura.smartschool.service.MobileService;

@RestController
public class ApiController {
	
	private static Logger logger = LoggerFactory.getLogger(ApiController.class);
	
	@Autowired
	private MobileService mobileService;
    
	//로그인하기 :home_id, mdn
	@RequestMapping("/api/signIn")
    public ResultData<List<MemberVO>> signIn(@RequestBody MemberVO member) {
		logger.debug("/api/signIn----------------------------------------------------------------");
		
		//home_id 존재하는지 체크, 
		MemberVO myInfo = mobileService.signIn(member);
		//존재한다면 구성원 리스트를 리턴
		if(myInfo != null) {
			HomeVO home = new HomeVO();
			home.setHome_id(member.getHome_id());
			List<MemberVO> memberList = mobileService.getMemberList(home); 
			ResultData<List<MemberVO>> result = new ResultData<List<MemberVO>>(0, "success", memberList);
			//reg id update
			mobileService.updateGcmId(member);
			
			return result;
		} else {
			return new ResultData<List<MemberVO>>(100, "login failed", null);
		}
    }
	
	@RequestMapping("/api/getHomeList")
	public Result getHomeList(@RequestBody SearchVO search) {
		logger.debug("/api/getHomeList-----------------------------------------------------------");
		
		List<HomeVO> homeList = mobileService.selectHomeList(search);
		int total = mobileService.countHomeList(search);
		
		return new ResultDataTotal<List<HomeVO>>(0, "success", homeList, total);
	}
	
	//회원가입
	@Transactional
	@RequestMapping("/api/signUp")
    public Result signUp(@RequestBody MemberVO member) {
		logger.debug("/api/signUp----------------------------------------------------------------");
		
		int result = 0;
		String msg = "success";
		try { 
			HomeVO home = new HomeVO();
			home.setHome_id(member.getHome_id());
			
			//home_id 가 존재하는지 체크
			if(mobileService.countHome(home) > 0) {
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
    public Result addMember(@RequestBody MemberVO member) {
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
    public Result updateMember(@RequestBody MemberVO member) {
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
    public Result getMemberList(@RequestBody HomeVO home) {
		logger.debug("/api/getMemberList---------------------------------------------------------");
		
		List<MemberVO> memberList = mobileService.getMemberList(home);
		
		if(memberList.size() > 0) {
			return new ResultData<List<MemberVO>>(0, "success", memberList);
		} else {
			return new ResultData<List<MemberVO>>(100, "home id does not exist", memberList);
		}
	}
	
	@RequestMapping("/api/getPayList")
    public Result getPayList(@RequestBody MemberVO member) {
		logger.debug("/api/getPayList---------------------------------------------------------");
		
		List<PayVO> payList = mobileService.getPayList(member);
		
		return new ResultData<List<PayVO>>(0, "success", payList);

	}
	
	@RequestMapping("/api/addPay")
    public Result addPay(@RequestBody PayVO pay) {
		logger.debug("/api/addPay---------------------------------------------------------");
		
		long result = mobileService.addPay(pay);
		
		return new Result(0, "success");
	}
	
	@RequestMapping("/api/modifyPay")
    public Result modifyPay(@RequestBody PayVO pay) {
		logger.debug("/api/modifyPay---------------------------------------------------------");
		
		long result = mobileService.modifyPay(pay);
		
		return new Result(0, "success");
	}
	
	@RequestMapping("/api/removePay")
    public Result removePay(@RequestBody PayVO pay) {
		logger.debug("/api/removePay---------------------------------------------------------");
		
		long result = mobileService.removePay(pay);
		
		return new Result(0, "success");
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
    public Result getLocationList(@RequestBody MemberVO member) {
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
	public Result getLastLocation(@RequestBody MemberVO member) {
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
    public Result getAreaList() {
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
	public Result getMeasureSummary(@RequestBody MemberVO member) {
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
	public Result getHeight(@RequestBody MemberVO m) {
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
	public Result getWeight(@RequestBody MemberVO m) {
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
	

	@RequestMapping("/api/getNotiList")
    public ResultData<List<NotiVO>> getNotiList() {
		logger.debug("/api/getNotiList--------------------------------------------------");
		List<NotiVO> notiList = mobileService.getNotiList();
		
		if(notiList == null) {
			return new ResultData<List<NotiVO>>(100, "data does not exist", null);
		} else {
			return new ResultData<List<NotiVO>>(0, "success", notiList);
		}
	}
	
	@RequestMapping("/api/addNoti")
    public Result addNoti(@RequestBody NotiVO inNoti) {
		logger.debug("/api/addNoti-------------------------------------------------------------");
		
		try {
			long resultCount = mobileService.addNoti(inNoti);
			if(resultCount > 0) {
				return new Result(0, "success");
			} else {
				return new Result(100, "insert failed");
			}
		} catch (PersistenceException e) {
			return new Result(100, "insert failed");
		} 
	}
	
	@RequestMapping("/api/modifyNoti")
    public Result modifyNoti(@RequestBody NotiVO inNoti) {
		logger.debug("/api/modifyNoti----------------------------------------------------------");
		
		long resultCount = mobileService.modifyNoti(inNoti);
		if(resultCount > 0) {
			return new Result(0, "success");
		} else {
			return new Result(100, "update failed");
		}
	}
	
	@RequestMapping("/api/removeNoti")
    public Result removeNoti(@RequestBody NotiVO inNoti) {
		logger.debug("/api/removeNoti----------------------------------------------------------");
		
		long resultCount = mobileService.removeNoti(inNoti);
		if(resultCount > 0) {
			return new Result(0, "success");
		} else {
			return new Result(100, "delete failed");
		}
	}
	
	@RequestMapping("/api/getBoardList")
    public ResultData<List<BoardVO>> getBoardList(@RequestBody BoardVO inBoard) {
		logger.debug("/api/getBoardList--------------------------------------------------");
		List<BoardVO> boardList = mobileService.getBoardList(inBoard);
		
		if(boardList == null) {
			return new ResultData<List<BoardVO>>(100, "data does not exist", null);
		} else {
			return new ResultData<List<BoardVO>>(0, "success", boardList);
		}
	}
	
	@RequestMapping("/api/addBoard")
    public Result addBoard(@RequestBody BoardVO inBoard) {
		logger.debug("/api/addBoard-------------------------------------------------------------");
		
		try {
			long resultCount = mobileService.addBoard(inBoard);
			if(resultCount > 0) {
				return new Result(0, "success");
			} else {
				return new Result(100, "insert failed");
			}
		} catch (PersistenceException e) {
			return new Result(100, "insert failed");
		} 
	}
	
	@RequestMapping("/api/modifyBoard")
    public Result modifyBoard(@RequestBody BoardVO inBoard) {
		logger.debug("/api/modifyBoard----------------------------------------------------------");
		
		long resultCount = mobileService.modifyBoard(inBoard);
		if(resultCount > 0) {
			return new Result(0, "success");
		} else {
			return new Result(100, "update failed");
		}
	}
	
	@RequestMapping("/api/removeBoard")
    public Result removeBoard(@RequestBody BoardVO inBoard) {
		logger.debug("/api/removeBoard----------------------------------------------------------");
		
		long resultCount = mobileService.removeBoard(inBoard);
		if(resultCount > 0) {
			return new Result(0, "success");
		} else {
			return new Result(100, "delete failed");
		}
	}
	
	//활동량
	@RequestMapping("/api/getActivityList")
    public ResultData<List<ActivityVO>> getActivityList(@RequestBody ActivityVO inActivity) {
		logger.debug("/api/getActivityList--------------------------------------------------");
		List<ActivityVO> activityList = mobileService.getActivityList(inActivity);
		
		return new ResultData<List<ActivityVO>>(0, "success", activityList);
	}
	
	@RequestMapping("/api/addActivity")
    public Result addActivity(@RequestBody ActivityVO inActivity) {
		logger.debug("/api/addActivity-------------------------------------------------------------");
		
		try {
			long resultCount = mobileService.addActivity(inActivity);
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

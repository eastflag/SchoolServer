package com.aura.smartschool.service;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.exceptions.PersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aura.smartschool.Constant;
import com.aura.smartschool.domain.ActivityVO;
import com.aura.smartschool.domain.AreaVO;
import com.aura.smartschool.domain.AverageItem;
import com.aura.smartschool.domain.BoardVO;
import com.aura.smartschool.domain.BodyMeasureGrade;
import com.aura.smartschool.domain.BodyMeasureSummary;
import com.aura.smartschool.domain.ConsultHistoryVO;
import com.aura.smartschool.domain.ConsultVO;
import com.aura.smartschool.domain.HomeVO;
import com.aura.smartschool.domain.LocationVO;
import com.aura.smartschool.domain.ManagerVO;
import com.aura.smartschool.domain.MemberVO;
import com.aura.smartschool.domain.NotiVO;
import com.aura.smartschool.domain.OsInfoVO;
import com.aura.smartschool.domain.PayVO;
import com.aura.smartschool.domain.SchoolNotiVO;
import com.aura.smartschool.domain.SchoolVO;
import com.aura.smartschool.domain.SearchVO;
import com.aura.smartschool.domain.SessionVO;
import com.aura.smartschool.domain.StatisticsParam;
import com.aura.smartschool.domain.VideoTypeVO;
import com.aura.smartschool.domain.VideoVO;
import com.aura.smartschool.persistence.MobileMapper;
import com.aura.smartschool.util.CommonUtil;

@Service("mobileService")
public class MobileServiceImpl implements MobileService {
	String nationQueryYear = "2012";
	String standardDate = "20120101";

	@Autowired
	private MobileMapper mobileMapper;

	@Override
	public int countHome(HomeVO home) {
		return mobileMapper.countHome(home);
	}

	@Override
	public MemberVO selectMember(MemberVO member) {
		return mobileMapper.selectMember(member);
	}
	
	@Override
	public MemberVO signInOfMobile(MemberVO member) {
		return mobileMapper.signInOfMobile(member);
	}
	
	@Override
	public MemberVO signInOfWeb(MemberVO member) {
		return mobileMapper.signInOfWeb(member);
	}
	
	@Override
	public List<MemberVO> getMemberList(HomeVO home) {
		return mobileMapper.selectMemberList(home);
	}
	
	@Override
	public long addHome(HomeVO home) throws PersistenceException {
		return mobileMapper.insertHome(home);
	}

	@Override
	public long insertMember(MemberVO member) throws PersistenceException {
		return mobileMapper.insertMember(member);
	}

	@Override
	public long updateMember(MemberVO member) throws PersistenceException {
		return mobileMapper.updateMember(member);
	}

	@Override
	public long updateGcmId(MemberVO member) throws PersistenceException {
		return mobileMapper.updateGcmId(member);
	}

	@Override
	public long insertLocation(LocationVO location) throws PersistenceException {
		return mobileMapper.insertLocation(location);
	}
	
	@Override
	public LocationVO selectLastLocation(MemberVO member) {
		return mobileMapper.selectLastLocation(member);
	}

	@Override
	public List<LocationVO> selectLocationList(MemberVO member) {
		return mobileMapper.selectLocationList(member);
	}
	
	@Override
	public List<SchoolVO> getSchoolList(SchoolVO school) {
		return mobileMapper.selectSchoolList(school);
	}

	@Override
	public long insertSchool(SchoolVO school) throws PersistenceException {
		return mobileMapper.insertSchool(school);
	}

	@Override
	public BodyMeasureSummary getSummary(MemberVO m) {
		//find member by member_id
		MemberVO member = mobileMapper.selectMember(m);
		SchoolVO school = mobileMapper.selectSchoolById(member.getSchool_id());
		
		if(member != null) {
			List<BodyMeasureSummary> list = mobileMapper.selectBodySummary(member);
			
			if(list != null && list.size() > 0) {
				//get the lastest measure info.
				BodyMeasureSummary summaryVO = list.get(0);
				
				BodyMeasureGrade gradeVO = new BodyMeasureGrade();
				gradeVO.setSex(member.getSex());
				gradeVO.setYear("2012");
				String schoolGradeId = CommonUtil.getGradeId(member.getSchool_grade(), school.getGubun2());
				gradeVO.setSchoolGradeId(schoolGradeId);
				
				//get height desc
				gradeVO.setSection(Constant.Height);
				gradeVO.setValue(summaryVO.getHeight());
				BodyMeasureGrade heightVO = mobileMapper.selectGradeBySection(gradeVO);
				if (heightVO != null) {
					summaryVO.setHeightStatus(heightVO.getGradeDesc());
					summaryVO.setHeightGradeId(heightVO.getGradeId());
				}
				
				//get Weight desc
				gradeVO.setSection(Constant.Weight);
				gradeVO.setValue(summaryVO.getWeight());
				BodyMeasureGrade weightVO = mobileMapper.selectGradeBySection(gradeVO);
				if (weightVO != null) {
					summaryVO.setWeightStatus(weightVO.getGradeDesc());
					summaryVO.setWeightGradeId(weightVO.getGradeId());
				}
				
				//get BMI desc
				gradeVO.setSection(Constant.BMI);
				gradeVO.setValue(summaryVO.getBmi());
				BodyMeasureGrade bmiVO = mobileMapper.selectGradeBySection(gradeVO);
				if(bmiVO != null) {
					summaryVO.setBmiStatus(bmiVO.getGradeDesc());
					summaryVO.setBmiGradeId(bmiVO.getGradeId());
				}
				
				//get Smoke Status
				BodyMeasureGrade smokeVO = mobileMapper.selectSmokerGrade(summaryVO.getPpm());
				if (smokeVO != null) {
					summaryVO.setSmokeStatus(smokeVO.getGradeDesc());
				}
				
				return summaryVO;
			}
		}
		return null;
	}

	@Override
	public BodyMeasureGrade getMeasureGrade(MemberVO m, String section) {
		MemberVO member = mobileMapper.selectMember(m);
		SchoolVO school = mobileMapper.selectSchoolById(member.getSchool_id());
		
		if(member != null) {
			List<BodyMeasureSummary> list = mobileMapper.selectBodySummary(member);
			
			if(list != null && list.size() > 0) {
				//get the lastest measure info.
				BodyMeasureSummary summaryVO = list.get(0);
				
				//heightVO에 모든것을 담는다
				BodyMeasureGrade heightVO = new BodyMeasureGrade();
				heightVO.setMember_id(member.getMember_id());
				heightVO.setSex(member.getSex());
				heightVO.setSchoolId(member.getSchool_id());
				String schoolGradeId = CommonUtil.getGradeId(member.getSchool_grade(), school.getGubun2());
				heightVO.setSchoolGradeId(schoolGradeId);
				heightVO.setYear(nationQueryYear);
				
				heightVO.setSection(section);
				heightVO.setMeasureDate(summaryVO.getMeasure_date());
				//heightVO.setBeforeMeasureDate(mobileMapper.selectBeforeMeasureDate(heightVO));
				
				if(Constant.Height.equals(section)) {
					heightVO.setValue(summaryVO.getHeight());
				} else if(Constant.Weight.equals(section)) {
					heightVO.setValue(summaryVO.getWeight());
				}
				
				//이전 데이터가 없다면 최신데이터 값이 들어갑니다.
				if(list.size()>1) {
					//System.out.println("before measure date:" + list.get(1).getMeasure_date());
					heightVO.setBeforeMeasureDate(list.get(1).getMeasure_date());
					if(Constant.Height.equals(section)) {
						heightVO.setBeforeValue(list.get(1).getHeight());
					} else if(Constant.Weight.equals(section)) {
						heightVO.setBeforeValue(list.get(1).getWeight());
					}
				} else {
					heightVO.setBeforeValue(heightVO.getValue());
				}
				
				//temp by many data, 광명시에서 랭킹 구하기-------------------------------------------
				HashMap<String, Long> rankVO = mobileMapper.selectRankInGwangmyeong(heightVO);
				long total = rankVO.get("total");
				long rank = rankVO.get("rank");
				int order;
				//if data does not exist, set order to 1
				if ( total == 0) {
					order = 1;
				} else {
					order = (int) (rank * 100/total);
					order = order == 0 ? 1 : order;
				}

				
				long beforeTotal;
				long beforeRank;
				int beforeOrder;
				//이전 데이터가 없다면 최신데이터 값이 들어갑니다.
				if(list.size()>1) {
					HashMap<String, Long> beforeRankVO = mobileMapper.selectBeforeRankInGwangmyeong(heightVO);
					beforeTotal = beforeRankVO.get("total");
					beforeRank = beforeRankVO.get("rank");
					//if before data does not exit,,
					if (beforeTotal == 0) {
						beforeTotal = total;
						beforeRank = rank;
						beforeOrder= order;
					} else {
						beforeOrder = (int) (beforeRank * 100/beforeTotal);
						beforeOrder = beforeOrder == 0 ? 1 : beforeOrder;
					}
				} else {
					beforeTotal = total;
					beforeRank = rank;
					beforeOrder= order;
				}

				System.out.println("total:" + total);
				System.out.println("rank:" + rank);
				System.out.println("beforetotal:" + beforeTotal);
				System.out.println("beforerank:" + beforeRank);
				heightVO.setRank(String.valueOf(order));
				heightVO.setBeforeRank(String.valueOf(beforeOrder));
				
				
				//키, 몸무게 등급 구하기
				BodyMeasureGrade gradeVO = mobileMapper.selectGradeBySection(heightVO);
				
				if(gradeVO != null) {
					heightVO.setGradeId(gradeVO.getGradeId());
					heightVO.setGradeDesc(gradeVO.getGradeDesc());
					
					//학교에서 랭킹 구하기 => schoolGradeId: 학교등수, totalStudent: 학교 학생수
					BodyMeasureGrade rankingVO = mobileMapper.selectGradeRankingBySection(heightVO);
					heightVO.setSchoolGrade(rankingVO.getSchoolGrade()); //schoolGradeId: 학교등수
					heightVO.setTotalNumberOfStudent(rankingVO.getTotalNumberOfStudent());//totalStudent: 학교 학생수
					
					BodyMeasureGrade beforeRankingVO = mobileMapper.selectBeforeGradeRankingBySection(heightVO);
					
					/*
					 * 이전 측정값 : beforeValue
					 * 이전 학교내 학년별 순위 : beforeSchoolGrade
					 * 
					 * 이전 데이터가 없다면 최신데이터 값이 들어갑니다.
					 * */
					if(beforeRankingVO != null){
						if(beforeRankingVO.getBeforeSchoolGrade() == null || "".equals(beforeRankingVO.getBeforeSchoolGrade())){
							heightVO.setBeforeSchoolGrade(heightVO.getSchoolGrade());
						}else{
							heightVO.setBeforeSchoolGrade(beforeRankingVO.getBeforeSchoolGrade());
						}
						
						/*if(beforeRankingVO.getBeforeValue() == null  || "".equals(beforeRankingVO.getBeforeValue())){
							heightVO.setBeforeValue(heightVO.getValue());
						}else{
							heightVO.setBeforeValue(beforeRankingVO.getBeforeValue());
						}*/
					}else{
						heightVO.setBeforeSchoolGrade(heightVO.getSchoolGrade());
						heightVO.setBeforeValue(heightVO.getValue());
					}
					
					StatisticsParam param = new StatisticsParam();
					param.setSex(heightVO.getSex());
					param.setSchoolId(heightVO.getSchoolId());
					param.setSchoolGradeId(heightVO.getSchoolGradeId());
					//param.setClassNumber(heightVO.getClassNumber());
					param.setSection(heightVO.getSection());
					param.setMeasureDate(heightVO.getMeasureDate());
					System.out.println("school grade id:" + heightVO.getSchoolGradeId());

					//학교 평균 구하기
					AverageItem schoolItem = mobileMapper.selectAveragePerSchool(param);
					if (schoolItem != null) {
						heightVO.setAverageOfSchool(schoolItem.getValue());
					}
					
					//지역 평균 구하기 :광명데이터로 구하고 없다면 학교 평균으로 대체
					AverageItem localItem = mobileMapper.selectAveragePerLocal(param);
					if(localItem != null){
						heightVO.setAverageOfLocal(localItem.getValue());
					} else {
						heightVO.setAverageOfLocal(schoolItem.getValue());
					}

					//전국 평균 구하기
					param.setMeasureDate(this.standardDate);
					AverageItem nationItem = mobileMapper.selectAveragePerNation(param);
					System.out.println("Average of nation:" + nationItem.getValue());
					if (nationItem != null) {
						heightVO.setAverageOfNation(nationItem.getValue());
					} else {
						heightVO.setAverageOfNation(schoolItem.getValue());
					}

					return heightVO;
				}
			}
		}
		
		return null;
	}

	//admin----------------------------------------------------------------------------------
	
	@Override
	public List<SchoolVO> getSchoolListOfMember(SearchVO search) {
		return mobileMapper.selectSchoolListOfMember(search);
	}

	@Override
	public long updateSchool(SchoolVO school) throws PersistenceException {
		return mobileMapper.updateSchool(school);
	}

	@Override
	public long addSchoolNoti(SchoolNotiVO noti) throws PersistenceException {
		return mobileMapper.insertSchoolNoti(noti);
	}

	@Override
	public long modifySchoolNoti(SchoolNotiVO noti) throws PersistenceException {
		return mobileMapper.updateSchoolNoti(noti);
	}

	@Override
	public long removeSchoolNoti(SchoolNotiVO noti) throws PersistenceException {
		return mobileMapper.deleteSchoolNoti(noti);
	}

	@Override
	public List<SchoolNotiVO> getSchoolNotiList(SchoolNotiVO noti) {
		return mobileMapper.selectSchoolNotiList(noti);
	}

	@Override
	public long addArea(AreaVO area) throws PersistenceException {
		return mobileMapper.insertArea(area);
	}

	@Override
	public AreaVO getArea(AreaVO area) {
		return mobileMapper.selectArea(area);
	}

	@Override
	public List<AreaVO> getAreaList() {
		return mobileMapper.selectAreaList();
	}

	@Override
	public int countSchoolListOfMember(SearchVO search) {
		return mobileMapper.countSchoolListOfMember(search);
	}

	@Override
	public int countSchoolNotiList(SchoolNotiVO noti) {
		return mobileMapper.countSchoolNotiList(noti);
	}

	@Override
	public long insertSession(SessionVO session) throws PersistenceException {
		return mobileMapper.insertSession(session);
	}

	@Override
	public long insertConsult(ConsultVO consult) throws PersistenceException {
		return mobileMapper.insertConsult(consult);
	}

	@Override
	public long updateSession(SessionVO session) throws PersistenceException {
		return mobileMapper.updateSession(session);
	}

	@Override
	public List<SessionVO> selectSessionOngoingList(SessionVO session) {
		return mobileMapper.selectSessionOngoingList(session);
	}

	@Override
	public int countSessionOngoingList(SessionVO session) {
		return mobileMapper.countSessionOngoingList(session);
	}

	@Override
	public SessionVO selectSession(SessionVO session) {
		return mobileMapper.selectSession(session);
	}

	@Override
	public List<ConsultVO> selectConsultList(SessionVO session) {
		return mobileMapper.selectConsultList(session);
	}

	@Override
	public SessionVO selectLastSession() {
		return mobileMapper.selectLastSession();
	}

	@Override
	public List<MemberVO> selectMemberOfSchool(SchoolVO school) {
		return mobileMapper.selectMemberOfSchool(school);
	}

	@Override
	public List<NotiVO> getNotiList() {
		return mobileMapper.selectNotiList();
	}

	@Override
	public long addNoti(NotiVO noti) throws PersistenceException {
		return mobileMapper.insertNoti(noti);
	}

	@Override
	public long modifyNoti(NotiVO noti) throws PersistenceException {
		return mobileMapper.updateNoti(noti);
	}

	@Override
	public List<BoardVO> getBoardList(BoardVO board) {
		return mobileMapper.selectBoardList(board);
	}

	@Override
	public long addBoard(BoardVO board) throws PersistenceException {
		return mobileMapper.insertBoard(board);
	}

	@Override
	public long modifyBoard(BoardVO board) throws PersistenceException {
		return mobileMapper.updateBoard(board);
	}

	@Override
	public long removeNoti(NotiVO noti) throws PersistenceException {
		return mobileMapper.deleteNoti(noti);
	}

	@Override
	public long removeBoard(BoardVO board) throws PersistenceException {
		return mobileMapper.deleteBoard(board);
	}

	@Override
	public List<HomeVO> selectHomeList(SearchVO search) {
		return mobileMapper.selectHomeList(search);
	}

	@Override
	public int countHomeList(SearchVO search) {
		return mobileMapper.countHomeList(search);
	}

	@Override
	public List<PayVO> getPayList(MemberVO member) {
		return mobileMapper.selectPayList(member);
	}

	@Override
	public long modifyPay(PayVO pay) throws PersistenceException {
		return mobileMapper.updatePay(pay);
	}

	@Override
	public long removePay(PayVO pay) throws PersistenceException {
		return mobileMapper.deletePay(pay);
	}

	@Override
	public long addPay(PayVO pay) throws PersistenceException {
		return mobileMapper.insertPay(pay);
	}

	@Override
	public long addActivity(ActivityVO activity) throws PersistenceException {
		return mobileMapper.insertActivity(activity);
	}

	@Override
	public List<ActivityVO> getActivityList(ActivityVO inActivity) {
		return mobileMapper.selectActivityList(inActivity);
	}

	@Override
	public List<VideoVO> getVideoListByMasterGradeId(VideoTypeVO type) {
		return mobileMapper.selectVideoListByMasterGradeId(type);
	}

	@Override
	public List<VideoVO> getVideoListByInfoType(VideoTypeVO type) {
		return mobileMapper.selectVideoListByInfoType(type);
	}

	@Override
	public long addManager(ManagerVO manager) throws PersistenceException {
		return mobileMapper.insertManager(manager);
	}

	@Override
	public long modifyManager(ManagerVO manager) throws PersistenceException {
		return mobileMapper.updateManager(manager);
	}

	@Override
	public long removeManager(ManagerVO manager) throws PersistenceException {
		return mobileMapper.deleteManager(manager);
	}

	@Override
	public int countManager(SearchVO search) {
		return mobileMapper.countManager(search);
	}

	@Override
	public ManagerVO getManager(ManagerVO manager) {
		return mobileMapper.selectManager(manager);
	}

	@Override
	public List<ManagerVO> getManagerList(SearchVO search) {
		return mobileMapper.selectManagerList(search);
	}

	@Override
	public ConsultHistoryVO getConsultHistory(SessionVO session) {
		return mobileMapper.selectConsultHistory(session);
	}

	@Override
	public long addNotiBookmark(SchoolNotiVO noti) {
		return mobileMapper.insertNotiBookmark(noti);
	}

	@Override
	public List<SchoolNotiVO> getSchoolNotiListByMember(SchoolNotiVO noti) {
		return mobileMapper.selectSchoolNotiListByMember(noti);
	}

	@Override
	public long removeNotiBookmark(SchoolNotiVO noti) {
		return mobileMapper.deleteNotiBookmark(noti);
	}

	@Override
	public OsInfoVO getOsInfo(OsInfoVO inOsInfo) {
		return mobileMapper.selectOsInfo(inOsInfo);
	}

	@Override
	public long removeMember(MemberVO member) throws PersistenceException {
		return mobileMapper.deleteMember(member);
	}

	@Override
	public MemberVO getBoardGcm(BoardVO board) {
		return mobileMapper.selectBoardGcm(board);
	}

	@Override
	public int checkMemberExistInHome(MemberVO member) {
		return mobileMapper.checkMemberExistInHome(member);
	}

	@Override
	public long modifyHome(HomeVO home) throws PersistenceException {
		return mobileMapper.updateHome(home);
	}

	@Override
	public List<MemberVO> getAllMember(HomeVO home) {
		return mobileMapper.selectAllMember(home);
	}

	@Override
	public SchoolVO getSchoolById(int school_id) {
		return mobileMapper.selectSchoolById(school_id);
	}

	@Override
	public SchoolNotiVO getFilenameOfSchoolNoti(String filename) {
		return mobileMapper.selectFilenameOfSchoolNoti(filename);
	}
}
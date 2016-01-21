package com.aura.smartschool.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.codec.binary.Base64;
import org.apache.ibatis.exceptions.PersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.aura.smartschool.Constant;
import com.aura.smartschool.domain.ActivityVO;
import com.aura.smartschool.domain.AdminAccessVO;
import com.aura.smartschool.domain.AreaVO;
import com.aura.smartschool.domain.AttachVO;
import com.aura.smartschool.domain.AverageItem;
import com.aura.smartschool.domain.BoardVO;
import com.aura.smartschool.domain.BodyMeasureGrade;
import com.aura.smartschool.domain.BodyMeasureSummary;
import com.aura.smartschool.domain.ChallengeVO;
import com.aura.smartschool.domain.ConsultHistoryVO;
import com.aura.smartschool.domain.ConsultVO;
import com.aura.smartschool.domain.DiningVO;
import com.aura.smartschool.domain.GrowthInfo;
import com.aura.smartschool.domain.HomeVO;
import com.aura.smartschool.domain.LocationAccessVO;
import com.aura.smartschool.domain.LocationVO;
import com.aura.smartschool.domain.MagazineVO;
import com.aura.smartschool.domain.ManagerVO;
import com.aura.smartschool.domain.MemberVO;
import com.aura.smartschool.domain.NotiVO;
import com.aura.smartschool.domain.OsInfoVO;
import com.aura.smartschool.domain.PayVO;
import com.aura.smartschool.domain.PressVO;
import com.aura.smartschool.domain.RankingItem;
import com.aura.smartschool.domain.RankingListItem;
import com.aura.smartschool.domain.SchoolNotiVO;
import com.aura.smartschool.domain.SchoolVO;
import com.aura.smartschool.domain.SearchVO;
import com.aura.smartschool.domain.SessionVO;
import com.aura.smartschool.domain.StatisticsParam;
import com.aura.smartschool.domain.VideoTimeVO;
import com.aura.smartschool.domain.VideoTypeVO;
import com.aura.smartschool.domain.VideoVO;
import com.aura.smartschool.persistence.MobileMapper;
import com.aura.smartschool.result.Result;
import com.aura.smartschool.util.CommonUtil;
import com.aura.smartschool.util.FileUtil;

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
	public BodyMeasureGrade getMeasureGrade(MemberVO member, String section) {

		List<BodyMeasureSummary> list = mobileMapper.selectBodySummary(member);
		
		if(list != null && list.size() > 0) {
			//get the lastest measure info.
			BodyMeasureSummary summaryVO = list.get(0);
			
			//heightVO에 모든것을 담는다
			BodyMeasureGrade heightVO = new BodyMeasureGrade();
			heightVO.setMember_id(summaryVO.getMember_id());
			heightVO.setSex(summaryVO.getSex());
			heightVO.setSchoolId(summaryVO.getSchool_id());
			heightVO.setSchoolGradeId(summaryVO.getSchool_grade_id());
			heightVO.setYear(nationQueryYear);
			
			heightVO.setSection(section);
			heightVO.setMeasureDate(summaryVO.getMeasure_date());
			
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
			
			//전국 등수와 전체 학생수 구하기--------------------------------------------------------
			BodyMeasureGrade ranking = mobileMapper.selectGradeRankingBySection(heightVO);
			heightVO.setRank(ranking.getRank());
			heightVO.setTotal(ranking.getTotal());

			//이전 등수와 전체 학생수 : 이전 데이터가 없다면 최신데이터 값이 들어감.
			if(list.size()>1) {
				heightVO.setMeasureDate(list.get(1).getMeasure_date()); //이전 측정월을 가져와서 세팅
				BodyMeasureGrade beforeRanking = mobileMapper.selectGradeRankingBySection(heightVO);
				heightVO.setBeforeRank(beforeRanking.getRank());
				heightVO.setBeforeTotal(beforeRanking.getTotal());
				heightVO.setMeasureDate(list.get(0).getMeasure_date()); //이전 측정월을 원복
			} else {
				heightVO.setBeforeRank(ranking.getRank());
				heightVO.setBeforeTotal(ranking.getTotal());
			}
			System.out.println("rank:" + heightVO.getRank());
			System.out.println("total:" + heightVO.getTotal());
			System.out.println("before rank:" + heightVO.getBeforeRank());
			System.out.println("before total:" + heightVO.getBeforeTotal());
			
			//키, 몸무게 등급 구하기
			BodyMeasureGrade gradeVO = mobileMapper.selectGradeBySection(heightVO);
			
			if(gradeVO != null) {
				heightVO.setGradeId(gradeVO.getGradeId());
				heightVO.setGradeDesc(gradeVO.getGradeDesc());
			}			
			
			//평균 구하기---------------------------------------------------------------------
			StatisticsParam param = new StatisticsParam();
			param.setSex(heightVO.getSex());
			param.setSchoolId(heightVO.getSchoolId());
			param.setSchoolGradeId(heightVO.getSchoolGradeId());
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
			AverageItem nationItem = mobileMapper.selectAveragePerNation(param);
			System.out.println("Average of nation:" + nationItem.getValue());
			heightVO.setAverageOfNation(nationItem.getValue());
			
			//표준 평균 구하기
			param.setMeasureDate(this.standardDate); //2012년 세팅
			AverageItem standardItem = mobileMapper.selectAveragePerStandard(param);
			System.out.println("Standard:" + standardItem.getValue());
			heightVO.setAverageOfStandard(standardItem.getValue());

			return heightVO;
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
	public List<SessionVO> selectSessionOngoingList(SearchVO search) {
		return mobileMapper.selectSessionOngoingList(search);
	}

	@Override
	public int countSessionOngoingList(SearchVO search) {
		return mobileMapper.countSessionOngoingList(search);
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
	public List<NotiVO> getNotiList(SearchVO search) {
		return mobileMapper.selectNotiList(search);
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
	public List<BoardVO> getBoardList(SearchVO search) {
		return mobileMapper.selectBoardList(search);
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
	public long modifyHome(SearchVO search) throws PersistenceException {
		return mobileMapper.updateHome(search);
	}

	@Override
	public List<MemberVO> getAllMember(SearchVO search) {
		return mobileMapper.selectAllMember(search);
	}

	@Override
	public SchoolVO getSchoolById(int school_id) {
		return mobileMapper.selectSchoolById(school_id);
	}

	@Override
	public SchoolNotiVO getFilenameOfSchoolNoti(String filename) {
		return mobileMapper.selectFilenameOfSchoolNoti(filename);
	}

	@Override
	public long modifyActivity(ActivityVO activity) throws PersistenceException {
		return mobileMapper.updateActivity(activity);
	}

	@Override
	public ActivityVO getActivity(ActivityVO activity) {
		return mobileMapper.selectActivity(activity);
	}

	@Override
	public VideoTimeVO getVideoTimeOfMember(VideoTimeVO time) {
		return mobileMapper.selectVideoTimeOfMember(time);
	}

	@Override
	public long addVideoTime(VideoTimeVO time) {
		return mobileMapper.insertVideoTime(time);
	}

	@Override
	public int countBoardList(SearchVO search) {
		return mobileMapper.countBoardList(search);
	}

	@Override
	public int countNotiList(SearchVO search) {
		return mobileMapper.countNotiList(search);
	}

	@Override
	public SchoolNotiVO getSchoolNoti(SchoolNotiVO noti) {
		return mobileMapper.selectSchoolNoti(noti);
	}

	@Override
	public List<MemberVO> getAllMemberOfGcm(MemberVO member) {
		return mobileMapper.selectAllMemberOfGcm(member);
	}

	@Override
	public int countAllMember(SearchVO search) {
		return mobileMapper.countAllMember(search);
	}

	@Override
	public HomeVO getHomeListByNumber(MemberVO member) {
		return mobileMapper.selectHomeListByNumber(member);
	}

	@Override
	public List<OsInfoVO> getOsInfoList() {
		return mobileMapper.selectOsInfoList();
	}

	@Override
	public long modifyOsInfo(OsInfoVO osInfo) {
		return mobileMapper.updateOsInfo(osInfo);
	}
	
	//학교 급식 등록
	@Override
	public long addDining(DiningVO dining) {
		return mobileMapper.insertDining(dining);
	}

	@Override
	public DiningVO getDining(DiningVO dining) {
		return mobileMapper.selectDining(dining);
	}

	@Override
	public List<DiningVO> getDiningList(DiningVO inDining) {
		return mobileMapper.selectDiningOfMonth(inDining);
	}

	//아우라 홈페이지 로그인
	@Override
	public MemberVO getMemberByMdn(MemberVO member) {
		return mobileMapper.selectMemberByMdn(member);
	}
	
	//첨부파일 등록
	@Override
	public int registAttachFile(AttachVO attach) throws Exception{
		return mobileMapper.insertAttachFileInfo(attach);
	}
	
	//첨부파일 목록 조회
	@Override
	public List<AttachVO> getAttachList(AttachVO attach) {
		return mobileMapper.getAttachList(attach);
	}
	
	//첨부파일 조회
	@Override
	public AttachVO getAttachFileById(AttachVO attach){
		return mobileMapper.getAttachFileById(attach);
	}

	//첨부파일 삭제
	@Override
	public int removeAttachFile(AttachVO attach) throws Exception {
		int rs = 0;
		attach = mobileMapper.getAttachFileById(attach);
		
		if(FileUtil.deleteFile(attach)){
			rs = mobileMapper.deleteAttachFile(attach);
		}
		
		return rs;
	}

	//언론자료 관리
	@Override
	public int countPressList(SearchVO search) {
		return mobileMapper.countPressList(search);
	}

	@Override
	public List<PressVO> getPressList(SearchVO search) {
		List<PressVO> list = mobileMapper.selectPressList(search);
		for(PressVO press:list){
			AttachVO attach = new AttachVO();
			attach.setBoard_type(1);
			attach.setBoard_id(press.getPress_id());
			press.setList(this.getAttachList(attach));
		}
		
		return list;
	}

	@Override
	public int addPress(PressVO press, List<MultipartFile> files, String path) throws Exception {
		int press_id = mobileMapper.insertPress(press);
		
		if(files.size() > 0){
			List<AttachVO> list = FileUtil.fileUpload(files, path);
			
			if (list.size() != 0){
				for(AttachVO attach:list){
					attach.setBoard_type(1);	//1:언론자료
					attach.setBoard_id(press_id);
					attach.setPath(path);
					this.registAttachFile(attach);
				}
			}
		}
		return press_id;
	}

	@Override
	public PressVO getPress(PressVO in) {
		PressVO rs = mobileMapper.selectPress(in);
		if( rs !=null ) {
			AttachVO attach = new AttachVO();
			attach.setBoard_type(1);		//1:언론자료
			attach.setBoard_id(rs.getPress_id());
			rs.setList(this.getAttachList(attach));
		}
		
		return rs;
	}

	@Override
	public int modifyPress(PressVO press, List<MultipartFile> files, String path) throws Exception {
		int rsCnt = mobileMapper.updatePress(press);
		
		if(files.size() > 0){
			List<AttachVO> list = FileUtil.fileUpload(files, path);
			
			if (list.size() != 0){
				for(AttachVO attach:list){
					attach.setBoard_type(1);	//1:언론자료
					attach.setBoard_id(press.getPress_id());
					attach.setPath(path);
					this.registAttachFile(attach);
				}
			}
		}
		return rsCnt;
	}
	
	public int removePress(PressVO press) throws Exception {
		int rs = 0;
		for(AttachVO attach:press.getList()){
			this.removeAttachFile(attach);
		}
		
		rs = mobileMapper.deletePress(press);
		
		return rs;
	}

	//건강매거진 관리
	@Override
	public int countMagazineList(SearchVO search) {
		return mobileMapper.countMagazineList(search);
	}

	@Override
	public List<MagazineVO> getMagazineList(SearchVO search) {
		return mobileMapper.selectMagazineList(search);
	}

	@Override
	public MagazineVO getMagazine(MagazineVO in) {
		return mobileMapper.selectMagazine(in);
	}

	@Override
	public int checkMagazine(MagazineVO magazine) {
		return mobileMapper.checkMagazine(magazine);
	}
	@Override
	public int addMagazine(MagazineVO magazine) throws PersistenceException {
		return mobileMapper.insertMagazine(magazine);
	}

	@Override
	public int modifyMagazine(MagazineVO magazine) throws PersistenceException {
		return mobileMapper.updateMagazine(magazine);
	}

	@Override
	public int removeMagazine(MagazineVO magazine) throws PersistenceException {
		return mobileMapper.deleteMagazine(magazine);
	}

	//도전!건강! 관리
	@Override
	public int countChallengeList(SearchVO search) {
		return mobileMapper.countChallengeList(search);
	}

	@Override
	public List<ChallengeVO> getChallengeList(SearchVO search) {
		return mobileMapper.selectChallengeList(search);
	}

	@Override
	public List<ChallengeVO> getChallengeTop5List() {
		return mobileMapper.selectChallengeTop5List();
	}

	@Override
	public int addChallenge(ChallengeVO challenge, List<MultipartFile> files, String path) throws Exception {
		//파일 업로드
		for(int i=0; i<files.size(); i++){
			String name = FileUtil.fileUpload(files.get(i), path);
			switch(i){
				case 0: challenge.setImg_1(name); break;
				case 1: challenge.setImg_2(name); break;
				case 2: challenge.setImg_3(name); break;
				case 3: challenge.setImg_4(name); break;
				case 4: challenge.setImg_5(name); break;
			}
		}
		
		return mobileMapper.insertChallenge(challenge);
	}
	
	@Override
	public int releaseChallengeRank(ChallengeVO challenge) throws PersistenceException {
		return mobileMapper.releaseChallengeRank(challenge.getRank());
	}

	@Override
	public int setupChallengeRank(ChallengeVO challenge) throws PersistenceException {
		//기존 순위자의 순위 해제
		mobileMapper.releaseChallengeRank(challenge.getRank());
		
		return mobileMapper.setupChallengeRank(challenge);
	}

	@Override
	public long addLocationAccess(LocationAccessVO accessVO) {
		return mobileMapper.insertLocationAccess(accessVO);
	}

	@Override
	public List<LocationAccessVO> getLocationAccessList(SearchVO search) {
		return mobileMapper.selectLocationAccessList(search);
	}

	@Override
	public int countLocationAccessList() {
		return mobileMapper.countLocationAccessList();
	}

	@Override
	public long addAdminAccess(AdminAccessVO accessVO) throws PersistenceException {
		return mobileMapper.insertAdminAccess(accessVO);
	}

	@Override
	public List<AdminAccessVO> getAdminAccessList(SearchVO search) {
		return mobileMapper.selectAdminAccessList(search);
	}

	@Override
	public int countAdminAccess() {
		return mobileMapper.countAdminAccess();
	}

	@Transactional
	@Override
	public Result signUpWeb(MemberVO member, MultipartFile file) throws Exception {
		int result = 0;
		String msg = null;
		
		HomeVO home = new HomeVO();
		home.setHome_id(member.getHome_id());
		
		//home_id 가 존재하는지 체크
		if(this.countHome(home) > 0) {
			result = 100;
			msg = "가족명이 이미 존재합니다";
		} else {
			//홈아이디 생성
			mobileMapper.insertHome(home);
			//멤버 생성
			if(file != null) {
				member.setPhoto(Base64.encodeBase64String(file.getBytes()));
			}
			mobileMapper.insertMember(member);

			msg = "success";
		}
		return new Result(result,msg);
	}

	@Override
	public MemberVO getMemberProfile(int member_id) {
		return mobileMapper.selectMemberProfile(member_id);
	}

	@Transactional
	@Override
	public Result addMember(MemberVO member, MultipartFile file) throws Exception {
		int result = 0;
		String msg = null;
		
		HomeVO home = new HomeVO();
		home.setHome_id(member.getHome_id());
		
		//home_id 가 존재하는지 체크
		if(this.countHome(home) == 0) {
			result = 100;
			msg = "가족명이 존재하지 않습니다.";
		} else {
			if(mobileMapper.checkMemberExistInHome(member) > 0) {
				return new Result(100, "중복된 전화번호가 존재하거나 가족명내에 동일한 이름이 존재합니다.");
			} else {
				if(file != null) {
					member.setPhoto(Base64.encodeBase64String(file.getBytes()));
				}
				//멤버 생성
				mobileMapper.insertMember(member);
				msg = "success";
			}
		}
		return new Result(result,msg);
	}

	@Transactional
	@Override
	public long modMember(MemberVO member, MultipartFile file) throws Exception{
		HomeVO home = new HomeVO();
		home.setHome_id(member.getHome_id());
		
		if(file != null) {
			member.setPhoto(Base64.encodeBase64String(file.getBytes()));
		}
		return mobileMapper.updateMember(member);
	}

	@Override
	public GrowthInfo getMeasureHistoryList(SearchVO in, String section) {
		List<BodyMeasureSummary> list = mobileMapper.selectBodySummaryByYear(in);
		if(list !=null && list.size() > 0){
			MemberVO m = new MemberVO();
			m.setMember_id(in.getMember_id());
			MemberVO member = mobileMapper.selectMember(m);
			
			GrowthInfo growthInfo = new GrowthInfo();
			//키,체중 측정이력
			List<Map<String,Object>> history_list = new ArrayList<Map<String,Object>>();
			for(int i=0; i<12; i++){
				Map<String,Object> value = new HashMap<String,Object>();
				int month = i+1;
				if(month<10){
					value.put("month", "0"+month);
				}else{
					value.put("month", String.valueOf(month));
				}
				for(BodyMeasureSummary summary:list){
					int mm = Integer.parseInt(summary.getMeasure_date().substring(5, 7),10) -1;
					if(i==mm){
						if(section=="Height"){
							value.put("value", summary.getHeight());
						}else if(section=="Weight"){
							value.put("value", summary.getWeight());
						}
					}
				}
				history_list.add(i, value);
			}
			
			growthInfo.setList(history_list);
			
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("member_id", member.getMember_id());
			param.put("sex", member.getSex());
			param.put("school_id", member.getSchool_id());
			param.put("search_year", in.getSearch_year());
			param.put("section", section);
			
			//키,체중 변화 - 학생
			Map<String,Object> growth = mobileMapper.selectChangeGrowth(param);
			growthInfo.setGrowth(String.valueOf(growth.get("value")));
			
			//키,체중 - 표준
			StatisticsParam param1 = new StatisticsParam();
			param1.setSex(member.getSex());
			param1.setSchoolGradeId(member.getSchool_grade());
			param1.setSection(section);
			param1.setMeasureDate(this.standardDate); //2012년 세팅
			AverageItem standardItem = mobileMapper.selectAveragePerStandard(param1);
			growthInfo.setAvgOfStandard(standardItem.getValue());
			
			//키,체중 변화 - 지역평균 구하기
			Map<String,Object> local = mobileMapper.selectGrowthAverageOfLocal(param);
			growthInfo.setAvgOfLocal(String.valueOf(local.get("value")));
			
			//키,체중 변화 - 전국평균 구하기
			Map<String,Object> nation = mobileMapper.selectGrowthAverageOfNation(param);
			growthInfo.setAvgOfNation(String.valueOf(nation.get("value")));
			
			return growthInfo;
		}
		
		return null;
	}

	@Override
	public int getMeasureHistoryCount(SearchVO in) {
		List<BodyMeasureSummary> list = mobileMapper.selectBodySummaryByYear(in);
		if(list != null && list.size()>0){
			return list.size();
		}else{
			return 0;
		}
	}

	@Override
	public RankingItem getRanking(MemberVO in, String section) {
		List<BodyMeasureSummary> list = mobileMapper.selectBodySummary(in);
		
		if(list != null && list.size() > 0) {
			RankingItem rank = new RankingItem();
			
			MemberVO member = mobileMapper.selectMember(in);
			SchoolVO school = mobileMapper.selectSchoolById(member.getSchool_id());
			
			//get the lastest measure info.
			BodyMeasureSummary summaryVO = list.get(0);
			
			rank.setMeasureDate(summaryVO.getMeasure_date());
			rank.setMember_id(member.getMember_id());
			rank.setSchool_id(school.getSchool_id());
			rank.setNameOfSchool(school.getSchool_name());
			rank.setSchool_grade(member.getSchool_grade());
			rank.setSchool_grade_id(summaryVO.getSchool_grade_id());
			rank.setNameOfLocal(school.getSido());
			
			System.out.println("getSchool_grade_id => "+summaryVO.getSchool_grade_id());
			
			if(Constant.Height.equals(section)) {
				rank.setValue(summaryVO.getHeight());
			} else if(Constant.Weight.equals(section)) {
				rank.setValue(summaryVO.getWeight());
			} else if(Constant.BMI.equals(section)) {
				rank.setValue(summaryVO.getBmi());
			} else if(Constant.Muscle.equals(section)) {
				rank.setValue(summaryVO.getBmi());
			} else if(Constant.Fat.equals(section)) {
				rank.setValue(summaryVO.getBmi());
			}
			
			if(list.size()>1) {
				if(Constant.Height.equals(section)) {
					rank.setBeforeValue(list.get(1).getHeight());
				} else if(Constant.Weight.equals(section)) {
					rank.setBeforeValue(list.get(1).getWeight());
				} else if(Constant.BMI.equals(section)) {
					rank.setBeforeValue(list.get(1).getBmi());
				} else if(Constant.Muscle.equals(section)) {
					rank.setBeforeValue(list.get(1).getBmi());
				} else if(Constant.Fat.equals(section)) {
					rank.setBeforeValue(list.get(1).getBmi());
				}
			} else {
				rank.setBeforeValue(rank.getValue());
			}
			
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("member_id",summaryVO.getMember_id());
			param.put("sex",summaryVO.getSex());
			param.put("school_id", summaryVO.getSchool_id());
			param.put("school_grade_id", summaryVO.getSchool_grade_id());
			param.put("section",section);
			param.put("measureDate",summaryVO.getMeasure_date());
			
			//학교등수,학생수 구하기--------------------------------------------------------
			param.put("gubun", "school");
			BodyMeasureGrade result1 = mobileMapper.selectRankingByGubun(param);
			rank.setRankOfSchool(result1.getRank());
			rank.setTotalOfSchool(result1.getTotal());
			//지역등수,학생수 구하기--------------------------------------------------------
			param.put("gubun", "local");
			BodyMeasureGrade result2 = mobileMapper.selectRankingByGubun(param);
			rank.setRankOfLocal(result2.getRank());
			rank.setTotalOfLocal(result2.getTotal());
			//전국등수,학생수 구하기--------------------------------------------------------
			param.put("gubun", "nation");
			BodyMeasureGrade result3 = mobileMapper.selectRankingByGubun(param);
			rank.setRankOfNation(result3.getRank());
			rank.setTotalOfNation(result3.getTotal());

			//이전 등수와 전체 학생수 : 이전 데이터가 없다면 최신데이터 값이 들어감.
			if(list.size()>1) {
				param.put("measureDate",list.get(1).getMeasure_date()); //이전 측정월을 가져와서 세팅
				//학교등수,학생수 구하기--------------------------------------------------------
				param.put("gubun", "school");
				BodyMeasureGrade result4 = mobileMapper.selectRankingByGubun(param);
				rank.setBeforeRankOfSchool(result4.getRank());
				//지역등수,학생수 구하기--------------------------------------------------------
				param.put("gubun", "local");
				BodyMeasureGrade result5 = mobileMapper.selectRankingByGubun(param);
				rank.setBeforeRankOfLocal(result5.getRank());
				//전국등수,학생수 구하기--------------------------------------------------------
				param.put("gubun", "nation");
				BodyMeasureGrade result6 = mobileMapper.selectRankingByGubun(param);
				rank.setBeforeRankOfNation(result6.getRank());
			} else {
				rank.setBeforeRankOfSchool(rank.getRankOfSchool());
				rank.setBeforeRankOfLocal(rank.getRankOfLocal());
				rank.setBeforeRankOfNation(rank.getRankOfNation());
			}
			return rank;
		}
		return null;
	}

	@Override
	public RankingListItem getRankingList(SearchVO in, String section) {
		MemberVO m = new MemberVO();
		m.setMember_id(in.getMember_id());
		List<BodyMeasureSummary> summary_list = mobileMapper.selectBodySummary(m);
		
		if(summary_list != null && summary_list.size() > 0) {
			RankingListItem rank = new RankingListItem();
			
			MemberVO member = mobileMapper.selectMember(m);
			SchoolVO school = mobileMapper.selectSchoolById(member.getSchool_id());
			
			//get the lastest measure info.
			BodyMeasureSummary summaryVO = summary_list.get(0);
			
			rank.setMeasureDate(summaryVO.getMeasure_date());
			rank.setMemberId(member.getMember_id());
			rank.setName(member.getName());
			rank.setSchoolName(school.getSchool_name());
			rank.setSchoolGrade(member.getSchool_grade());
			
			if(Constant.Height.equals(section)) {
				rank.setValue(summaryVO.getHeight());
			} else if(Constant.Weight.equals(section)) {
				rank.setValue(summaryVO.getWeight());
			} else if(Constant.BMI.equals(section)) {
				rank.setValue(summaryVO.getBmi());
			} else if(Constant.Muscle.equals(section)) {
				rank.setValue(summaryVO.getBmi());
			} else if(Constant.Fat.equals(section)) {
				rank.setValue(summaryVO.getBmi());
			}
			
			//등수,학생수 구하기--------------------------------------------------------
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("member_id",summaryVO.getMember_id());
			param.put("sex",summaryVO.getSex());
			param.put("school_id", summaryVO.getSchool_id());
			param.put("school_grade_id", summaryVO.getSchool_grade_id());
			param.put("section",section);
			param.put("measureDate",summaryVO.getMeasure_date());
			param.put("gubun", in.getSearch_key());
			
			BodyMeasureGrade result1 = mobileMapper.selectRankingByGubun(param);
			rank.setRank(result1.getRank());
			rank.setTotal(result1.getTotal());

			//이전 등수와 전체 학생수 : 이전 데이터가 없다면 최신데이터 값이 들어감.
			if(summary_list.size()>1) {
				param.put("measureDate",summary_list.get(1).getMeasure_date()); //이전 측정월을 가져와서 세팅
				BodyMeasureGrade result4 = mobileMapper.selectRankingByGubun(param);
				rank.setBeforeRank(result4.getRank());
			} else {
				rank.setBeforeRank(rank.getRank());
			}
			
			//순위[1~10]
			param.put("measureDate",summaryVO.getMeasure_date());
			List<BodyMeasureGrade> ranklist = mobileMapper.selectRankingList(param);
			//------------------- 이전 등수 가져오기 ------------------------------------------
			for(BodyMeasureGrade row : ranklist){
				MemberVO mb = new MemberVO();
				mb.setMember_id(row.getMember_id());
				mb.setMeasure_date(row.getMeasureDate());
				List<BodyMeasureSummary> list = mobileMapper.selectBodySummary(mb);
				if(list.size()>1){
					Map<String,Object> p = new HashMap<String,Object>();
					p.put("member_id", list.get(1).getMember_id());
					p.put("sex", summaryVO.getSex());
					p.put("section",section);
					p.put("school_id", list.get(1).getSchool_id());
					p.put("school_grade_id", list.get(1).getSchool_grade_id());
					p.put("gubun", in.getSearch_key());
					p.put("measureDate",list.get(1).getMeasure_date()); //이전 측정월을 가져와서 세팅
					BodyMeasureGrade rs = mobileMapper.selectRankingByGubun(p);
					row.setBeforeRank(rs.getRank());
				}else{
					row.setBeforeRank(row.getRank());
				}
			}
			rank.setList(ranklist);
			
			return rank;
		}
		return null;
	}

	@Override
	public int removeProfile(MemberVO in) {
		return mobileMapper.deleteProfile(in);
	}

}
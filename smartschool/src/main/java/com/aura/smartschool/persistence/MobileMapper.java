package com.aura.smartschool.persistence;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.exceptions.PersistenceException;

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
import com.aura.smartschool.domain.VideoTimeVO;
import com.aura.smartschool.domain.VideoTypeVO;
import com.aura.smartschool.domain.VideoVO;

public interface MobileMapper {
	public int countHome(HomeVO home);
	public List<HomeVO> selectHomeList(SearchVO search);
	public int countHomeList(SearchVO search);
	public List<MemberVO> selectAllMemberOfGcm();
	public MemberVO selectMember(MemberVO member);
	public MemberVO signInOfMobile(MemberVO member);
	public MemberVO signInOfWeb(MemberVO member);
	public List<MemberVO> selectMemberList(HomeVO home);
	public List<MemberVO> selectAllMember(SearchVO search);
	public int countAllMember(SearchVO search);
	public int checkMemberExistInHome(MemberVO member);

	public long insertHome(HomeVO home) throws PersistenceException;
	public long updateHome(HomeVO home) throws PersistenceException;
	public long insertMember(MemberVO member) throws PersistenceException;
	public long updateMember(MemberVO member) throws PersistenceException;
	public long deleteMember(MemberVO member) throws PersistenceException;
	public long updateGcmId(MemberVO member) throws PersistenceException;
	
	public List<PayVO> selectPayList(MemberVO member);
	public long updatePay(PayVO pay) throws PersistenceException;
	public long deletePay(PayVO pay) throws PersistenceException;
	public long insertPay(PayVO pay) throws PersistenceException;
	
	public long insertLocation(LocationVO location) throws PersistenceException;
	public LocationVO selectLastLocation(MemberVO member);
	public List<LocationVO> selectLocationList(MemberVO member);
	
	public SchoolVO selectSchoolById(int school_id);
	public List<SchoolVO> selectSchoolList(SchoolVO school);
	public long insertSchool(SchoolVO school) throws PersistenceException;
	
	public List<BodyMeasureSummary> selectBodySummary(MemberVO member);
	//등수 구하기: 현재는 광명데이터로 광명시 전체에서 몇등인가, 향후에는 전체 데이터로 변경 필요
	public BodyMeasureGrade selectGradeBySection(BodyMeasureGrade grade);
	public BodyMeasureGrade selectBeforeGradeRankingBySection(BodyMeasureGrade grade);
	//temp: 광명시 데이터에서 랭킹을 구한다.
	public HashMap<String, Long> selectRankInGwangmyeong(BodyMeasureGrade grade);
	public HashMap<String, Long> selectBeforeRankInGwangmyeong(BodyMeasureGrade grade);
	
	public BodyMeasureGrade selectSmokerGrade(String ppm);
	public String selectBeforeMeasureDate(BodyMeasureGrade grade);
	public BodyMeasureGrade selectGradeRankingBySection(BodyMeasureGrade grade);
	//학교 평균
	public AverageItem selectAveragePerSchool(StatisticsParam param);
	//지역 평균, 현재는 데이터가 없어서 광명시 평균으로 대체
	public AverageItem selectAveragePerLocal(StatisticsParam param);
	//전국 평균
	public AverageItem selectAveragePerNation(StatisticsParam param);
	//표준 평균, 2012-01-01 데이터
	public AverageItem selectAveragePerStandard(StatisticsParam param);
	//area_info
	public long insertArea(AreaVO area) throws PersistenceException;
	public AreaVO selectArea(AreaVO area);
	public List<AreaVO> selectAreaList();
	
	//활동량
	public long insertActivity(ActivityVO activity) throws PersistenceException;
	public long updateActivity(ActivityVO activity) throws PersistenceException;
	public ActivityVO selectActivity(ActivityVO activity);
	public List<ActivityVO> selectActivityList(ActivityVO inActivity);
	
	//비디오 리스트 
	public List<VideoVO> selectVideoListByMasterGradeId(VideoTypeVO type);
	public List<VideoVO> selectVideoListByInfoType(VideoTypeVO type);
	public VideoTimeVO selectVideoTimeOfMember(VideoTimeVO time);
	public long insertVideoTime(VideoTimeVO time);
	
	//학교 공지사항, 가정통신문----------------------------------------------------
	public List<SchoolVO> selectSchoolListOfMember(SearchVO search);
	public int countSchoolListOfMember(SearchVO search);
	public long updateSchool(SchoolVO school) throws PersistenceException; 
	public long insertSchoolNoti(SchoolNotiVO noti) throws PersistenceException;
	public List<MemberVO> selectMemberOfSchool(SchoolVO school);
	public long updateSchoolNoti(SchoolNotiVO noti) throws PersistenceException;
	public long deleteSchoolNoti(SchoolNotiVO noti) throws PersistenceException;
	public SchoolNotiVO selectSchoolNoti(SchoolNotiVO noti);
	public List<SchoolNotiVO> selectSchoolNotiList(SchoolNotiVO noti);
	public int countSchoolNotiList(SchoolNotiVO noti);
	public long insertNotiBookmark(SchoolNotiVO noti);
	public long deleteNotiBookmark(SchoolNotiVO noti);
	public List<SchoolNotiVO> selectSchoolNotiListByMember(SchoolNotiVO noti);
	public SchoolNotiVO selectFilenameOfSchoolNoti(String filename);
	
	//실시간상담 session, consult
	public long insertSession(SessionVO session) throws PersistenceException;
	public long insertConsult(ConsultVO consult) throws PersistenceException;
	public long updateSession(SessionVO session) throws PersistenceException;
	public List<SessionVO> selectSessionOngoingList(SearchVO search);
	public int countSessionOngoingList(SearchVO search);
	public SessionVO selectSession(SessionVO session);
	public SessionVO selectLastSession();
	public List<ConsultVO> selectConsultList(SessionVO session);
	public ConsultHistoryVO selectConsultHistory(SessionVO session);
	
	//board, noti
	public List<NotiVO> selectNotiList(SearchVO search);
	public int countNotiList(SearchVO search);
	public long insertNoti(NotiVO noti) throws PersistenceException;
	public long updateNoti(NotiVO noti) throws PersistenceException;
	public long deleteNoti(NotiVO noti) throws PersistenceException;
	public List<BoardVO> selectBoardList(SearchVO search);
	public int countBoardList(SearchVO search);
	public MemberVO selectBoardGcm(BoardVO board);
	public long insertBoard(BoardVO board) throws PersistenceException;
	public long updateBoard(BoardVO board) throws PersistenceException;
	public long deleteBoard(BoardVO board) throws PersistenceException;
	
	//관리자 화면 사용자 관리
	public long insertManager(ManagerVO manager) throws PersistenceException;
	public long updateManager(ManagerVO manager) throws PersistenceException;
	public long deleteManager(ManagerVO manager) throws PersistenceException;
	public int countManager(SearchVO search);
	public ManagerVO selectManager(ManagerVO manager);
	public List<ManagerVO> selectManagerList(SearchVO search);
	
	//os version
	public OsInfoVO selectOsInfo(OsInfoVO inOsInfo);
}

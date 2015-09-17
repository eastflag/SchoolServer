package com.aura.smartschool.service;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.exceptions.PersistenceException;

import com.aura.smartschool.domain.ActivityVO;
import com.aura.smartschool.domain.AreaVO;
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
import com.aura.smartschool.domain.VideoTimeVO;
import com.aura.smartschool.domain.VideoTypeVO;
import com.aura.smartschool.domain.VideoVO;

public interface MobileService {
	public int countHome(HomeVO home);
	public List<HomeVO> selectHomeList(SearchVO search);
	public int countHomeList(SearchVO search);
	public HomeVO getHomeListByNumber(MemberVO member);
	public List<MemberVO> getAllMemberOfGcm();
	public MemberVO selectMember(MemberVO member);
	public MemberVO signInOfMobile(MemberVO member);
	public MemberVO signInOfWeb(MemberVO member);
	public List<MemberVO> getMemberList(HomeVO home);
	public List<MemberVO> getAllMember(SearchVO search);
	public int countAllMember(SearchVO search);
	public int checkMemberExistInHome(MemberVO member);
	public long addHome(HomeVO home) throws PersistenceException;
	public long modifyHome(SearchVO searc) throws PersistenceException;
	public long insertMember(MemberVO member) throws PersistenceException;
	public long updateMember(MemberVO member) throws PersistenceException;
	public long removeMember(MemberVO member) throws PersistenceException;
	public long updateGcmId(MemberVO member) throws PersistenceException;
	
	public List<PayVO> getPayList(MemberVO member);
	public long modifyPay(PayVO pay) throws PersistenceException;
	public long removePay(PayVO pay) throws PersistenceException;
	public long addPay(PayVO pay) throws PersistenceException;
	
	public long insertLocation(LocationVO location) throws PersistenceException;
	public LocationVO selectLastLocation(MemberVO member);
	public List<LocationVO> selectLocationList(MemberVO member);
	
	public List<SchoolVO> getSchoolList(SchoolVO school);
	public long insertSchool(SchoolVO school) throws PersistenceException;
	
	public BodyMeasureSummary getSummary(MemberVO member);
	public BodyMeasureGrade getMeasureGrade(MemberVO m, String section);
	
	public long addArea(AreaVO area) throws PersistenceException;
	public AreaVO getArea(AreaVO area);
	public List<AreaVO> getAreaList();
	
	//활동량
	public long addActivity(ActivityVO activity) throws PersistenceException;
	public long modifyActivity(ActivityVO activity) throws PersistenceException;
	public ActivityVO getActivity(ActivityVO activity);
	public List<ActivityVO> getActivityList(ActivityVO inActivity);
	
	//비디오 리스트 
	public List<VideoVO> getVideoListByMasterGradeId(VideoTypeVO type);
	public List<VideoVO> getVideoListByInfoType(VideoTypeVO type);
	public VideoTimeVO getVideoTimeOfMember(VideoTimeVO time);
	public long addVideoTime(VideoTimeVO time);
	
	//admin----------------------------------------------------
	public List<SchoolVO> getSchoolListOfMember(SearchVO search);
	public int countSchoolListOfMember(SearchVO search);
	public long updateSchool(SchoolVO school) throws PersistenceException;
	public long addSchoolNoti(SchoolNotiVO noti) throws PersistenceException;
	public List<MemberVO> selectMemberOfSchool(SchoolVO school);
	public long modifySchoolNoti(SchoolNotiVO noti) throws PersistenceException;
	public long removeSchoolNoti(SchoolNotiVO noti) throws PersistenceException;
	public SchoolNotiVO getSchoolNoti(SchoolNotiVO noti);
	public List<SchoolNotiVO> getSchoolNotiList(SchoolNotiVO noti);
	public int countSchoolNotiList(SchoolNotiVO noti);
	public SchoolVO getSchoolById(int school_id);
	public SchoolNotiVO getFilenameOfSchoolNoti(String filename);
	
	public long insertSession(SessionVO session) throws PersistenceException;
	public long insertConsult(ConsultVO consult) throws PersistenceException;
	public long updateSession(SessionVO session) throws PersistenceException;
	public List<SessionVO> selectSessionOngoingList(SearchVO search);
	public int countSessionOngoingList(SearchVO search);
	public SessionVO selectSession(SessionVO session);
	public SessionVO selectLastSession();
	public List<ConsultVO> selectConsultList(SessionVO session);
	public ConsultHistoryVO getConsultHistory(SessionVO session);
	public long addNotiBookmark(SchoolNotiVO noti);
	public long removeNotiBookmark(SchoolNotiVO noti);
	public List<SchoolNotiVO> getSchoolNotiListByMember(SchoolNotiVO noti);
	
	//board, noti
	public List<NotiVO> getNotiList(SearchVO search);
	public int countNotiList(SearchVO search);
	public long addNoti(NotiVO noti) throws PersistenceException;
	public long modifyNoti(NotiVO noti) throws PersistenceException;
	public long removeNoti(NotiVO noti) throws PersistenceException;
	public List<BoardVO> getBoardList(SearchVO board);
	public int countBoardList(SearchVO search);
	public MemberVO getBoardGcm(BoardVO board);
	public long addBoard(BoardVO board) throws PersistenceException;
	public long modifyBoard(BoardVO board) throws PersistenceException;
	public long removeBoard(BoardVO board) throws PersistenceException;
	
	//관리자 화면 사용자 관리
	public long addManager(ManagerVO manager) throws PersistenceException;
	public long modifyManager(ManagerVO manager) throws PersistenceException;
	public long removeManager(ManagerVO manager) throws PersistenceException;
	public int countManager(SearchVO search);
	public ManagerVO getManager(ManagerVO manager);
	public List<ManagerVO> getManagerList(SearchVO search);
	
	public OsInfoVO getOsInfo(OsInfoVO inOsInfo);
}

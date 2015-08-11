package com.aura.smartschool.service;

import java.util.List;

import org.apache.ibatis.exceptions.PersistenceException;

import com.aura.smartschool.domain.AreaVO;
import com.aura.smartschool.domain.BoardVO;
import com.aura.smartschool.domain.BodyMeasureGrade;
import com.aura.smartschool.domain.BodyMeasureSummary;
import com.aura.smartschool.domain.ConsultVO;
import com.aura.smartschool.domain.HomeVO;
import com.aura.smartschool.domain.LocationVO;
import com.aura.smartschool.domain.MemberVO;
import com.aura.smartschool.domain.NotiVO;
import com.aura.smartschool.domain.PayVO;
import com.aura.smartschool.domain.SchoolNoti;
import com.aura.smartschool.domain.SchoolVO;
import com.aura.smartschool.domain.SearchVO;
import com.aura.smartschool.domain.SessionVO;

public interface MobileService {
	public int countHome(HomeVO home);
	public List<HomeVO> selectHomeList(SearchVO search);
	public int countHomeList(SearchVO search);
	public MemberVO selectMember(MemberVO member);
	public MemberVO signIn(MemberVO member);
	public List<MemberVO> getMemberList(HomeVO home);
	public List<PayVO> getPayList(MemberVO member);
	public long insertHome(HomeVO home) throws PersistenceException;
	public long insertMember(MemberVO member) throws PersistenceException;
	public long updateMember(MemberVO member) throws PersistenceException;
	public long updateGcmId(MemberVO member) throws PersistenceException;
	
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
	
	//admin----------------------------------------------------
	public List<SchoolVO> getSchoolListOfMember(SearchVO search);
	public int countSchoolListOfMember(SearchVO search);
	public long updateSchool(SchoolVO school) throws PersistenceException;
	public long addSchoolNoti(SchoolNoti noti) throws PersistenceException;
	public List<MemberVO> selectMemberOfSchool(SchoolVO school);
	public long modifySchoolNoti(SchoolNoti noti) throws PersistenceException;
	public long removeSchoolNoti(SchoolNoti noti) throws PersistenceException;
	public List<SchoolNoti> getSchoolNotiList(SchoolNoti noti);
	public int countSchoolNotiList(SchoolNoti noti);
	
	public long insertSession(SessionVO session) throws PersistenceException;
	public long insertConsult(ConsultVO consult) throws PersistenceException;
	public long updateSession(SessionVO session) throws PersistenceException;
	public List<SessionVO> selectSessionOngoingList(SessionVO session);
	public int countSessionOngoingList(SessionVO session);
	public SessionVO selectSession(SessionVO session);
	public SessionVO selectLastSession();
	public List<ConsultVO> selectConsultList(SessionVO session);
	
	//board, noti
	public List<NotiVO> getNotiList();
	public long addNoti(NotiVO noti) throws PersistenceException;
	public long modifyNoti(NotiVO noti) throws PersistenceException;
	public long removeNoti(NotiVO noti) throws PersistenceException;
	public List<BoardVO> getBoardList(BoardVO board);
	public long addBoard(BoardVO board) throws PersistenceException;
	public long modifyBoard(BoardVO board) throws PersistenceException;
	public long removeBoard(BoardVO board) throws PersistenceException;
}

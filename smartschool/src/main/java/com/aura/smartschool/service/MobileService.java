package com.aura.smartschool.service;

import java.util.List;

import org.apache.ibatis.exceptions.PersistenceException;

import com.aura.smartschool.domain.AreaVO;
import com.aura.smartschool.domain.BodyMeasureGrade;
import com.aura.smartschool.domain.BodyMeasureSummary;
import com.aura.smartschool.domain.Home;
import com.aura.smartschool.domain.LocationVO;
import com.aura.smartschool.domain.Member;
import com.aura.smartschool.domain.SchoolNoti;
import com.aura.smartschool.domain.SchoolVO;

public interface MobileService {
	public int selectHome(Home home);
	public Member selectMember(Member member);
	public Member signIn(Member member);
	public List<Member> getMemberList(Home home);
	public long insertHome(Home home) throws PersistenceException;
	public long insertMember(Member member) throws PersistenceException;
	public long updateMember(Member member) throws PersistenceException;
	public long updateGcmId(Member member) throws PersistenceException;
	
	public long insertLocation(LocationVO location) throws PersistenceException;
	public LocationVO selectLastLocation(Member member);
	public List<LocationVO> selectLocationList(Member member);
	
	public List<SchoolVO> getSchoolList(SchoolVO school);
	public long insertSchool(SchoolVO school) throws PersistenceException;
	
	public BodyMeasureSummary getSummary(Member member);
	public BodyMeasureGrade getMeasureGrade(Member m, String section);
	
	public long addArea(AreaVO area) throws PersistenceException;
	public AreaVO getArea(AreaVO area);
	public List<AreaVO> getAreaList();
	
	//admin----------------------------------------------------
	public List<SchoolVO> getSchoolListOfMember(SchoolVO school);
	public int countSchoolListOfMember();
	public long updateSchool(SchoolVO school) throws PersistenceException;
	public long addSchoolNoti(SchoolNoti noti) throws PersistenceException;
	public long modifySchoolNoti(SchoolNoti noti) throws PersistenceException;
	public long removeSchoolNoti(SchoolNoti noti) throws PersistenceException;
	public List<SchoolNoti> getSchoolNotiList(SchoolNoti noti);
	public int countSchoolNotiList(SchoolNoti noti);
}

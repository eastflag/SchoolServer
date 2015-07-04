package com.aura.smartschool.persistence;

import java.util.List;

import org.apache.ibatis.exceptions.PersistenceException;

import com.aura.smartschool.domain.BodyMeasureGrade;
import com.aura.smartschool.domain.BodyMeasureSummary;
import com.aura.smartschool.domain.Home;
import com.aura.smartschool.domain.LocationVO;
import com.aura.smartschool.domain.Member;
import com.aura.smartschool.domain.SchoolVO;

public interface MobileMapper {
	public int selectHome(Home home);
	public Member selectMember(Member member);
	public Member signIn(Member member);
	public List<Member> selectMemberList(Home home);
	public long insertHome(Home home) throws PersistenceException;
	public long insertMember(Member member) throws PersistenceException;
	public long updateMember(Member member) throws PersistenceException;
	public long updateGcmId(Member member) throws PersistenceException;
	
	public long insertLocation(LocationVO location) throws PersistenceException;
	public LocationVO selectLastLocation(Member member);
	public List<LocationVO> selectLocationList(Member member);
	
	public SchoolVO selectSchoolById(int school_id);
	public List<SchoolVO> selectSchoolList(SchoolVO school);
	public long insertSchool(SchoolVO school) throws PersistenceException;
	
	public List<BodyMeasureSummary> selectBodySummary(Member member);
	public BodyMeasureGrade selectGradeBySection(BodyMeasureGrade grade);
	public BodyMeasureGrade selectSmokerGrade(String ppm);
}

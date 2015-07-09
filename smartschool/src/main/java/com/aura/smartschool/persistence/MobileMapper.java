package com.aura.smartschool.persistence;

import java.util.List;

import org.apache.ibatis.exceptions.PersistenceException;

import com.aura.smartschool.domain.AverageItem;
import com.aura.smartschool.domain.BodyMeasureGrade;
import com.aura.smartschool.domain.BodyMeasureSummary;
import com.aura.smartschool.domain.Home;
import com.aura.smartschool.domain.LocationVO;
import com.aura.smartschool.domain.Member;
import com.aura.smartschool.domain.SchoolVO;
import com.aura.smartschool.domain.StatisticsParam;

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
	//등수 구하기: 현재는 광명데이터로 광명시 전체에서 몇등인가, 향후에는 전체 데이터로 변경 필요
	public BodyMeasureGrade selectGradeBySection(BodyMeasureGrade grade);
	public BodyMeasureGrade selectBeforeGradeRankingBySection(BodyMeasureGrade grade);
	public BodyMeasureGrade selectSmokerGrade(String ppm);
	public String selectBeforeMeasureDate(BodyMeasureGrade grade);
	public BodyMeasureGrade selectGradeRankingBySection(BodyMeasureGrade grade);
	//학교 평균
	public AverageItem selectAveragePerSchool(StatisticsParam param);
	//지역 평균, 현재는 데이터가 없어서 광명시 평균으로 대체
	public AverageItem selectAveragePerLocal(StatisticsParam param);
	//전국 평균, 2012년 데이터
	public AverageItem selectAveragePerNation(StatisticsParam param);
	
}

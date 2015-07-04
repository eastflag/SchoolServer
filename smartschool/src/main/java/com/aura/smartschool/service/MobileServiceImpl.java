package com.aura.smartschool.service;

import java.util.List;

import org.apache.ibatis.exceptions.PersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aura.smartschool.Constant;
import com.aura.smartschool.domain.BodyMeasureGrade;
import com.aura.smartschool.domain.BodyMeasureSummary;
import com.aura.smartschool.domain.Home;
import com.aura.smartschool.domain.LocationVO;
import com.aura.smartschool.domain.Member;
import com.aura.smartschool.domain.SchoolVO;
import com.aura.smartschool.persistence.MobileMapper;
import com.aura.smartschool.util.CommonUtil;

@Service("mobileService")
public class MobileServiceImpl implements MobileService {

	@Autowired
	private MobileMapper mobileMapper;

	@Override
	public int selectHome(Home home) {
		return mobileMapper.selectHome(home);
	}

	@Override
	public Member selectMember(Member member) {
		return mobileMapper.selectMember(member);
	}
	
	@Override
	public Member signIn(Member member) {
		return mobileMapper.signIn(member);
	}
	
	@Override
	public List<Member> getMemberList(Home home) {
		return mobileMapper.selectMemberList(home);
	}
	
	@Override
	public long insertHome(Home home) throws PersistenceException {
		return mobileMapper.insertHome(home);
	}

	@Override
	public long insertMember(Member member) throws PersistenceException {
		return mobileMapper.insertMember(member);
	}

	@Override
	public long updateMember(Member member) throws PersistenceException {
		return mobileMapper.updateMember(member);
	}

	@Override
	public long updateGcmId(Member member) throws PersistenceException {
		return mobileMapper.updateGcmId(member);
	}

	@Override
	public long insertLocation(LocationVO location) throws PersistenceException {
		return mobileMapper.insertLocation(location);
	}
	
	@Override
	public LocationVO selectLastLocation(Member member) {
		return mobileMapper.selectLastLocation(member);
	}

	@Override
	public List<LocationVO> selectLocationList(Member member) {
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
	public BodyMeasureSummary getSummary(Member m) {
		//find member by member_id
		Member member = mobileMapper.selectMember(m);
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
				System.out.println("schoolGradeId:" + schoolGradeId);
				gradeVO.setSchoolGradeId(schoolGradeId);
				
				//get height desc
				gradeVO.setSection(Constant.Height);
				gradeVO.setValue(summaryVO.getHeight());
				BodyMeasureGrade heightVO = mobileMapper.selectGradeBySection(gradeVO);
				if (heightVO != null) {
					summaryVO.setHeightStatus(heightVO.getGradeDesc());
				}
				
				//get Weight desc
				gradeVO.setSection(Constant.Weight);
				gradeVO.setValue(summaryVO.getWeight());
				BodyMeasureGrade weightVO = mobileMapper.selectGradeBySection(gradeVO);
				if (weightVO != null) {
					summaryVO.setWeigthStatus(weightVO.getGradeDesc());
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
}
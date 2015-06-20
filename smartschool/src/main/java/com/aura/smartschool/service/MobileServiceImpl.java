package com.aura.smartschool.service;

import java.util.List;

import org.apache.ibatis.exceptions.PersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aura.smartschool.domain.Home;
import com.aura.smartschool.domain.LocationVO;
import com.aura.smartschool.domain.Member;
import com.aura.smartschool.domain.SchoolVO;
import com.aura.smartschool.persistence.MobileMapper;

@Service("mobileService")
public class MobileServiceImpl implements MobileService {

	@Autowired
	private MobileMapper mobileMapper;

	@Override
	public int selectHome(Home home) {
		return mobileMapper.selectHome(home);
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
	public long insertLocation(LocationVO location) throws PersistenceException {
		return mobileMapper.insertLocation(location);
	}
	
	@Override
	public List<SchoolVO> getSchoolList(SchoolVO school) {
		return mobileMapper.selectSchoolList(school);
	}

	@Override
	public long insertSchool(SchoolVO school) throws PersistenceException {
		return mobileMapper.insertSchool(school);
	}



}
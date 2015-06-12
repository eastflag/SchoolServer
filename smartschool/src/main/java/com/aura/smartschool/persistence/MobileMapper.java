package com.aura.smartschool.persistence;

import java.util.List;

import org.apache.ibatis.exceptions.PersistenceException;

import com.aura.smartschool.domain.Home;
import com.aura.smartschool.domain.LocationVO;
import com.aura.smartschool.domain.Member;

public interface MobileMapper {
	public int selectHome(Home home);
	public Member signIn(Member member);
	public List<Member> getMemberList(Home home);
	public long insertHome(Home home) throws PersistenceException;
	public long insertMember(Member member) throws PersistenceException;
	public long updateMember(Member member) throws PersistenceException;
	
	public long insertLocation(LocationVO location) throws PersistenceException;
}

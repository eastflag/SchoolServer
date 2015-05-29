package com.aura.smartschool.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aura.smartschool.domain.Home;
import com.aura.smartschool.domain.Mobile;
import com.aura.smartschool.persistence.MobileMapper;

@Service("mobileService")
public class MobileServiceImpl implements MobileService {

	@Autowired
	private MobileMapper mobileMapper;

	@Override
	public long insertHome(Home home) {
		mobileMapper.insertHome(home);
		return home.getHome_id();
	}
	
	@Override
	public int signIn(Mobile mobile) {
		return mobileMapper.signIn(mobile);
	}

	@Override
	public int insertMobile(Mobile mobile) {
		return mobileMapper.insertMobile(mobile);
	}

	@Override
	public List<Mobile> getFamily(Mobile mobile) {
		return mobileMapper.getFamily(mobile);
	}
}
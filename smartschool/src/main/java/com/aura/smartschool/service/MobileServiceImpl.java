package com.aura.smartschool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aura.smartschool.domain.Mobile;
import com.aura.smartschool.persistence.MobileMapper;

@Service("mobileService")
public class MobileServiceImpl implements MobileService {

	@Autowired
	private MobileMapper mobileMapper;
	
	@Override
	public Mobile getMobile(Mobile mobile) {
		return mobileMapper.getMobile(mobile);
	}

}
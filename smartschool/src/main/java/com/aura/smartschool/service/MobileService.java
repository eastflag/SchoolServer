package com.aura.smartschool.service;

import java.util.List;

import com.aura.smartschool.domain.Home;
import com.aura.smartschool.domain.Mobile;

public interface MobileService {
	public long insertHome(Home home);
	public int insertMobile(Mobile mobile);
	public List<Mobile> getFamily(Mobile mobile);
	public int signIn(Mobile mobile);
}

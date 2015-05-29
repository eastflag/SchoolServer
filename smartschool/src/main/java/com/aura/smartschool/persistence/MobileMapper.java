package com.aura.smartschool.persistence;

import java.util.List;

import com.aura.smartschool.domain.Home;
import com.aura.smartschool.domain.Mobile;

public interface MobileMapper {
	public long insertHome(Home home);
	public int insertMobile(Mobile mobile);
	public List<Mobile> getFamily(Mobile mobile);
	public int signIn(Mobile mobile);
}

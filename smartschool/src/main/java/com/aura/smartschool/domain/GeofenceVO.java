package com.aura.smartschool.domain;

import lombok.Data;

@Data
public class GeofenceVO {
	private int geofence_id;
	private int member_id;
	private int school_id;
	private int type; //1:enter, 2: exit
	private String created;
	
	private String sex;
	private String school_name;
	private String name;
}

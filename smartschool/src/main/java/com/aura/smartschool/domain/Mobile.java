package com.aura.smartschool.domain;

public class Mobile {
	private int home_id;
	private int mobile_id;
	private String mdn;
	private int relation; //0:부모, 1:학생
	
	public int getHome_id() {
		return home_id;
	}
	public void setHome_id(int home_id) {
		this.home_id = home_id;
	}
	public int getMobile_id() {
		return mobile_id;
	}
	public void setMobile_id(int mobile_id) {
		this.mobile_id = mobile_id;
	}
	public String getMdn() {
		return mdn;
	}
	public void setMdn(String mdn) {
		this.mdn = mdn;
	}
	public int getRelation() {
		return relation;
	}
	public void setRelation(int relation) {
		this.relation = relation;
	}

}

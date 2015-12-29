package com.aura.smartschool.domain;

import java.util.List;
import java.util.Map;

public class GrowthInfo {

	private List<Map<String,Object>> list;
	private String growth;
	private String avgeOfLocal;
	private String avgOfNation;
	public List<Map<String, Object>> getList() {
		return list;
	}
	public void setList(List<Map<String, Object>> list) {
		this.list = list;
	}
	public String getGrowth() {
		return growth;
	}
	public void setGrowth(String growth) {
		this.growth = growth;
	}
	public String getAvgOfLocal() {
		return avgeOfLocal;
	}
	public void setAvgOfLocal(String avgeOfLocal) {
		this.avgeOfLocal = avgeOfLocal;
	}
	public String getAvgOfNation() {
		return avgOfNation;
	}
	public void setAvgOfNation(String avgOfNation) {
		this.avgOfNation = avgOfNation;
	}

}

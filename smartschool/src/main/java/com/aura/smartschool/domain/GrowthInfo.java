package com.aura.smartschool.domain;

import java.util.List;
import java.util.Map;

public class GrowthInfo {

	private List<Map<String,Object>> list;
	private String growth;
	private String avgOfStandard;
	private String avgOfLocal;
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
	public String getAvgOfStandard() {
		return avgOfStandard;
	}
	public void setAvgOfStandard(String avgOfStandard) {
		this.avgOfStandard = avgOfStandard;
	}
	public String getAvgOfLocal() {
		return avgOfLocal;
	}
	public void setAvgOfLocal(String avgOfLocal) {
		this.avgOfLocal = avgOfLocal;
	}
	public String getAvgOfNation() {
		return avgOfNation;
	}
	public void setAvgOfNation(String avgOfNation) {
		this.avgOfNation = avgOfNation;
	}

}

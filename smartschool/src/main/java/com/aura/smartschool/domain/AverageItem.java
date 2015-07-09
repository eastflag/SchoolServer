package com.aura.smartschool.domain;

public class AverageItem {
	String name = "";
	String value = "0";
	String measureDate = "";
	String ranking = "";
	String beforeRanking = "";
	String schoolGrade = "";
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getMeasureDate() {
		return measureDate;
	}
	public void setMeasureDate(String measureDate) {
		this.measureDate = measureDate;
	}
	
	public String getRanking() {
		return ranking;
	}
	public void setRanking(String ranking) {
		this.ranking = ranking;
	}
	public String getSchoolGrade() {
		return schoolGrade;
	}
	public void setSchoolGrade(String schoolGrade) {
		this.schoolGrade = schoolGrade;
	}
	public String getBeforeRanking() {
		return beforeRanking;
	}
	public void setBeforeRanking(String beforeRanking) {
		this.beforeRanking = beforeRanking;
	}
	
	@Override
	public String toString() {
		return "AverageItem [name=" + name + ", value=" + value + ", ranking=" + ranking + ", schoolGrade=" + schoolGrade + ", beforeRanking=" + beforeRanking
				+ ", measureDate=" + measureDate + "]";
	}
	
}

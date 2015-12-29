package com.aura.smartschool.domain;

import java.util.List;
import java.util.Map;

public class RankingListItem {
	private int memberId;
	private String name;
	private String measureDate;
	private String value;
	private String schoolGrade;
	private String schoolName;
	private int rank;
	private int beforeRank;
	private int total;
	
	private List<BodyMeasureGrade> list;
	public int getMemberId() {
		return memberId;
	}
	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMeasureDate() {
		return measureDate;
	}
	public void setMeasureDate(String measureDate) {
		this.measureDate = measureDate;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getSchoolGrade() {
		return schoolGrade;
	}
	public void setSchoolGrade(String schoolGrade) {
		this.schoolGrade = schoolGrade;
	}
	public String getSchoolName() {
		return schoolName;
	}
	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	public int getBeforeRank() {
		return beforeRank;
	}
	public void setBeforeRank(int beforeRank) {
		this.beforeRank = beforeRank;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public List<BodyMeasureGrade> getList() {
		return list;
	}
	public void setList(List<BodyMeasureGrade> list) {
		this.list = list;
	}

}

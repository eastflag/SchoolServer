package com.aura.smartschool.domain;

public class MeasureItem {
	String value = "0";
	String beforeValue = "0";
	
	String gradeId = "";
	String gradeString = "";
	
	String measure_date = "";
	
	//String schoolGrade = "0";
	//String beforeSchoolGrade = "0";
	//String totalNumberOfStudent = "0";
	
	String averageOfClass;
	String averageOfSchool;
	String averageOfLocal;
	String averageOfNation;
	String averageOfStandard;

	//String percentageOfBodyFat; // DongQ 2014.03.12
	//String msGradeString;
	
	int rank;
	int total;
	int beforeRank;
	int beforeTotal;
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getBeforeValue() {
		return beforeValue;
	}
	public void setBeforeValue(String beforeValue) {
		this.beforeValue = beforeValue;
	}
	public String getGradeId() {
		return gradeId;
	}
	public void setGradeId(String gradeId) {
		this.gradeId = gradeId;
	}
	public String getGradeString() {
		return gradeString;
	}
	public void setGradeString(String gradeString) {
		this.gradeString = gradeString;
	}
	public String getMeasure_date() {
		return measure_date;
	}
	public void setMeasure_date(String measure_date) {
		this.measure_date = measure_date;
	}
	public String getAverageOfClass() {
		return averageOfClass;
	}
	public void setAverageOfClass(String averageOfClass) {
		this.averageOfClass = averageOfClass;
	}
	public String getAverageOfSchool() {
		return averageOfSchool;
	}
	public void setAverageOfSchool(String averageOfSchool) {
		this.averageOfSchool = averageOfSchool;
	}
	public String getAverageOfLocal() {
		return averageOfLocal;
	}
	public void setAverageOfLocal(String averageOfLocal) {
		this.averageOfLocal = averageOfLocal;
	}
	public String getAverageOfNation() {
		return averageOfNation;
	}
	public void setAverageOfNation(String averageOfNation) {
		this.averageOfNation = averageOfNation;
	}
	public String getAverageOfStandard() {
		return averageOfStandard;
	}
	public void setAverageOfStandard(String averageOfStandard) {
		this.averageOfStandard = averageOfStandard;
	}
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public int getBeforeRank() {
		return beforeRank;
	}
	public void setBeforeRank(int beforeRank) {
		this.beforeRank = beforeRank;
	}
	public int getBeforeTotal() {
		return beforeTotal;
	}
	public void setBeforeTotal(int beforeTotal) {
		this.beforeTotal = beforeTotal;
	}


	
}

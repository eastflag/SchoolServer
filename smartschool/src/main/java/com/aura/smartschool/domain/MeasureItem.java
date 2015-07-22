package com.aura.smartschool.domain;

public class MeasureItem {
	String value = "0";
	String beforeValue = "0";
	
	String gradeId = "";
	String gradeString = "";
	
	String date = "";
	
	String schoolGrade = "0";
	String beforeSchoolGrade = "0";
	String totalNumberOfStudent = "0";
	
	String averageOfClass;
	String averageOfSchool;
	String averageOfLocal;
	String averageOfNation;
	String averageOfStandard;

	String percentageOfBodyFat; // DongQ 2014.03.12
	String msGradeString;
	
	String rank;
	String beforeRank;
	
	public String getAverageOfStandard() {
		return averageOfStandard;
	}
	public void setAverageOfStandard(String averageOfStandard) {
		this.averageOfStandard = averageOfStandard;
	}
	public String getRank() {
		return rank;
	}
	public void setRank(String rank) {
		this.rank = rank;
	}
	public String getBeforeRank() {
		return beforeRank;
	}
	public void setBeforeRank(String beforeRank) {
		this.beforeRank = beforeRank;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
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
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getSchoolGrade() {
		return schoolGrade;
	}
	public void setSchoolGrade(String schoolGrade) {
		this.schoolGrade = schoolGrade;
	}
	public String getTotalNumberOfStudent() {
		return totalNumberOfStudent;
	}
	public void setTotalNumberOfStudent(String totalNumberOfStudent) {
		this.totalNumberOfStudent = totalNumberOfStudent;
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
	
	public String getBeforeValue() {
		return beforeValue;
	}
	public void setBeforeValue(String beforeValue) {
		this.beforeValue = beforeValue;
	}
	public String getBeforeSchoolGrade() {
		return beforeSchoolGrade;
	}
	public void setBeforeSchoolGrade(String beforeSchoolGrade) {
		this.beforeSchoolGrade = beforeSchoolGrade;
	}
	
	public String getPercentageOfBodyFat() {
		return percentageOfBodyFat;
	}
	public void setPercentageOfBodyFat(String percentageOfBodyFat) {
		this.percentageOfBodyFat = percentageOfBodyFat;
	}
	
	public String getMsGradeString() {
		return msGradeString;
	}
	public void setMsGradeString(String msGradeString) {
		this.msGradeString = msGradeString;
	}
	@Override
	public String toString() {
		return "MeasureItem [value=" + value+ ", beforeValue=" + beforeValue + ", gradeId=" + gradeId
				+ ", gradeString=" + gradeString + ", date=" + date
				+ ", schoolGrade=" + schoolGrade + ", beforeSchoolGrade=" + beforeSchoolGrade + ", totalNumberOfStudent="
				+ totalNumberOfStudent + ", averageOfClass=" + averageOfClass
				+ ", averageOfSchool=" + averageOfSchool + ", averageOfLocal="
				+ averageOfLocal + ", averageOfNation=" + averageOfNation + ", percentageOfBodyFat=" + percentageOfBodyFat + "]";
	}
}

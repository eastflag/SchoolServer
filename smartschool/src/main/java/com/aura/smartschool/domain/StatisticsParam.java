package com.aura.smartschool.domain;

public class StatisticsParam {
	
	public final static String scaleClass = "class"; 
	public final static String scaleSchool = "school";
	public final static String scaleLocal = "local";
	
	// 성별
	String sex;
	
	// 반
	String classNumber;
	
	// 학교 ID
	int schoolId;
	
	// 학년 ID
	String schoolGradeId;
	
	// 통계 기준일
	String measureDate;
	
	String bmi;
	
	// 통계 기준일과 동일한 것만 조회, 아니면 이전의 것 까지 조회
	Boolean isEqualMeasureDate = true;
	
	public Boolean getIsEqualMeasureDate() {
		return isEqualMeasureDate;
	}

	public void setIsEqualMeasureDate(Boolean isEqualMeasureDate) {
		this.isEqualMeasureDate = isEqualMeasureDate;
	}

	// 통계 조회 항목
	String section;
	
	// 통계 조회 범위 : class, school, local
	String scale;
	
	// 이력 갯수
	String historyCount;
	

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getClassNumber() {
		return classNumber;
	}

	public void setClassNumber(String classNumber) {
		this.classNumber = classNumber;
	}

	public int getSchoolId() {
		return schoolId;
	}

	public void setSchoolId(int schoolId) {
		this.schoolId = schoolId;
	}

	public String getSchoolGradeId() {
		return schoolGradeId;
	}

	public void setSchoolGradeId(String schoolGradeId) {
		this.schoolGradeId = schoolGradeId;
	}

	public String getMeasureDate() {
		return measureDate;
	}

	public void setMeasureDate(String measureDate) {
		this.measureDate = measureDate;
	}

	public String getSection() {
		return section;
	}

	public void setSection(String section) {
		this.section = section;
	}

	public String getScale() {
		return scale;
	}

	public void setScale(String scale) {
		this.scale = scale;
	}

	public String getHistoryCount() {
		return historyCount;
	}

	public void setHistoryCount(String historyCount) {
		this.historyCount = historyCount;
	}

	public String getBmi() {
		return bmi;
	}

	public void setBmi(String bmi) {
		this.bmi = bmi;
	}

	@Override
	public String toString() {
		return "StatisticsParma [sex=" + sex + ", classNumber=" + classNumber
				+ ", schoolId=" + schoolId + ", schoolGradeId=" + schoolGradeId
				+ ", measureDate=" + measureDate + ", isEqualMeasureDate="
				+ isEqualMeasureDate + ", section=" + section + ", scale="
				+ scale + ", historyCount=" + historyCount + "]";
	}

}

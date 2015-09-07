package com.aura.smartschool.domain;

public class BodyMeasureGrade {
	// user ID
	int member_id;
	
	String gradeId;
	
	// grade 설명
	String gradeDesc;
	
	// section : BMI, Height, Weight
	String section;
	
	// value : 측정값
	String value;
	
	// beforeValue : 이전 측정값
	String beforeValue;
	
	// 학교 ID
	int schoolId;
		
	// 학년 Grade ID : 1~ 12
	String schoolGradeId;
	
	// 성별
	String sex;
	
	// 년도 : 2013
	String year;
	
	// 년도/월 : 20130911
	String measureDate;
	
	// 년도/월 : 20130911
	String beforeMeasureDate;
	
	// 학교내 학년별 순위
	String schoolGrade = "0";
	
	// 이전 학교내 학년별 순위
	String beforeSchoolGrade = "0";
	
	//랭킹 구하기
	int rank;  //전국 등수
	int total; //전국 학생수
	int beforeRank;  //기존 전국 등수
	int beforeTotal; //기존 전국 학생수
	
	// 학교내 학년별 전체 학생 수
	String totalNumberOfStudent = "0";
	
	//표준 평균
	String averageOfStandard;
	
	// 전국 평균
	String averageOfNation;
	
	// 지역 평균
	String averageOfLocal;
	
	// 학교 평균
	String averageOfSchool;
	
	// 반 평균
	String averageOfClass;

	public int getMember_id() {
		return member_id;
	}

	public void setMember_id(int member_id) {
		this.member_id = member_id;
	}

	public String getGradeId() {
		return gradeId;
	}

	public void setGradeId(String gradeId) {
		this.gradeId = gradeId;
	}

	public String getGradeDesc() {
		return gradeDesc;
	}

	public void setGradeDesc(String gradeDesc) {
		this.gradeDesc = gradeDesc;
	}

	public String getSection() {
		return section;
	}

	public void setSection(String section) {
		this.section = section;
	}

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

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getMeasureDate() {
		return measureDate;
	}

	public void setMeasureDate(String measureDate) {
		this.measureDate = measureDate;
	}

	public String getBeforeMeasureDate() {
		return beforeMeasureDate;
	}

	public void setBeforeMeasureDate(String beforeMeasureDate) {
		this.beforeMeasureDate = beforeMeasureDate;
	}

	public String getSchoolGrade() {
		return schoolGrade;
	}

	public void setSchoolGrade(String schoolGrade) {
		this.schoolGrade = schoolGrade;
	}

	public String getBeforeSchoolGrade() {
		return beforeSchoolGrade;
	}

	public void setBeforeSchoolGrade(String beforeSchoolGrade) {
		this.beforeSchoolGrade = beforeSchoolGrade;
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

	public String getTotalNumberOfStudent() {
		return totalNumberOfStudent;
	}

	public void setTotalNumberOfStudent(String totalNumberOfStudent) {
		this.totalNumberOfStudent = totalNumberOfStudent;
	}

	public String getAverageOfNation() {
		return averageOfNation;
	}

	public void setAverageOfNation(String averageOfNation) {
		this.averageOfNation = averageOfNation;
	}

	public String getAverageOfLocal() {
		return averageOfLocal;
	}

	public void setAverageOfLocal(String averageOfLocal) {
		this.averageOfLocal = averageOfLocal;
	}

	public String getAverageOfSchool() {
		return averageOfSchool;
	}

	public void setAverageOfSchool(String averageOfSchool) {
		this.averageOfSchool = averageOfSchool;
	}

	public String getAverageOfClass() {
		return averageOfClass;
	}

	public void setAverageOfClass(String averageOfClass) {
		this.averageOfClass = averageOfClass;
	}

	public String getAverageOfStandard() {
		return averageOfStandard;
	}

	public void setAverageOfStandard(String averageOfStandard) {
		this.averageOfStandard = averageOfStandard;
	}

	

}

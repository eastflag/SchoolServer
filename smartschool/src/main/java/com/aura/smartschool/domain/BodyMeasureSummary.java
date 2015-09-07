package com.aura.smartschool.domain;

public class BodyMeasureSummary {
	//사용자 구별 ID
	int member_id;
	int school_id;
	String school_grade_id;
	String sex;
	
	// 측정 정보
	String measure_date;
	
	String height;
	String heightStatus;
	String heightGradeId;
	
	String weight;
	String weightStatus;
	String weightGradeId;
	
	String fat;
	String muscle; 
	String waist;
	String skeletal;
	String weight_control;
	String fat_control;
	String muscle_control;
	
	String bmi;
	String bmiStatus;
	String bmiGradeId;
	
	// 흡연 관련 수치
	String ppm;
	String cohd;
	String smokeStatus;
	
	// 성장 점수
	String growthGrade;

	public int getMember_id() {
		return member_id;
	}

	public void setMember_id(int member_id) {
		this.member_id = member_id;
	}

	public String getMeasure_date() {
		return measure_date;
	}

	public void setMeasure_date(String measure_date) {
		this.measure_date = measure_date;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getHeightStatus() {
		return heightStatus;
	}

	public void setHeightStatus(String heightStatus) {
		this.heightStatus = heightStatus;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public String getWeightStatus() {
		return weightStatus;
	}

	public void setWeightStatus(String weightStatus) {
		this.weightStatus = weightStatus;
	}

	public String getFat() {
		return fat;
	}

	public void setFat(String fat) {
		this.fat = fat;
	}

	public String getMuscle() {
		return muscle;
	}

	public void setMuscle(String muscle) {
		this.muscle = muscle;
	}

	public String getWaist() {
		return waist;
	}

	public void setWaist(String waist) {
		this.waist = waist;
	}

	public String getBmi() {
		return bmi;
	}

	public void setBmi(String bmi) {
		this.bmi = bmi;
	}

	public String getBmiStatus() {
		return bmiStatus;
	}

	public void setBmiStatus(String bmiStatus) {
		this.bmiStatus = bmiStatus;
	}

	public String getBmiGradeId() {
		return bmiGradeId;
	}

	public void setBmiGradeId(String bmiGradeId) {
		this.bmiGradeId = bmiGradeId;
	}

	public String getPpm() {
		return ppm;
	}

	public void setPpm(String ppm) {
		this.ppm = ppm;
	}

	public String getCohd() {
		return cohd;
	}

	public void setCohd(String cohd) {
		this.cohd = cohd;
	}

	public String getSmokeStatus() {
		return smokeStatus;
	}

	public void setSmokeStatus(String smokeStatus) {
		this.smokeStatus = smokeStatus;
	}

	public String getGrowthGrade() {
		return growthGrade;
	}

	public void setGrowthGrade(String growthGrade) {
		this.growthGrade = growthGrade;
	}

	public String getSkeletal() {
		return skeletal;
	}

	public void setSkeletal(String skeletal) {
		this.skeletal = skeletal;
	}

	public String getWeight_control() {
		return weight_control;
	}

	public void setWeight_control(String weight_control) {
		this.weight_control = weight_control;
	}

	public String getFat_control() {
		return fat_control;
	}

	public void setFat_control(String fat_control) {
		this.fat_control = fat_control;
	}

	public String getHeightGradeId() {
		return heightGradeId;
	}

	public void setHeightGradeId(String heightGradeId) {
		this.heightGradeId = heightGradeId;
	}

	public String getWeightGradeId() {
		return weightGradeId;
	}

	public void setWeightGradeId(String weightGradeId) {
		this.weightGradeId = weightGradeId;
	}

	public String getMuscle_control() {
		return muscle_control;
	}

	public void setMuscle_control(String muscle_control) {
		this.muscle_control = muscle_control;
	}

	public int getSchool_id() {
		return school_id;
	}

	public void setSchool_id(int school_id) {
		this.school_id = school_id;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getSchool_grade_id() {
		return school_grade_id;
	}

	public void setSchool_grade_id(String school_grade_id) {
		this.school_grade_id = school_grade_id;
	}

	
}

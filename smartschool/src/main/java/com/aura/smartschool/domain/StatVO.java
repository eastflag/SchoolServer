package com.aura.smartschool.domain;


public class StatVO {
	private String sido;
	private String gugun;
	private String school_name;
	private String school_grade;	
	private String school_class;
	private String sex;
	
	private String section1;
	private String section2;
	private String measure_date;
	private String val;
	
	public String getVal() {
		return val;
	}

	public void setVal(String val) {
		this.val = val;
	}

	private String name;
	

public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	//	ii.DATETIMES, s.school_name, school_class, m.sex, m.name,   
	public String getSchool_grade() {
		return school_grade;
	}

	public void setSchool_grade(String school_grade) {
		this.school_grade = school_grade;
	}

	public String getSchool_class() {
		return school_class;
	}

	public void setSchool_class(String school_class) {
		this.school_class = school_class;
	}


	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}
	
	public String getSection1() {
		return section1;
	}

	public void setSection1(String section1) {
		this.section1 = section1;
	}

	public String getSection2() {
		return section2;
	}

	public void setSection2(String section2) {
		this.section2 = section2;
	}

	public String getMeasure_date() {
		return measure_date;
	}

	public void setMeasure_date(String measure_date) {
		this.measure_date = measure_date;
	}
	public String getSido() {
		return sido;
	}

	public String getSchool_name() {
		return school_name;
	}

	public void setSchool_name(String school_name) {
		this.school_name = school_name;
	}

	public void setSido(String sido) {
		this.sido = sido;
	}

	public String getGugun() {
		return gugun;
	}

	public void setGugun(String gugun) {
		this.gugun = gugun;
	}
	
	
}

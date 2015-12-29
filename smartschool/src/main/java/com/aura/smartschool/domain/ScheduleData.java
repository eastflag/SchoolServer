package com.aura.smartschool.domain;

public class ScheduleData {
	public String schedule;

	/**
	 * 일정이 없을 경우
	 */
	public ScheduleData() {
		schedule = "";
	}
	
	/**
	 * 일정이 있을 경우
	 *
	 * @param schedule
	 */
	public ScheduleData(String schedule) {
		this.schedule = schedule;
	}
}

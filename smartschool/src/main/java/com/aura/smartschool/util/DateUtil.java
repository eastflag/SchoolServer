package com.aura.smartschool.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {

	public static String getFormatTime(String timeFormat ) {
		SimpleDateFormat formatter = new SimpleDateFormat (timeFormat);
		
		return formatter.format(new Date());
	}
	
	public static String getFormatTime(Date date, String timeFormat ) {
		SimpleDateFormat formatter = new SimpleDateFormat (timeFormat);
		
		return formatter.format(date);
	}
	
	public static Date getStringToDate(String date,String timeFormat){
		try {
		SimpleDateFormat formatter = new SimpleDateFormat (timeFormat);
			return formatter.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}

	public static String getDayOfWeek(int yyyy, int MM, int i) {
		String day = null;
		Calendar cal= Calendar.getInstance ();

		cal.set(Calendar.YEAR, yyyy);
		cal.set(Calendar.MONTH, (MM-1));
		cal.set(Calendar.DATE, i);

		switch (cal.get(Calendar.DAY_OF_WEEK)){
			case 1:
				day = "일";
				break;
			case 2:
				day = "월";
				break;
			case 3:
				day = "화";
				break;
			case 4:
				day = "수";
				break;
			case 5:
				day = "목";
				break;
			case 6:
				day = "금";
				break;
			case 7:
				day = "토";
				break;
		}
		return day;
	}
}

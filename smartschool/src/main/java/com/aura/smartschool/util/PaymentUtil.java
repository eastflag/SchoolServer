package com.aura.smartschool.util;

import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Enumeration;
import java.io.OutputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import javax.net.ssl.HttpsURLConnection;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.net.HttpURLConnection;

public class PaymentUtil {
	
	public static String MD5data(String str){
		
		String rtnData = ""; 	//결과 DATA
		
		try{
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			md5.update(str.getBytes());
			rtnData =  String.format("%032x", new BigInteger(1, md5.digest()));
		} catch(NoSuchAlgorithmException e){
			e.printStackTrace();                              
			rtnData = ""; 
		}
	
		return rtnData;
	}
	
	public static String sendHttps(String targetUrl, HttpServletRequest request, String hashValue, String EncodeType) {
		
		String sendData = "";
		String recvData = "";
		
		URL url = null;
		HttpsURLConnection conn = null;
//		HttpURLConnection conn = null;										// HTTP 버전으로 테스트가 필요한 경우 사용
	
		try{
			url = new URL(targetUrl);
			conn = (HttpsURLConnection)url.openConnection();
//			conn = (HttpURLConnection)url.openConnection();	// HTTP 버전으로 테스트가 필요한 경우 사용
			
			sendData = setSendParameters(request, hashValue, EncodeType);

			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=euc-kr");
			conn.setRequestProperty("Content-Length", Integer.toString(sendData.length()));
			
			conn.setConnectTimeout(3000);  
			conn.setReadTimeout(17000); 
			
			OutputStream os = conn.getOutputStream();
			os.write(sendData.getBytes());
			os.flush();
			os.close();
		}catch(Exception e){
			e.printStackTrace();
			recvData = "{\"ReplyCode\":9999\"\",\"ReplyMessage\":\"거래요청 전송 중 오류 발생\"}";
		}
			
		try{

			BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line;
			StringBuffer pageBuffer = new StringBuffer();
			while ((line = reader.readLine()) != null) {
				pageBuffer.append(line);
			}
			
			recvData = pageBuffer.toString();

			recvData = URLDecoder.decode(recvData, "UTF-8");
			
		}catch(Exception e){
			e.printStackTrace();
			recvData = "{\"ReplyCode\":9998\"\",\"ReplyMessage\":\"거래요청 수신 중 오류 발생\"}";
		}
	
		return recvData;	
	}

	public static String setSendParameters(ServletRequest req, String hashData, String EncodeType){
		
		String rtnValue = "";
		
		Enumeration<String> enums = req.getParameterNames();
	
		String key = "";
		String value = "";
		
		try{
			while(enums.hasMoreElements()){
				key = enums.nextElement();
				value = req.getParameter(key);
				
				System.out.println("key => "+key);
				System.out.println("value => "+value);
				
				rtnValue += key + "=" + ((value!=null)?URLEncoder.encode(value,"EUC-KR"):"") + "&";
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		
		//hashData 추가
		rtnValue += "FDHash=" + hashData + "&";
		
		//EncodeType 추가
		rtnValue += "EncodeType=" + EncodeType;
		
		return rtnValue;
	}

	public static JSONObject StringToJsonProc(String data) {
		JSONObject jsonObj = new JSONObject();
		
		try{
			JSONParser jsonParser = new JSONParser();
			//JSON데이터를 넣어 JSON Object 로 만들어 준다.
			jsonObj = (JSONObject) jsonParser.parse(data);
		}catch(Exception e){
			e.printStackTrace();
			
			jsonObj.put("ReplyCode","9998");
			jsonObj.put("ReplyMessage","수신 데이터 처리 중 오류 발생");
		}
		
		return jsonObj;
	}

}

package com.aura.smartschool.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.InetAddress;
import java.net.Socket;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Random;

import com.aura.smartschool.domain.SmsVO;

public class SmsUtil {

	public static String nullcheck(String str,  String Defaultvalue ) throws Exception {
		String ReturnDefault = "" ;
		if (str == null) {
			ReturnDefault = Defaultvalue ;
		}
		else if (str == "" ) {
			ReturnDefault =  Defaultvalue ;
		}
		else {
			ReturnDefault = str ;
		}
		return ReturnDefault ;
	}
	
	@SuppressWarnings("restriction")
	public static String base64Encode(String str)  throws java.io.IOException {
		sun.misc.BASE64Encoder encoder = new sun.misc.BASE64Encoder();
		byte[] strByte = str.getBytes();
		String result = encoder.encode(strByte);
		return result ;
	}

	/**
	 * BASE64 Decoder
	 * @param str
	 * @return
	 */
	@SuppressWarnings("restriction")
	public static String base64Decode(String str)  throws java.io.IOException {
		sun.misc.BASE64Decoder decoder = new sun.misc.BASE64Decoder();
		byte[] strByte = decoder.decodeBuffer(str);
		String result = new String(strByte);
		return result ;
	}
	
	@SuppressWarnings("resource")
	public static String[] smsSend(SmsVO sms) throws Exception{
		String charsetType = "UTF-8";			//케릭터셋 설정
		
		String sms_url = "";
		sms_url = "https://sslsms.cafe24.com/sms_sender.php"; // SMS 전송요청 URL
		String user_id = base64Encode(sms.getUserId());
		String secure = base64Encode(sms.getSource());
		String msg = base64Encode(nullcheck(sms.getMsg(),""));
		String rphone = base64Encode(nullcheck(sms.getRphone(),""));
		String sphone1 = base64Encode(nullcheck(sms.getSphone1(),""));
		String sphone2 = base64Encode(nullcheck(sms.getSphone2(),""));
		String sphone3 = base64Encode(nullcheck(sms.getSphone3(),""));
		String smsType = base64Encode(nullcheck(sms.getSmsType(),sms.getMsg().length()>90?"L":"S"));			//메시지 타입: 단문:S, 장문:L
		String mode = base64Encode("1");
		String testflag = base64Encode(nullcheck(sms.getTestflag(),""));		//테스트시: Y, 테스트가 아닐시, 입력안함 
		String rdate = base64Encode(nullcheck(sms.getRdate(),""));				//예약 날짜
		String rtime = base64Encode(nullcheck(sms.getRtime(),""));				//예약 시간
		String subject = "";
		if(sms.getSmsType().equals("L")) {
			subject = base64Encode(nullcheck(sms.getSubject(), ""));				//장문, 제목을 설정할 경우.
		}
		String destination = base64Encode(nullcheck(sms.getDestination(), ""));		//메세지에 특정 문자를 넣을 경우 사용.
		String repeatFlag = base64Encode(nullcheck(sms.getRepeatFlag(), ""));		//반복 설정,반복 설정을 원하는 경우 : Y, 반복하지 않을경우 입력 안함.
		String repeatNum = base64Encode(nullcheck(sms.getRepeatNum(), ""));			//반복 횟수,1~10회 가능.
		String repeatTime = base64Encode(nullcheck(sms.getRepeatTime(), ""));		//반복 시간,15분 이상부터 가능.
		//String returnurl = nullcheck(sms.getReturnurl(), "");						//메시지 전송 후 이동할 페이지
		//String nointeractive = nullcheck(sms.getNointeractive(), "");				//사용할 경우 : 1, 성공시 대화 상자(alert)를 사용 하지 않게 한다.

		String[] host_info = sms_url.split("/");
		String host = host_info[2];
		String path = "/" + host_info[3];
		int port = 80;

		// 데이터 맵핑 변수 정의
		String arrKey[] = new String[] {
				"user_id","secure","msg", "rphone","sphone1","sphone2","sphone3","rdate","rtime"
				,"mode","testflag","destination","repeatFlag","repeatNum", "repeatTime", "smsType", "subject"
			};
		String valKey[]= new String[arrKey.length] ;
		valKey[0] = user_id;
		valKey[1] = secure;
		valKey[2] = msg;
		valKey[3] = rphone;
		valKey[4] = sphone1;
		valKey[5] = sphone2;
		valKey[6] = sphone3;
		valKey[7] = rdate;
		valKey[8] = rtime;
		valKey[9] = mode;
		valKey[10] = testflag;
		valKey[11] = destination;
		valKey[12] = repeatFlag;
		valKey[13] = repeatNum;
		valKey[14] = repeatTime;
		valKey[15] = smsType;
		valKey[16] = subject;
		
		String boundary = "";
		Random rnd = new Random();
		String rndKey = Integer.toString(rnd.nextInt(32000));
		MessageDigest md = MessageDigest.getInstance("MD5");
		byte[] bytData = rndKey.getBytes();
		md.update(bytData);
		byte[] digest = md.digest();
		for(int i =0;i<digest.length;i++){
			boundary = boundary + Integer.toHexString(digest[i] & 0xFF);
		}
		boundary = "---------------------"+boundary.substring(0,11);
		
		// 본문 생성
		String data = "";
		String index = "";
		String value = "";
		for (int i=0;i<arrKey.length; i++)
		{
			index =  arrKey[i];
			value = valKey[i];
			data +="--"+boundary+"\r\n";
			data += "Content-Disposition: form-data; name=\""+index+"\"\r\n";
			data += "\r\n"+value+"\r\n";
			data +="--"+boundary+"\r\n";
		}

		//System.out.println(data);

		//InetAddress addr = InetAddress.getByName(host);
		Socket socket = new Socket(host, port);
		// 헤더 전송
		BufferedWriter wr = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream(), charsetType));
		wr.write("POST "+path+" HTTP/1.0\r\n");
		wr.write("Content-Length: "+data.length()+"\r\n");
		wr.write("Content-type: multipart/form-data, boundary="+boundary+"\r\n");
		wr.write("\r\n");

		// 데이터 전송
		wr.write(data);
		wr.flush();
		
		// 결과값 얻기
		BufferedReader rd = new BufferedReader(new InputStreamReader(socket.getInputStream(),charsetType));
		String line;
		ArrayList<String> tmpArr = new ArrayList<String>();
		while ((line = rd.readLine()) != null) {
			tmpArr.add(line);
		}
		wr.close();
		rd.close();

		String tmpMsg = (String)tmpArr.get(tmpArr.size()-1);
		String[] rMsg = tmpMsg.split(",");
		
		return rMsg;
	}
}

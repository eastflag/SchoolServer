package com.aura.smartschool.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.exceptions.PersistenceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aura.smartschool.domain.Home;
import com.aura.smartschool.domain.LocationVO;
import com.aura.smartschool.domain.Member;
import com.aura.smartschool.domain.SchoolVO;
import com.aura.smartschool.result.Result;
import com.aura.smartschool.result.ResultData;
import com.aura.smartschool.service.MobileService;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;

@RestController
public class ApiController {
	
	private static Logger logger = LoggerFactory.getLogger(ApiController.class);
	
	@Autowired
	private MobileService mobileService;
    
	//로그인하기 :home_id, mdn
	@RequestMapping("/api/signIn")
    public ResultData<List<Member>> signIn(@RequestBody Member member) {
		logger.debug("/api/signIn----------------------------------------------------------------");
		
		//home_id 존재하는지 체크, 
		Member myInfo = mobileService.signIn(member);
		//존재한다면 구성원 리스트를 리턴
		if(myInfo != null) {
			Home home = new Home();
			home.setHome_id(member.getHome_id());
			List<Member> memberList = mobileService.getMemberList(home); 
			
			ResultData<List<Member>> result = new ResultData<List<Member>>(0, "success", memberList);
			
			return result;
		} else {
			return new ResultData<List<Member>>(100, "login failed", null);
		}
    }
	
	//회원가입
	@Transactional
	@RequestMapping("/api/signUp")
    public Result signUp(@RequestBody Member member) {
		logger.debug("/api/signUp----------------------------------------------------------------");
		
		int result = 0;
		String msg = "success";
		try { 
			Home home = new Home();
			home.setHome_id(member.getHome_id());
			
			//home_id 가 존재하는지 체크
			if(mobileService.selectHome(home) > 0) {
				result = 100;
				msg = "home_id exists";
			} else {
				long insertCount = mobileService.insertHome(home);
				logger.debug("insertCount:" + insertCount);
				if(insertCount > 0) {
					mobileService.insertMember(member);
				}
			}
		} catch (PersistenceException e) {
			logger.debug("PersistenceException:");
			result = 500;
			msg = "server error";
		}
		
		return new Result(result, msg);
    }
	
	//가족 멤버 등록
	@RequestMapping("/api/addMember")
    public Result addMember(@RequestBody Member member) {
		logger.debug("/api/addMember-------------------------------------------------------------");
		
		try {
			long resultCount = mobileService.insertMember(member);
			if(resultCount > 0) {
				return new Result(0, "success");
			} else {
				return new Result(100, "insert failed");
			}
		} catch (PersistenceException e) {
			return new Result(100, "insert failed");
		} 
	}
	
	//가족 멤버 수정
	@RequestMapping("/api/updateMember")
    public Result updateMember(@RequestBody Member member) {
		logger.debug("/api/updateMember----------------------------------------------------------");
		
		long resultCount = mobileService.updateMember(member);
		if(resultCount > 0) {
			return new Result(0, "success");
		} else {
			return new Result(100, "update failed");
		}

	}
	
	//가족 멤버 리스트 가져오기
	@RequestMapping("/api/getMemberList")
    public Result getMemberList(@RequestBody Home home) {
		logger.debug("/api/getMemberList---------------------------------------------------------");
		
		List<Member> memberList = mobileService.getMemberList(home);

		ResultData<List<Member>> result = new ResultData<List<Member>>(0, "success");
		
		if(memberList.size() > 0) {
			return new ResultData<List<Member>>(0, "success", memberList);
		} else {
			return new ResultData<List<Member>>(100, "home id does not exist", memberList);
		}
	}
	
	//자녀 위치 등록
	@RequestMapping("/api/addLocation")
    public Result addLocation(@RequestBody LocationVO location) {
		logger.debug("/api/addLocation-----------------------------------------------------------");
		
		int result = 0;
		String msg = "success";
		try {
			mobileService.insertLocation(location);
		} catch (PersistenceException e) {
			result = 500;
			msg = "server error";
		} 
		return new Result(result, msg);
	}
	
	//학교 검색 API
	@RequestMapping("/api/getSchoolList")
	public Result getSchoolList(@RequestBody SchoolVO school) {
		logger.debug("/api/getSchoolList---------------------------------------------------------");
		
		List<SchoolVO> schoolList = mobileService.getSchoolList(school);
		
		if(schoolList.size() > 0) {
			return new ResultData<List<SchoolVO>>(0, "success", schoolList);
		} else {
			return new ResultData<List<SchoolVO>>(100, "school does not exist", schoolList);
		}
	}
	
	//학교 DB 구축 API--------------------------------------------------------------------------------
	@RequestMapping("/api/getSchool")
    public Result getSchool(@RequestParam(value="s_page", required=false) String s_page,
    		@RequestParam(value="e_page", required=false) String e_page) {
		int result = 0;
		String msg = "success";
		
		if(s_page==null) {
			s_page = "0";
		}
		
		int page = Integer.parseInt(s_page);
		int ePage = Integer.parseInt(e_page);

		String url = "http://api.data.go.kr/openapi/4e1a3cda-db21-40b3-b4f8-a1e7de2993bd?serviceKey=39GJD5n4H%2B%2BZJlcm3k8okH3Bc%2F9fj1ne7fNKdFXYQGobEPJpXspv5zrN2ctlLdJcr2qqew%2FXSiMck9RPqhDQPQ%3D%3D";
		
		while(page <= ePage) {
			String parameter = String.format("&s_page=%d&s_list=100&type=json", page);
			logger.debug("url:  " + url+parameter);
			String data = getJSON(url+parameter, 3000);
			
			ArrayList<SchoolVO> mSchoolList = new ArrayList<SchoolVO>();
			JsonArray array = new JsonParser().parse(data).getAsJsonArray();
			
			if(array.size() == 0) {
				break;
			}
			
			for(int i=0; i<array.size(); ++i) {
				JsonObject json = array.get(i).getAsJsonObject();
				SchoolVO school = new SchoolVO();
				
				//SchoolVO school = new Gson().fromJson(json, SchoolVO.class);
				
				//int school_id = json.get("_id").isJsonNull() ? 0 : json.get("_id").getAsInt();
				String gubun1 = json.get("설립구분").isJsonNull() ? null : json.get("설립구분").getAsString();
				String gubun2 = json.get("학교급").isJsonNull() ? null : json.get("학교급").getAsString();
				String name = json.get("학교명").isJsonNull() ? null : json.get("학교명").getAsString();
				String zipcode = json.get("소재지우편번호").isJsonNull() ? null : json.get("소재지우편번호").getAsString();
				String address = json.get("소재지지번주소").isJsonNull() ? null : json.get("소재지지번주소").getAsString();
				String new_address = json.get("소재지도로명주소").isJsonNull() ? null : json.get("소재지도로명주소").getAsString();
				String lat = json.get("위도").isJsonNull() ? null : json.get("위도").getAsString();
				String lng = json.get("경도").isJsonNull() ? null : json.get("경도").getAsString();
				String homepage = json.get("홈페이지주소").isJsonNull() ? null : json.get("홈페이지주소").getAsString();
				String fax = json.get("팩스번호").isJsonNull() ? null : json.get("팩스번호").getAsString();
				String contact = json.get("연락처").isJsonNull() ? null : json.get("연락처").getAsString();
				
				//school.setSchool_id(school_id);
				school.setGubun1(gubun1);
				school.setGubun2(gubun2);
				school.setSchool_name(name);;
				school.setZipcode(zipcode);
				school.setAddress(address);
				school.setNew_address(new_address);
				school.setLat(lat);
				school.setLng(lng);
				school.setHomepage(homepage);
				school.setFax(fax);
				school.setContact(contact);
				
				mSchoolList.add(school);
				mobileService.insertSchool(school);
			}
			
			page += array.size();
		}
		
		return new Result(result, msg);
	}
	
	public String getJSON(String url, int timeout) {
	    HttpURLConnection c = null;
	    try {
	        URL u = new URL(url);
	        c = (HttpURLConnection) u.openConnection();
	        c.setRequestMethod("GET");
	        c.setRequestProperty("Content-length", "0");
	        c.setUseCaches(false);
	        c.setAllowUserInteraction(false);
	        c.setConnectTimeout(timeout);
	        c.setReadTimeout(timeout);
	        c.connect();
	        int status = c.getResponseCode();

	        switch (status) {
	            case 200:
	            case 201:
	                BufferedReader br = new BufferedReader(new InputStreamReader(c.getInputStream()));
	                StringBuilder sb = new StringBuilder();
	                String line;
	                while ((line = br.readLine()) != null) {
	                    sb.append(line+"\n");
	                }
	                br.close();
	                return sb.toString();
	        }

	    } catch (MalformedURLException ex) {
	        logger.debug(ex.getMessage());
	    } catch (IOException ex) {
	    	logger.debug(ex.getMessage());
	    } catch (JsonSyntaxException ex) {
	    	logger.debug(ex.getMessage());
	    } finally {
	       if (c != null) {
	          try {
	              c.disconnect();
	          } catch (Exception ex) {
	        	  logger.debug(ex.getMessage());
	          }
	       }
	    }
	    return null;
	}
}

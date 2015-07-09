package com.aura.smartschool.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.aura.smartschool.domain.Member;
import com.aura.smartschool.service.MobileService;
import com.aura.smartschool.util.CommonUtil;

@Controller
public class HomeController {
	private static Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	private MobileService mobileService;

	@RequestMapping(value = {"/front-views/view"}, method = {RequestMethod.GET, RequestMethod.POST})
	public String GetFrontView(@RequestParam(value="p", required=false) String p,  
			@RequestParam(value="ver", required=false) String ver,
			@RequestParam(value="member_id", required=false) int member_id,  
			Model model, HttpServletRequest request, HttpServletResponse response) {
		
		logger.info("/front-views/view");
		model.addAttribute("p", p);
		
		String isUpdate = "N";
		
		if(CommonUtil.doFindMobileDevice("android", request)){
			isUpdate = "Y";
		} else {
			Member m = new Member();
			m.setMember_id(member_id);
			Member member = mobileService.selectMember(m);
			
			if (member != null) {
				request.setAttribute("userName", member.getName());
				request.setAttribute("userSex", member.getSex());
			}
		}
		
		request.setAttribute("isUpdate", isUpdate);
		response.addCookie(new Cookie("isUpdate", isUpdate));
		
		if (p != null && "more".equals(p) && "N".equals(isUpdate)) {
			return "/front-views/more"; // 더보기 화면
		}else if (p != null && "food".equals(p) && "N".equals(isUpdate)) {
			return "/front-views/food"; // 더보기 화면
		} else {
			logger.debug("/front-view/index");
			return "/front-views/index";
		}
	}
}

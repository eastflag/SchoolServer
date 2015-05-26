package com.aura.smartschool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aura.smartschool.domain.Mobile;
import com.aura.smartschool.service.MobileService;

@RestController
public class ApiController {
	
	@Autowired
	private MobileService mobileService;
    
	@RequestMapping("/api/getUser")
    public Mobile greeting(@RequestBody Mobile mobile) {
        return mobileService.getMobile(mobile);
    }
}

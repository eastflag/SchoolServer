package com.aura.smartschool.controller;

import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.Charset;
import java.util.List;

import javax.jws.WebParam.Mode;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.View;

import com.aura.smartschool.domain.AttachVO;
import com.aura.smartschool.domain.HomeVO;
import com.aura.smartschool.domain.MemberVO;
import com.aura.smartschool.service.MobileService;
import com.aura.smartschool.util.FileUtil;

@Controller
public class CommonController {

	@SuppressWarnings("unused")
	private static Logger logger = LoggerFactory.getLogger(CommonController.class);
	
	@Autowired
	private MobileService mobileService;
	
	/**
	 * 에디터 이미지 파일 업로드
	 */
	@RequestMapping(value="/editor/image/upload", method = RequestMethod.POST)
	public void editorImageUpload(
			HttpServletRequest request
			,HttpServletResponse response
			,@RequestParam("upload") MultipartFile upload
			,ModelMap model){
		
		PrintWriter printWriter = null;
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		String path = request.getServletContext().getRealPath("/upload")+"/editor";

		try{
			String filename = FileUtil.fileUpload(upload,path);
			String callback = request.getParameter("CKEditorFuncNum");
			String fileUrl = "/upload/editor/" + filename;		//이미지경로

			printWriter = response.getWriter();
			printWriter.println("<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction("
					+ callback
					+ ",'"
					+ fileUrl
					+ "','이미지를 업로드 하였습니다.'"
					+ ")</script>");
			printWriter.flush();
			printWriter.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/download.html")
	public View downAttachFile(@RequestParam(value="f") int file_id){
		AttachVO attach = new AttachVO();
		attach.setFile_id(file_id);
		
		return FileUtil.download(mobileService.getAttachFileById(attach));
	}
	
	@RequestMapping("/smarthealth/payment/result.html")
	public String paymentResult(
			HttpServletRequest request
			,ModelMap model){
		
		//RECV DATA
		String rtnCode = "";
		String rtnMsg = "";
		String rtnFDTid = "";
		String rtnMxID = "";
		String rtnMxIssueNO = "";

		if(request.getParameter("Code") != null) rtnCode = request.getParameter("Code");
		if(request.getParameter("Msg") != null) rtnMsg = request.getParameter("Msg");
		if(request.getParameter("FDTid") != null) rtnFDTid = request.getParameter("FDTid");
		if(request.getParameter("MxID") != null) rtnMxID = request.getParameter("MxID");
		if(request.getParameter("MxIssueNO") != null) rtnMxIssueNO = request.getParameter("MxIssueNO");
		
		StringBuffer params = new StringBuffer();
		params.append("code=").append(rtnCode).append("&");
		params.append("message=").append(rtnMsg).append("&");
		params.append("fdtid=").append(rtnFDTid).append("&");
		params.append("mxid=").append(rtnMxID).append("&");
		params.append("mxissueno=").append(rtnMxIssueNO);
		
		return "redirect:/hybrid/index.html#!/paymentResult?"+params.toString();
	}
}
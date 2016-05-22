package com.aura.smartschool.controller;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.View;

import com.aura.smartschool.Constant;
import com.aura.smartschool.domain.AttachVO;
import com.aura.smartschool.domain.PaymentResultVO;
import com.aura.smartschool.service.MobileService;
import com.aura.smartschool.util.FileUtil;
import com.aura.smartschool.util.PaymentUtil;

@Controller
public class CommonController {

	@SuppressWarnings("unused")
	private static Logger logger = LoggerFactory.getLogger(CommonController.class);
	
	@Autowired
	private MobileService mobileService;
	
	/**
	 * 에디터 이미지 파일 업로드
	 * @param request
	 * @param response
	 * @param upload
	 * @param model
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
	
	/**
	 * 첨부파일 다운로드
	 * @param file_id
	 * @return
	 */
	@RequestMapping("/download.html")
	public View downAttachFile(@RequestParam(value="f") int file_id){
		AttachVO attach = new AttachVO();
		attach.setFile_id(file_id);
		
		return FileUtil.download(mobileService.getAttachFileById(attach));
	}
	
	/**
	 * 결제 승인 및 완료 시, 결제상세 정보 가져오기
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("/smarthealth/payment/result.html")
	public String paymentResult(HttpServletRequest request){
		
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
		if(rtnCode.equals("0000")) { //인증성공
			System.out.println("===== 인증성공 =====");
			String EncodeType = "U";
			String rtnData = "";
			String fdtid = "";
			String mxid = "";
			String mxissueno = "";
			String amount = "";
			String pids = "";
			String hashValue = "";
			
			fdtid = rtnFDTid;
			mxid = rtnMxID;
			mxissueno = rtnMxIssueNO;
			if(request.getParameter("Amount") != null) amount = request.getParameter("Amount");
			if(request.getParameter("PIDS") != null) pids = request.getParameter("PIDS");
			
			System.out.println("FdTid => "+fdtid);
			System.out.println("Mxid => "+mxid);
			System.out.println("Mxissueno => "+mxissueno);
			
			/**
			* ■ Hash DATA 생성 처리
			* FDTid 값이 있는 경우  MxID + MxIssueNO + keyData로 HashData 생성 처리
			* FDTid 값이 없는 경우  
			*   1. PIDS(현금영수증 신분확인번호) 값이 있는 경우
			*     MxID + MxIssueNO + Amount + PIDS + keyData로 HashData 생성 처리
			*   2. PIDS(현금영수증 신분확인번호) 값이 없는 경우
			*     MxID + MxIssueNO + Amount + keyData로 HashData 생성 처리
			**/
			if(!"".equals(fdtid)){
				hashValue = PaymentUtil.MD5data(mxid + mxissueno + Constant.KEY_DATA);
			}else{
				if(!"".equals(pids)){	//현금영수증 신분확인 번호가 있는 경우 포함하여 hashData 생성
					hashValue = PaymentUtil.MD5data(mxid + mxissueno + amount + pids + Constant.KEY_DATA);
				}else{
					hashValue = PaymentUtil.MD5data(mxid + mxissueno + amount + Constant.KEY_DATA);
				}
			}
			
			//request DATA (Client - FDK SERVER) WEB(HTTPS) 통신 처리
			rtnData = PaymentUtil.sendHttps(Constant.FDK_SEND_URL, request, hashValue, EncodeType);
			System.out.println("rtnData=> "+rtnData);
			
			//rtnData to JSON DATA 전환 처리
			JSONObject resData = PaymentUtil.StringToJsonProc(rtnData);
			
			if(resData.get("ReplyCode").equals("0000")){
				System.out.println("====== 결제상세정보 등록 ======");
				PaymentResultVO result = new PaymentResultVO();
				result.setReplyCode(String.valueOf(resData.get("ReplyCode")).trim());
				result.setReplyMessage(String.valueOf(resData.get("ReplyMessage")).trim());
				result.setPayMethod(String.valueOf(resData.get("PayMethod")).trim());
				result.setMxID(String.valueOf(resData.get("MxID")).trim());
				result.setMxIssueNO(String.valueOf(resData.get("MxIssueNO")).trim());
				result.setMxIssueDate(String.valueOf(resData.get("MxIssueDate")).trim());
				result.setAmount(String.valueOf(resData.get("Amount")).trim());
				result.setCcMode(String.valueOf(resData.get("CcMode")).trim());
				result.setAuthNO(String.valueOf(resData.get("AuthNO")).trim());
				result.setAcqCD(String.valueOf(resData.get("AcqCD")).trim());
				result.setAcqName(String.valueOf(resData.get("AcqName")).trim());
				result.setIssCD(String.valueOf(resData.get("IssCD")).trim());
				result.setIssName(String.valueOf(resData.get("IssName")).trim());
				result.setCheckYn(String.valueOf(resData.get("CheckYn")).trim());
				result.setCcNO(String.valueOf(resData.get("CcNO")).trim());
				result.setAcqNO(String.valueOf(resData.get("AcqNO")).trim());
				result.setInstallment(String.valueOf(resData.get("Installment")).trim());
				result.setCAP(String.valueOf(resData.get("CAP")).trim());
				result.setBkCode(String.valueOf(resData.get("BkCode")).trim());
				result.setBkName(String.valueOf(resData.get("BkName")).trim());
				result.setVactno(String.valueOf(resData.get("vactno")).trim());
				result.setEscrowYn(String.valueOf(resData.get("EscrowYn")).trim());
				result.setEscrowCustNo(String.valueOf(resData.get("EscrowCustNo")).trim());
				
				mobileService.addPayInfoDetail(result);
			}
			params.append("code=").append(resData.get("ReplyCode"));
			params.append("&message=").append(resData.get("ReplyMessage"));
			//params.append("&mxissueno=").append(resData.get("MxIssueNO"));
		} else { //인증실패
			params.append("code=").append(rtnCode);
			params.append("&message=").append(rtnMsg);
		}
		
		return "redirect:/hybrid/index.html#!/paymentResult?"+params.toString();
	}
}
package com.aura.smartschool.domain;

public class PaymentResultVO {

	private String MxID;				//가맹점 ID
	private String PayMethod;			//서비스종류
	private String MxIssueNO;			//주문번호
	private String MxIssueDate;			//주문시간
	private String Amount;				//결제금액
	private String CcMode;				//거래모드
	private String AuthNO;				//승인번호
	private String AcqCD;				//매입사코드
	private String AcqName;				//매입사명
	private String IssCD;				//발급사코드
	private String IssName;				//발급사명
	private String CheckYn;				//체크카드여부
	private String CcNO;				//카드번호
	private String AcqNO;				//가맹점번호
	private String Installment;			//할부개월
	private String CAP;					//잔여사용가능금액
	private String BkCode;				//가상계좌은행코드
	private String vactno;				//가상계좌번호
	private String EscrowYn;			//에스크로결제여부
	private String EscrowCustNo;		//에스크로회원번호
	private String BkName;				//가상계좌은행명
	private String ReplyCode;			//응답코드
	private String ReplyMessage;		//응답메세지
	
	public String getMxID() {
		return MxID;
	}
	public void setMxID(String mxID) {
		MxID = mxID;
	}
	public String getPayMethod() {
		return PayMethod;
	}
	public void setPayMethod(String payMethod) {
		PayMethod = payMethod;
	}
	public String getMxIssueNO() {
		return MxIssueNO;
	}
	public void setMxIssueNO(String mxIssueNO) {
		MxIssueNO = mxIssueNO;
	}
	public String getMxIssueDate() {
		return MxIssueDate;
	}
	public void setMxIssueDate(String mxIssueDate) {
		MxIssueDate = mxIssueDate;
	}
	public String getAmount() {
		return Amount;
	}
	public void setAmount(String amount) {
		Amount = amount;
	}
	public String getCcMode() {
		return CcMode;
	}
	public void setCcMode(String ccMode) {
		CcMode = ccMode;
	}
	public String getAuthNO() {
		return AuthNO;
	}
	public void setAuthNO(String authNO) {
		AuthNO = authNO;
	}
	public String getAcqCD() {
		return AcqCD;
	}
	public void setAcqCD(String acqCD) {
		AcqCD = acqCD;
	}
	public String getAcqName() {
		return AcqName;
	}
	public void setAcqName(String acqName) {
		AcqName = acqName;
	}
	public String getIssCD() {
		return IssCD;
	}
	public void setIssCD(String issCD) {
		IssCD = issCD;
	}
	public String getIssName() {
		return IssName;
	}
	public void setIssName(String issName) {
		IssName = issName;
	}
	public String getCheckYn() {
		return CheckYn;
	}
	public void setCheckYn(String checkYn) {
		CheckYn = checkYn;
	}
	public String getCcNO() {
		return CcNO;
	}
	public void setCcNO(String ccNO) {
		CcNO = ccNO;
	}
	public String getAcqNO() {
		return AcqNO;
	}
	public void setAcqNO(String acqNO) {
		AcqNO = acqNO;
	}
	public String getInstallment() {
		return Installment;
	}
	public void setInstallment(String installment) {
		Installment = installment;
	}
	public String getCAP() {
		return CAP;
	}
	public void setCAP(String cAP) {
		CAP = cAP;
	}
	public String getBkCode() {
		return BkCode;
	}
	public void setBkCode(String bkCode) {
		BkCode = bkCode;
	}
	public String getVactno() {
		return vactno;
	}
	public void setVactno(String vactno) {
		this.vactno = vactno;
	}
	public String getEscrowYn() {
		return EscrowYn;
	}
	public void setEscrowYn(String escrowYn) {
		EscrowYn = escrowYn;
	}
	public String getEscrowCustNo() {
		return EscrowCustNo;
	}
	public void setEscrowCustNo(String escrowCustNo) {
		EscrowCustNo = escrowCustNo;
	}
	public String getBkName() {
		return BkName;
	}
	public void setBkName(String bkName) {
		BkName = bkName;
	}
	public String getReplyCode() {
		return ReplyCode;
	}
	public void setReplyCode(String replyCode) {
		ReplyCode = replyCode;
	}
	public String getReplyMessage() {
		return ReplyMessage;
	}
	public void setReplyMessage(String replyMessage) {
		ReplyMessage = replyMessage;
	}
}

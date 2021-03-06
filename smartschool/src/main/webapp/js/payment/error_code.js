var error_code = {
	"9000":"결제 고객 취소",
	"0001":"거래확인요망",
	"9001":"수신 데이터 설정 중 오류 발생",
	"9002":"요청 데이터 체크 중 오류 발생",
	"9003":"기초정보 확인 중 오류 발생",
	"9004":"카드정보 확인 중 오류 발생",
	"9005":"거래 TID 생성 중 오류 발생",
	"9006":"거래 정보 암호화 중 오류 발생",
	"9007":"거래 DATA 저장 중 오류 발생",
	"9008":"거래 DATA 확인 중 오류 발생",
	"9009":"거래 정보 복호화 중 오류 발생",
	"9010":"결제 확인 오류[관리자 문의 요망]",
	"9011":"결제 요청 후 무응답 오류[관리자 확인 요망]",
	"9012":"결제 요청 후 무응답,망취소 처리 완료[관리자 확인 요망]",
	"9013":"결제 회신 전문 오류[관리자 확인 요망]",
	"9014":"휴대폰정보 확인 중 오류 발생",
	"9015":"에스크로 회원 조회 중 오류[관리자 문의 요망]",
	"9016":"에스크로 회원 등록 중 오류[관리자 문의 요망]",
	"9017":"계좌이체 정보 확인 중 오류 발생",
	"9101":"MxID 입력 여부 확인 요망",
	"9102":"MxID 길이 초과 [최대 길이:12byte]",
	"9103":"MxIssueNO 입력 여부 확인 요망",
	"9104":"MxIssueNO 길이 초과 [최대 길이:32byte]",
	"9105":"MxIssueDate 입력 여부 확인 요망",
	"9106":"Amount 숫자 입력 여부 확인 요망",
	"9107":"MxIssueDate 길이 초과 [최대 길이:14byte]",
	"9108":"CcProdDesc 입력 여부 확인 요망",
	"9109":"CcProdDesc 길이 초과 [최대 길이:256byte]",
	"9110":"Amount 입력 여부 확인 요망",
	"9111":"Amount 숫자 입력 여부 확인 요망",
	"9112":"Amount 길이 초과 [최대 길이:12byte]",
	"9113":"Currency 유효성 확인(KRW/USD) [입력DATA:XXX]",
	"9114":"SelectPayment 유효성 확인(ALL/CRDT/ACCT/HP/VACT) [입력DATA:XXX]",
	"9115":"Tmode 유효성 확인(WEB/MOB) [입력DATA:XXX]",
	"9116":"LangType 유효성 확인(HAN/ENG) [입력DATA:XXX]",
	"9117":"BillType 유효성 확인(00/01) [입력DATA:XXX]",
	"9118":"ItemInfo 입력 여부 확인 요망",
	"9119":"ItemInfo 유효성 확인(1/2) [입력DATA:XXX]",
	"9120":"connectionType 입력 여부 확인 요망",
	"9121":"connectionType 유효성 확인(http/https) [입력DATA:XXX]",
	"9122":"URL 입력 여부 확인 요망",
	"9123":"URL 길이 초과 [최대 길이:128byte]",
	"9124":"DBPATH 입력 여부 확인 요망",
	"9125":"DBPATH 길이 초과 [최대 길이:128byte]",
	"9126":"escrowYn 유효성 확인(Y/N) [입력DATA:XXX]",
	"9127":"CcNameOnCard 길이 초과 [최대 길이:64byte]",
	"9128":"PhoneNO 길이 초과 [최대 길이:32byte]",
	"9129":"Email 길이 초과 [최대 길이:32byte]",
	"9130":"EncodeType 유효성 확인(E/U) [입력DATA:XXX]",
	"9131":"기초정보 확인 불가 (MxID 확인 요망, [입력MxID:XXX])",
	"9132":"전체 결제 수단 사용 불가(계약 정보 확인 요망!)",
	"9133":"신용카드 결제 사용 불가(계약 정보 확인 요망!)",
	"9134":"휴대폰 결제 사용 불가(계약 정보 확인 요망!)",
	"9135":"계좌이체 결제 사용 불가(계약 정보 확인 요망!)",
	"9136":"가상계좌 결제 사용 불가(계약 정보 확인 요망!)",
	"9137":"rtnUrl 입력 여부 확인 요망",
	"9138":"rtnUrl 유효성 확인(http로 시작) [입력DATA:XXX]",
	"9139":"카드정보 확인 불가 (카드 계약 정보 확인 요망, [입력MxID:XXX])",
	"9140":"FDTid 입력 여부 확인 요망",
	"9141":"FDTid 길이 확인 요망 [고정 길이:14byte]",
	"9142":"FDHash 입력 여부 확인 요망",
	"9143":"FDHash 데이터 불일치 확인 요망",
	"9144":"휴대폰정보 확인 불가 (휴대폰 계약 정보 확인 요망, [입력MxID:XXX, , 입력ItemCode:XXX])",
	"9145":"에스크로 원거래 확인 불가(관리자 확인 요망)",
	"9147":"계좌이체 관련 정보 확인 불가 (계좌이체 계약 정보 확인 요망, [입력MxID:XXX])",
	"9148":"CcMode 입력 여부 확인 요망",
	"9149":"CcMode 유효성 확인 요망(10) [입력DATA:XXX]",
	"9150":"PayMethod 입력 여부 확인 요망",
	"9151":"PayMethod 유효성 확인 요망(CC/IC/MO/VA/CA) [입력DATA:XXX]",
	"9152":"TxCode 입력 여부 확인 요망",
	"9153":"TxCode 유효성 확인 요망(EC131400/EC601200/EC1D1100/EC801200/EC301200) [입력DATA:XXX]",
	"9154":"CardSelect 유효성 확인 요망 [입력DATA:XXX]",
	"9155":"CcProdDesc HTML 태그 입력 불가",
	"9156":"거래 요청 데이터 유효성 검증 실패(CallHash 데이터 확인 요망)"
};

function returnCode(code){
	return error_code[code];
}
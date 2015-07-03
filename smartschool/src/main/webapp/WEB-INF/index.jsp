<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!DOCTYPE html>
<html>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
<script src="http://malsup.github.com/jquery.form.js"></script>

<meta charset="UTF-8">
<title>HealthCare-Server Demo</title>
<style>
Table.GridOne {
	padding: 3px;
	margin: 0;
	background: lightyellow;
	border-collapse: collapse;
	width: 50%;
}

Table.GridOne Td {
	padding: 2px;
	border: 1px solid #ff9900;
	border-collapse: collapse;
}

#result{
width:50%; 
height:100%;
position:absolute;
left:50%;
top:0%;
margin-left:0%;
border: 1px solid #ff9900;
}
</style>

<c:set var="baseURL" value="${pageContext.request.contextPath}"/>

<script type="text/javascript">
	var rootPath = "${baseURL}";
	
	function getServiceInfo() {
		$.ajax({
			type : "post",
			dataType : "json",
			url : rootPath + "/GetServiceInfo",
			contentType : 'application/json',
			cache : false,
			data : "",
			success : function(response) {
				//alert(JSON.stringify(response));
				//$('#result').html("");
				//var obj = JSON.parse(response);
				$('#result').html(JSON.stringify(response));
			},
			error : function() {
				alert('Error while request..');
			}
		});
	}
	
	
	function smsCertification() {
		$.ajax({
			type : "post",
			dataType : "json",
			url : rootPath + "/SMSCertification",
			contentType : 'application/json',
			cache : false,
			data : "{\"mdn\":\"" + $("#mdn").val() + "\"}",
			success : function(response) {
				//alert(JSON.stringify(response));
				//$('#result').html("");
				//var obj = JSON.parse(response);
				$('#result').html(JSON.stringify(response));
			},
			error : function() {
				alert('Error while request..');
			}
		});
	}
	
	function signUp() {
		$.ajax({
			type : "post",
			dataType : "json",
			url : rootPath + "/SignUp",
			contentType : 'application/json',
			cache : false,
			data : "{\"mdn\":\"" + $("#signUpMdn").val() + "\", \"registrationId\":\"" + $("#registrationId").val() + "\"}",
			//data : "{\"mdn\":" + $("#signUpMdn").val() + ", \"registrationId\":\"66666666\"}",
			success : function(response) {
				//alert(JSON.stringify(response));
				//$('#result').html("");
				//var obj = JSON.parse(response);
				$('#result').html(JSON.stringify(response));
			},
			error : function() {
				alert('Error while request..');
			}
		});
	}
	
	function getStudent() {
		$.ajax({
			type : "post",
			dataType : "json",
			url : rootPath + "/GetStudent",
			contentType : 'application/json',
			cache : false,
			data : "{\"mdn\":\"" + $("#getStudentMdn").val() + "\", \"registrationId\":\"" + $("#getStudentRegistrationId").val() + "\"}",
			//data : "{\"mdn\":" + $("#signUpMdn").val() + ", \"registrationId\":\"66666666\"}",
			success : function(response) {
				//alert(JSON.stringify(response));
				//$('#result').html("");
				//var obj = JSON.parse(response);
				$('#result').html(JSON.stringify(response));
			},
			error : function() {
				alert('Error while request..');
			}
		});
	}
	
	
	function getVideoList() {
		$.ajax({
			type : "post",
			dataType : "json",
			url : rootPath + "/GetVideoList",
			contentType : 'application/json',
			cache : false,
			data : "{" +
					"\"masterGradeId\":\"" + $("#masterGradeId").val() + "\"" + 
					", \"schoolGradeId\":\"" + $("#schoolGradeId").val() + "\"" +
					"}",
			success : function(response) {
				//alert(JSON.stringify(response));
				//$('#result').html("");
				//var obj = JSON.parse(response);
				$('#result').html(JSON.stringify(response));
			},
			error : function() {
				alert('Error while request..');
			}
		});
	}
	
	function getCount() {
		$.ajax({
			type : "post",
			dataType : "json",
			url : rootPath + "/notice/GetCount",
			contentType : 'application/json',
			cache : false,
			data : "",
			success : function(response) {
				//alert(JSON.stringify(response));
				//$('#result').html("");
				//var obj = JSON.parse(response);
				$('#result').html(JSON.stringify(response));
			},
			error : function() {
				alert('Error while request..');
			}
		});
	}
	
	$(function() {
		$('#UploadContent').ajaxForm({
			success: function(response) {
				//alert(data);
				$('#result').html(JSON.stringify(response));
			}
		});
	});
	
</script>
</head>
<body>

	<h3>ServiceInfo</h3>
	<form name="GetServiceInfo" method="post">
		<table border="1" class="GridOne">
			<tr>
				<td colspan="2" align="left">HealthCare/GetServiceInfo <input
					type="button" value="GetServiceInfo"
					onclick="getServiceInfo();">
				</td>
			</tr>
		</table>
	</form>

	<h3>SMSCertification</h3>
	<form name="SMSCertification" method="post">
		<table border="1" class="GridOne">
			<tr>
				<td colspan="2" align="left">HealthCare/SMSCertification <input
					type="button" value="SMSCertification"
					onclick="smsCertification();">
				</td>
			</tr>
			<tr>
				<td>mdn</td>
				<td><input type="text" id="mdn" value="01037788036"></td>
			</tr>
		</table>
	</form>
	
	<h3>SignUp</h3>
	<form name="SignUp" method="post">
		<table border="1" class="GridOne">
			<tr>
				<td colspan="2" align="left">HealthCare/SignUp <input
					type="button" value="SignUp"
					onclick="signUp();">
				</td>
			</tr>
			<tr>
				<td>mdn</td>
				<td><input type="text" id="signUpMdn" value="01037788036"></td>
			</tr>
			<tr>
			<td>registrationId</td>
				<td><input type="text" id="registrationId" value="66666666666666666"></td>
			</tr>
		</table>
	</form>
	
	<h3>GetStudent</h3>
	<form name="GetStudent" method="post">
		<table border="1" class="GridOne">
			<tr>
				<td colspan="2" align="left">HealthCare/SignUp <input
					type="button" value="GetStudent"
					onclick="getStudent();">
				</td>
			</tr>
			<tr>
				<td>mdn</td>
				<td><input type="text" id="getStudentMdn" value="01037788036"></td>
			</tr>
			<tr>
			<td>registrationId</td>
				<td><input type="text" id="getStudentRegistrationId" value="66666666666666666"></td>
			</tr>
		</table>
	</form>
	

	<h3>GetVideoList</h3>
	<form name="GetVideoList" method="post">
		<table border="1" class="GridOne">
			<tr>
				<td colspan="2" align="left">HealthCare/GetVideoList <input
					type="button" value="GetVideoList"
					onclick="getVideoList();">
				</td>
			</tr>
			<tr>
				<td>masterGradeId</td>
				<td><input type="text" id="masterGradeId" value="1"></td>
			</tr>
			<tr>
				<td>schoolGradeId</td>
				<td><input type="text" id="schoolGradeId" value="1"></td>
			</tr>
		</table>
	</form>

	
	<h3>Notice/GetCount</h3>
	<form name="Notice/GetCount" method="post">
		<table border="1" class="GridOne">
			<tr>
				<td colspan="2" align="left">HealthCare/notice/GetCount <input
					type="button" value="GetCount"
					onclick="getCount();">
				</td>
			</tr>
		</table>
	</form>
	
	<h3>UploadContent</h3>
	<form id="UploadContent" action="${baseURL}/UploadContent" method="post" enctype="multipart/form-data">
		<table border="1" class="GridOne">
			<tr>
				<td colspan="2" align="left">HealthCare/UploadContent <input
					type="submit" value="Upload" >
				</td>
			</tr>
			<tr>
				<td>file</td>
				<td><input type="file" name="file" ></td>
			</tr>
			<tr>
				<td>mdn</td>
				<td><input type="text" name="mdn" value="01037788036"></td>
			</tr>
		</table>
	</form>

	<div id="result"></div>
</body>
</html>
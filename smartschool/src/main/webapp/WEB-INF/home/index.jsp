<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<!doctype html>
<html lang="ko">
	<head>
		<%@ include file="/WEB-INF/home/inc_head.jsp" %>
		
		<base href="/aura" />
		
		<script type="text/javascript">
		</script>
	</head>
	
	<body ng-app="home" ng-controller="IndexCtrl">
		<section id="wrapper">
			<%@ include file="/WEB-INF/home/inc_body_header.jsp" %>
			
			<ng-view></ng-view>
		</section>
		
		<%@ include file="/WEB-INF/home/inc_body_footer.jsp" %>
	</body>
</html>
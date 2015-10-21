package com.aura.smartschool.config;

import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

@Configuration
@MapperScan("com.aura.smartschool.persistence")
public class DataConfig {
	@Bean
	public DataSource dataSource() {
		SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
		dataSource.setDriverClass(com.mysql.jdbc.Driver.class);
		//dataSource.setUrl("jdbc:mysql://220.73.163.76:3306/AURA_HOME");
		//dataSource.setUsername("aura");
		//dataSource.setPassword("aura2015!");

		dataSource.setUrl("jdbc:mysql://aurasystem.kr:3306/healthcare");
		dataSource.setUsername("healthcare");
		dataSource.setPassword("!healthcare");

		// populate some data
		//JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		//System.out.println("Select tables");
		//List<Map<String,Object>> memberList = jdbcTemplate.queryForList("select * from member");
		//for(Map<String,Object> row: memberList){
		//	System.out.println(row.get("member_id"));
		//	System.out.println(row.get("mdn"));
		//}

		return dataSource;
	}

	@Bean
	public DataSourceTransactionManager transactionManager() {
		return new DataSourceTransactionManager(dataSource());
	}

	@Bean
	public SqlSessionFactoryBean sqlSessionFactory() throws Exception {
		SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
		sessionFactory.setDataSource(dataSource());
		sessionFactory.setTypeAliasesPackage("com.aura.smartschool.domain");
		return sessionFactory;
	}
}
CREATE TABLE `home` (
  `home_id` varchar(45) NOT NULL DEFAULT '',
  PRIMARY KEY (`home_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `member` (
  `member_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `home_id` varchar(45) NOT NULL,
  `mdn` varchar(30) DEFAULT NULL,
  `gcm_id` varchar(256) DEFAULT NULL,
  `is_parent` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(45) NOT NULL,
  `photo` blob,
  `school_name` varchar(45) DEFAULT NULL,
  `school_grade` varchar(2) DEFAULT NULL,
  `school_ban` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  KEY `FK_Member_Home` (`home_id`),
  CONSTRAINT `FK_Member_Home` FOREIGN KEY (`home_id`) REFERENCES `home` (`home_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

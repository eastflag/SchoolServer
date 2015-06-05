CREATE TABLE `home` (
  `home_id` varchar(45) NOT NULL DEFAULT '',
  PRIMARY KEY (`home_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `location` (
  `location_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `address` varchar(450) COLLATE utf8_bin DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`location_id`),
  KEY `FK_LOCATION_MEMBER` (`member_id`),
  CONSTRAINT `FK_LOCATION_MEMBER` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

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

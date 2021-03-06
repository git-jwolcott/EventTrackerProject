-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema exercisedb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `exercisedb` ;

-- -----------------------------------------------------
-- Schema exercisedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `exercisedb` DEFAULT CHARACTER SET utf8 ;
USE `exercisedb` ;

-- -----------------------------------------------------
-- Table `exercise_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `exercise_log` ;

CREATE TABLE IF NOT EXISTS `exercise_log` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `type` VARCHAR(25) NOT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME NOT NULL,
  `latitude` DOUBLE NULL,
  `longitude` DOUBLE NULL,
  `calories_burned` INT NULL,
  `distance` DECIMAL(5,2) NOT NULL,
  `duration` INT NULL,
  `elevation_gain` INT NULL,
  `enabled` TINYINT(1) NULL DEFAULT 1,
  `pace` DECIMAL(4,2) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS exercise@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'exercise'@'localhost' IDENTIFIED BY 'runfaster';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'exercise'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `exercise_log`
-- -----------------------------------------------------
START TRANSACTION;
USE `exercisedb`;
INSERT INTO `exercise_log` (`id`, `title`, `type`, `start_time`, `end_time`, `latitude`, `longitude`, `calories_burned`, `distance`, `duration`, `elevation_gain`, `enabled`, `pace`) VALUES (1, 'Golden Hiking', 'hiking', '2020-01-04T11:16:45', '2020-01-04T13:37:45', 39.716551, -105.209797, 576, 5.0, 8505, 1106, 1, 28.21);

COMMIT;


-- MySQL Script generated by MySQL Workbench
-- Wed Oct 24 00:27:00 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema cic_english
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cic_english
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cic_english` DEFAULT CHARACTER SET utf8 ;
USE `cic_english` ;

-- -----------------------------------------------------
-- Table `cic_english`.`LICENCIATURA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cic_english`.`LICENCIATURA` (
  `LICENCIATURA_ID` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE` VARCHAR(100) NOT NULL,
  `SIGLAS` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`LICENCIATURA_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cic_english`.`SEMESTRE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cic_english`.`SEMESTRE` (
  `SEMESTRE_ID` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE` VARCHAR(20) NULL,
  PRIMARY KEY (`SEMESTRE_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cic_english`.`ALUMNO_INTERNO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cic_english`.`ALUMNO_INTERNO` (
  `MATRICULA` CHAR(8) NOT NULL,
  `NOMBRE` VARCHAR(100) NULL,
  `APP` VARCHAR(100) NULL,
  `APM` VARCHAR(100) NULL,
  `ESTADO` TINYINT NOT NULL DEFAULT 1,
  `LICENCIATURA_ID` INT NOT NULL,
  `SEMESTRE_ID` INT NOT NULL,
  `GRUPO` CHAR(1) NOT NULL DEFAULT 'A',
  `FECHA_REGISTRO` DATE NOT NULL,
  `CONTRASENA` VARCHAR(45) NOT NULL,
  `NIVEL_ACCESO` CHAR(1) NOT NULL DEFAULT '3',
  `EMAIL` VARCHAR(100) NULL,
  PRIMARY KEY (`MATRICULA`, `LICENCIATURA_ID`, `SEMESTRE_ID`),
  INDEX `fk_ALUMNO_LICENCIATURA1_idx` (`LICENCIATURA_ID` ASC),
  INDEX `fk_ALUMNO_SEMESTRE1_idx` (`SEMESTRE_ID` ASC),
  CONSTRAINT `fk_ALUMNO_LICENCIATURA1`
    FOREIGN KEY (`LICENCIATURA_ID`)
    REFERENCES `cic_english`.`LICENCIATURA` (`LICENCIATURA_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ALUMNO_SEMESTRE1`
    FOREIGN KEY (`SEMESTRE_ID`)
    REFERENCES `cic_english`.`SEMESTRE` (`SEMESTRE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cic_english`.`DOCENTE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cic_english`.`DOCENTE` (
  `DOCENTE_ID` CHAR(9) NOT NULL,
  `NOMBRE` VARCHAR(100) NOT NULL,
  `APP` VARCHAR(100) NOT NULL,
  `APM` VARCHAR(100) NULL,
  `ESTADO` TINYINT NOT NULL DEFAULT 1,
  `FECHA_REGISTRO` DATE NOT NULL,
  `CONTRASENA` VARCHAR(45) NOT NULL,
  `NIVEL_ACCESO` CHAR(1) NOT NULL DEFAULT '2',
  `EMAIL` VARCHAR(100) NULL,
  PRIMARY KEY (`DOCENTE_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cic_english`.`NIVEL`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cic_english`.`NIVEL` (
  `ID_NIVEL` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE_CORTO` VARCHAR(10) NULL,
  `NOMBRE` VARCHAR(50) NULL,
  PRIMARY KEY (`ID_NIVEL`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cic_english`.`GRUPO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cic_english`.`GRUPO` (
  `GRUPO_ID` CHAR(12) NOT NULL,
  `NOMBRE` VARCHAR(45) NOT NULL,
  `SALON` VARCHAR(3) NOT NULL,
  `MODALIDAD` CHAR(1) NOT NULL,
  `CICLO_ESCOLAR` VARCHAR(45) NOT NULL,
  `PERIODO_ESCOLAR` VARCHAR(45) NULL,
  `GRUPO` CHAR(1) NOT NULL,
  `TURNO` CHAR(1) NOT NULL,
  `ESTADO` TINYINT NOT NULL DEFAULT 1,
  `FECHA_CREACION` DATE NOT NULL,
  `NIVEL_ID_NIVEL` INT NOT NULL,
  PRIMARY KEY (`GRUPO_ID`, `NIVEL_ID_NIVEL`),
  INDEX `fk_GRUPO_NIVEL1_idx` (`NIVEL_ID_NIVEL` ASC),
  CONSTRAINT `fk_GRUPO_NIVEL1`
    FOREIGN KEY (`NIVEL_ID_NIVEL`)
    REFERENCES `cic_english`.`NIVEL` (`ID_NIVEL`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cic_english`.`GRUPO_DOCENTE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cic_english`.`GRUPO_DOCENTE` (
  `GRUPO_ID` CHAR(12) NOT NULL,
  `DOCENTE_ID` CHAR(9) NOT NULL,
  PRIMARY KEY (`GRUPO_ID`, `DOCENTE_ID`),
  INDEX `fk_GRUPO_has_DOCENTE_DOCENTE1_idx` (`DOCENTE_ID` ASC),
  INDEX `fk_GRUPO_has_DOCENTE_GRUPO1_idx` (`GRUPO_ID` ASC),
  CONSTRAINT `fk_GRUPO_has_DOCENTE_GRUPO1`
    FOREIGN KEY (`GRUPO_ID`)
    REFERENCES `cic_english`.`GRUPO` (`GRUPO_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_GRUPO_has_DOCENTE_DOCENTE1`
    FOREIGN KEY (`DOCENTE_ID`)
    REFERENCES `cic_english`.`DOCENTE` (`DOCENTE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cic_english`.`ALUMNO_GRUPO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cic_english`.`ALUMNO_GRUPO` (
  `ALUMNO_MATRICULA` CHAR(8) NOT NULL,
  `ALUMNO_LICENCIATURA_ID` INT NOT NULL,
  `ALUMNO_SEMESTRE_ID` INT NOT NULL,
  `GRUPO_ID` CHAR(12) NOT NULL,
  `PARCIAL_1` JSON NULL,
  `PARCIAL_2` JSON NULL,
  `PARCIAL_3` JSON NULL,
  `NIVELACION` JSON NULL,
  `FINAL` INT NULL DEFAULT 0,
  `EXTRAORDINARIO` INT NULL DEFAULT 0,
  PRIMARY KEY (`ALUMNO_MATRICULA`, `ALUMNO_LICENCIATURA_ID`, `ALUMNO_SEMESTRE_ID`, `GRUPO_ID`),
  INDEX `fk_ALUMNO_has_GRUPO_GRUPO1_idx` (`GRUPO_ID` ASC),
  INDEX `fk_ALUMNO_has_GRUPO_ALUMNO1_idx` (`ALUMNO_MATRICULA` ASC, `ALUMNO_LICENCIATURA_ID` ASC, `ALUMNO_SEMESTRE_ID` ASC),
  CONSTRAINT `fk_ALUMNO_has_GRUPO_ALUMNO1`
    FOREIGN KEY (`ALUMNO_MATRICULA` , `ALUMNO_LICENCIATURA_ID` , `ALUMNO_SEMESTRE_ID`)
    REFERENCES `cic_english`.`ALUMNO_INTERNO` (`MATRICULA` , `LICENCIATURA_ID` , `SEMESTRE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ALUMNO_has_GRUPO_GRUPO1`
    FOREIGN KEY (`GRUPO_ID`)
    REFERENCES `cic_english`.`GRUPO` (`GRUPO_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cic_english`.`NIVEL_ALUMNO_INTERNO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cic_english`.`NIVEL_ALUMNO_INTERNO` (
  `NIVEL_ID_NIVEL` INT NOT NULL,
  `ALUMNO_MATRICULA` CHAR(8) NOT NULL,
  `ALUMNO_LICENCIATURA_ID` INT NOT NULL,
  `ALUMNO_SEMESTRE_ID` INT NOT NULL,
  PRIMARY KEY (`NIVEL_ID_NIVEL`, `ALUMNO_MATRICULA`, `ALUMNO_LICENCIATURA_ID`, `ALUMNO_SEMESTRE_ID`),
  INDEX `fk_NIVEL_has_ALUMNO_ALUMNO1_idx` (`ALUMNO_MATRICULA` ASC, `ALUMNO_LICENCIATURA_ID` ASC, `ALUMNO_SEMESTRE_ID` ASC),
  INDEX `fk_NIVEL_has_ALUMNO_NIVEL1_idx` (`NIVEL_ID_NIVEL` ASC),
  CONSTRAINT `fk_NIVEL_has_ALUMNO_NIVEL1`
    FOREIGN KEY (`NIVEL_ID_NIVEL`)
    REFERENCES `cic_english`.`NIVEL` (`ID_NIVEL`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_NIVEL_has_ALUMNO_ALUMNO1`
    FOREIGN KEY (`ALUMNO_MATRICULA` , `ALUMNO_LICENCIATURA_ID` , `ALUMNO_SEMESTRE_ID`)
    REFERENCES `cic_english`.`ALUMNO_INTERNO` (`MATRICULA` , `LICENCIATURA_ID` , `SEMESTRE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cic_english`.`ALUMNO_EXTERNO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cic_english`.`ALUMNO_EXTERNO` (
  `ALUMNO_EXTERNO_ID` CHAR(9) NOT NULL,
  `NOMBRE` VARCHAR(100) NOT NULL,
  `APP` VARCHAR(100) NOT NULL,
  `APM` VARCHAR(100) NULL,
  `ESTADO` TINYINT NOT NULL DEFAULT 1,
  `FECHA_REGISTRO` DATE NOT NULL,
  `CONTRASENA` VARCHAR(45) NOT NULL,
  `EMAIL` VARCHAR(100) NULL,
  `NIVEL_ACCESO` VARCHAR(45) NOT NULL DEFAULT '4',
  PRIMARY KEY (`ALUMNO_EXTERNO_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cic_english`.`NIVEL_ALUMNO_EXTERNO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cic_english`.`NIVEL_ALUMNO_EXTERNO` (
  `NIVEL_ID_NIVEL` INT NOT NULL,
  `ALUMNO_EXTERNO_ID` CHAR(9) NOT NULL,
  PRIMARY KEY (`NIVEL_ID_NIVEL`, `ALUMNO_EXTERNO_ID`),
  INDEX `fk_NIVEL_has_ALUMNO_EXTERNO_ALUMNO_EXTERNO1_idx` (`ALUMNO_EXTERNO_ID` ASC),
  INDEX `fk_NIVEL_has_ALUMNO_EXTERNO_NIVEL1_idx` (`NIVEL_ID_NIVEL` ASC),
  CONSTRAINT `fk_NIVEL_has_ALUMNO_EXTERNO_NIVEL1`
    FOREIGN KEY (`NIVEL_ID_NIVEL`)
    REFERENCES `cic_english`.`NIVEL` (`ID_NIVEL`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_NIVEL_has_ALUMNO_EXTERNO_ALUMNO_EXTERNO1`
    FOREIGN KEY (`ALUMNO_EXTERNO_ID`)
    REFERENCES `cic_english`.`ALUMNO_EXTERNO` (`ALUMNO_EXTERNO_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cic_english`.`GRUPO_EXTERNO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cic_english`.`GRUPO_EXTERNO` (
  `GRUPO_EXTERNO_ID` CHAR(12) NOT NULL,
  `NOMBRE` VARCHAR(100) NOT NULL,
  `SALON` VARCHAR(3) NULL,
  `MODALIDAD` CHAR(1) NOT NULL,
  `PERIODO_ESCOLAR` VARCHAR(45) NOT NULL,
  `TURNO` CHAR(1) NOT NULL,
  `ESTADO` TINYINT NOT NULL,
  `FECHA_CREACION` VARCHAR(45) NOT NULL,
  `GRUPO` CHAR(1) NOT NULL,
  `NIVEL_ID_NIVEL` INT NOT NULL,
  PRIMARY KEY (`GRUPO_EXTERNO_ID`, `NIVEL_ID_NIVEL`),
  INDEX `fk_GRUPO_EXTERNO_NIVEL1_idx` (`NIVEL_ID_NIVEL` ASC),
  CONSTRAINT `fk_GRUPO_EXTERNO_NIVEL1`
    FOREIGN KEY (`NIVEL_ID_NIVEL`)
    REFERENCES `cic_english`.`NIVEL` (`ID_NIVEL`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cic_english`.`GRUPO_EXTERNO_DOCENTE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cic_english`.`GRUPO_EXTERNO_DOCENTE` (
  `GRUPO_EXTERNO_ID` CHAR(12) NOT NULL,
  `DOCENTE_ID` CHAR(9) NOT NULL,
  PRIMARY KEY (`GRUPO_EXTERNO_ID`, `DOCENTE_ID`),
  INDEX `fk_GRUPO_EXTERNO_has_DOCENTE_DOCENTE1_idx` (`DOCENTE_ID` ASC),
  INDEX `fk_GRUPO_EXTERNO_has_DOCENTE_GRUPO_EXTERNO1_idx` (`GRUPO_EXTERNO_ID` ASC),
  CONSTRAINT `fk_GRUPO_EXTERNO_has_DOCENTE_GRUPO_EXTERNO1`
    FOREIGN KEY (`GRUPO_EXTERNO_ID`)
    REFERENCES `cic_english`.`GRUPO_EXTERNO` (`GRUPO_EXTERNO_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_GRUPO_EXTERNO_has_DOCENTE_DOCENTE1`
    FOREIGN KEY (`DOCENTE_ID`)
    REFERENCES `cic_english`.`DOCENTE` (`DOCENTE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cic_english`.`ALUMNO_EXTERNO_GRUPO_EXTERNO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cic_english`.`ALUMNO_EXTERNO_GRUPO_EXTERNO` (
  `ALUMNO_EXTERNO_ID` CHAR(9) NOT NULL,
  `GRUPO_EXTERNO_ID` CHAR(12) NOT NULL,
  `PARCIAL_1` JSON NULL,
  `PARCIAL_2` JSON NULL,
  `PARCIAL_3` JSON NULL,
  `NIVELACION` JSON NULL,
  `FINAL` INT NULL DEFAULT 0,
  `EXTRAORDINARIO` INT NULL DEFAULT 0,
  PRIMARY KEY (`ALUMNO_EXTERNO_ID`, `GRUPO_EXTERNO_ID`),
  INDEX `fk_ALUMNO_EXTERNO_has_GRUPO_EXTERNO_GRUPO_EXTERNO1_idx` (`GRUPO_EXTERNO_ID` ASC),
  INDEX `fk_ALUMNO_EXTERNO_has_GRUPO_EXTERNO_ALUMNO_EXTERNO1_idx` (`ALUMNO_EXTERNO_ID` ASC),
  CONSTRAINT `fk_ALUMNO_EXTERNO_has_GRUPO_EXTERNO_ALUMNO_EXTERNO1`
    FOREIGN KEY (`ALUMNO_EXTERNO_ID`)
    REFERENCES `cic_english`.`ALUMNO_EXTERNO` (`ALUMNO_EXTERNO_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ALUMNO_EXTERNO_has_GRUPO_EXTERNO_GRUPO_EXTERNO1`
    FOREIGN KEY (`GRUPO_EXTERNO_ID`)
    REFERENCES `cic_english`.`GRUPO_EXTERNO` (`GRUPO_EXTERNO_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

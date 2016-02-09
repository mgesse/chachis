SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema chachis
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `chachis` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `chachis` ;

-- -----------------------------------------------------
-- Table `chachis`.`Maps`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chachis`.`Maps` (
  `idMap` INT NOT NULL,
  `nomMapa` VARCHAR(45) NOT NULL,
  `urlMapa` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idMap`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chachis`.`Game`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chachis`.`Game` (
  `idGame` INT NOT NULL AUTO_INCREMENT,
  `spritePosX` INT NOT NULL,
  `spritePosY` INT NOT NULL,
  `mapPosX` INT NOT NULL,
  `mapPosY` INT NOT NULL,
  `idMap` INT NOT NULL,
  `newGame` TINYINT(1) NOT NULL,
  PRIMARY KEY (`idGame`),
  INDEX `FK_Game_Maps_idMap_idx` (`idMap` ASC),
  CONSTRAINT `FK_Game_Maps_idMap`
    FOREIGN KEY (`idMap`)
    REFERENCES `chachis`.`Maps` (`idMap`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chachis`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chachis`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `password` VARCHAR(16) NOT NULL,
  `mail` VARCHAR(40) NOT NULL,
  `idGame` INT NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  UNIQUE INDEX `password_UNIQUE` (`password` ASC),
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC),
  INDEX `FK_User_Game_idGame_idx` (`idGame` ASC),
  CONSTRAINT `FK_User_Game_idGame`
    FOREIGN KEY (`idGame`)
    REFERENCES `chachis`.`Game` (`idGame`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chachis`.`Events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chachis`.`Events` (
  `idEvent` VARCHAR(7) NOT NULL,
  `description` VARCHAR(150) NOT NULL,
  `repeatedBox` INT NOT NULL,
  `idMap` INT NOT NULL,
  PRIMARY KEY (`idEvent`),
  INDEX `FK_idMap_Events_Maps_idx` (`idMap` ASC),
  CONSTRAINT `FK_idMap_Events_Maps`
    FOREIGN KEY (`idMap`)
    REFERENCES `chachis`.`Maps` (`idMap`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chachis`.`eventState`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chachis`.`eventState` (
  `idEventState` INT NOT NULL,
  `description` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idEventState`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chachis`.`gameEvents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chachis`.`gameEvents` (
  `idGameEvents` INT NOT NULL AUTO_INCREMENT,
  `idGame` INT NOT NULL,
  `idEvent` VARCHAR(7) NOT NULL,
  `idEventState` INT NOT NULL,
  PRIMARY KEY (`idGameEvents`),
  INDEX `FK_gameEvents_Game_idGame_idx` (`idGame` ASC),
  INDEX `FK_gameEvents_Events_idEvent_idx` (`idEvent` ASC),
  INDEX `FK_gameEvents_eventState_idEventState_idx` (`idEventState` ASC),
  CONSTRAINT `FK_gameEvents_Game_idGame`
    FOREIGN KEY (`idGame`)
    REFERENCES `chachis`.`Game` (`idGame`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_gameEvents_Events_idEvent`
    FOREIGN KEY (`idEvent`)
    REFERENCES `chachis`.`Events` (`idEvent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_gameEvents_eventState_idEventState`
    FOREIGN KEY (`idEventState`)
    REFERENCES `chachis`.`eventState` (`idEventState`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chachis`.`Types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chachis`.`Types` (
  `idType` INT NOT NULL,
  `nameType` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idType`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chachis`.`Chachis`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chachis`.`Chachis` (
  `idChachi` INT NOT NULL,
  `idType` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `base_HP` INT NOT NULL,
  `base_AT` INT NOT NULL,
  `base_DF` INT NOT NULL,
  `base_VE` INT NOT NULL,
  `base_MP` INT NOT NULL,
  `base_EX` INT NOT NULL,
  `sprite_url` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idChachi`),
  INDEX `FK_Chachis_Types_idTypes_idx` (`idType` ASC),
  CONSTRAINT `FK_Chachis_Types_idTypes`
    FOREIGN KEY (`idType`)
    REFERENCES `chachis`.`Types` (`idType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chachis`.`chachisGame`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chachis`.`chachisGame` (
  `idchachisGame` INT NOT NULL AUTO_INCREMENT,
  `idGame` INT NOT NULL,
  `idChachi` INT NOT NULL,
  `level` INT NOT NULL,
  `HP` INT NOT NULL,
  `MP` INT NOT NULL,
  `idMov_1` INT NOT NULL,
  `idMov_2` INT NOT NULL,
  `idMov_3` INT NOT NULL,
  `idMov_4` INT NOT NULL,
  `EXP` INT NOT NULL,
  `teamPosition` INT NOT NULL,
  PRIMARY KEY (`idchachisGame`),
  INDEX `FK_chachis_Game_idGame_idx` (`idGame` ASC),
  INDEX `FK_chachisGame_chachis_idChachi_idx` (`idChachi` ASC),
  CONSTRAINT `FK_chachisGame_Game_idGame`
    FOREIGN KEY (`idGame`)
    REFERENCES `chachis`.`Game` (`idGame`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_chachisGame_chachis_idChachi`
    FOREIGN KEY (`idChachi`)
    REFERENCES `chachis`.`Chachis` (`idChachi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chachis`.`secundaryEffect`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chachis`.`secundaryEffect` (
  `idEffect` INT NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEffect`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chachis`.`moves`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chachis`.`moves` (
  `idmove` INT NOT NULL,
  `moveName` VARCHAR(30) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `idType` INT NOT NULL,
  `PM` INT NOT NULL,
  `power` INT NOT NULL,
  `accuracy` INT NOT NULL,
  `idEffect` INT NOT NULL,
  PRIMARY KEY (`idmove`),
  INDEX `FK_moves_types_idType_idx` (`idType` ASC),
  INDEX `FK_moves_secundaryEffect_idEffect_idx` (`idEffect` ASC),
  CONSTRAINT `FK_moves_types_idType`
    FOREIGN KEY (`idType`)
    REFERENCES `chachis`.`Types` (`idType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_moves_secundaryEffect_idEffect`
    FOREIGN KEY (`idEffect`)
    REFERENCES `chachis`.`secundaryEffect` (`idEffect`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chachis`.`moveChachi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chachis`.`moveChachi` (
  `idmoveChachi` INT NOT NULL AUTO_INCREMENT,
  `idChachi` INT NOT NULL,
  `idMove` INT NOT NULL,
  `levelRequired` INT NOT NULL,
  PRIMARY KEY (`idmoveChachi`),
  INDEX `FK_moveChachi_Chachi_idChachi_idx` (`idChachi` ASC),
  INDEX `FK_moveChachi_moves_idMove_idx` (`idMove` ASC),
  CONSTRAINT `FK_moveChachi_Chachi_idChachi`
    FOREIGN KEY (`idChachi`)
    REFERENCES `chachis`.`Chachis` (`idChachi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_moveChachi_moves_idMove`
    FOREIGN KEY (`idMove`)
    REFERENCES `chachis`.`moves` (`idmove`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chachis`.`mapsChachis`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chachis`.`mapsChachis` (
  `idmapsChachis` INT NOT NULL AUTO_INCREMENT,
  `idMap` INT NOT NULL,
  `idChachi` INT NOT NULL,
  `minLevel` INT NOT NULL,
  `maxLevel` INT NOT NULL,
  PRIMARY KEY (`idmapsChachis`),
  INDEX `FK_mapsChachis_chachis_idChachi_idx` (`idChachi` ASC),
  INDEX `FK_mapsChachis_maps_idMap_idx` (`idMap` ASC),
  CONSTRAINT `FK_mapsChachis_chachis_idChachi`
    FOREIGN KEY (`idChachi`)
    REFERENCES `chachis`.`Chachis` (`idChachi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_mapsChachis_maps_idMap`
    FOREIGN KEY (`idMap`)
    REFERENCES `chachis`.`Maps` (`idMap`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chachis`.`fixedEnemies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chachis`.`fixedEnemies` (
  `idenemy` INT NOT NULL,
  `idChachi` INT NOT NULL,
  `nameFE` VARCHAR(45) NOT NULL,
  `level` INT NOT NULL,
  PRIMARY KEY (`idenemy`),
  INDEX `FK_fixEnemies_Chachis_idChachi_idx` (`idChachi` ASC),
  CONSTRAINT `FK_fixEnemies_Chachis_idChachi`
    FOREIGN KEY (`idChachi`)
    REFERENCES `chachis`.`Chachis` (`idChachi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

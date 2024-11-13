-- MySQL Script generated by MySQL Workbench
-- Wed Nov 13 13:54:54 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema metropolitan
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `metropolitan` ;

-- -----------------------------------------------------
-- Schema metropolitan
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `metropolitan` DEFAULT CHARACTER SET utf8 ;
USE `metropolitan` ;

-- -----------------------------------------------------
-- Table `metropolitan`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`Roles` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `NombreDelRol` TEXT NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `idRol_UNIQUE` ON `metropolitan`.`Roles` (`Id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `metropolitan`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`Usuarios` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` TEXT NOT NULL,
  `Usuario` TEXT NOT NULL,
  `Email` TEXT NOT NULL,
  `FechaRegistro` DATE NOT NULL,
  `Descripción` TEXT NOT NULL,
  `FotoPerfil` TEXT NULL,
  `Rol` INT NOT NULL,
  `Contraseña` TEXT NOT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `fk_Usuarios_Roles`
    FOREIGN KEY (`Rol`)
    REFERENCES `metropolitan`.`Roles` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `idUsuarios_UNIQUE` ON `metropolitan`.`Usuarios` (`Id` ASC) VISIBLE;

CREATE INDEX `fk_Usuarios_Roles_idx` ON `metropolitan`.`Usuarios` (`Rol` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `metropolitan`.`EstadoArticulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`EstadoArticulos` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `NombreDelEstado` TEXT NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `idRol_UNIQUE` ON `metropolitan`.`EstadoArticulos` (`Id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `metropolitan`.`Articulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`Articulos` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` TEXT NOT NULL,
  `FechaDeCreacion` DATE NOT NULL,
  `Visitas` INT NOT NULL,
  `Usuario` INT NOT NULL,
  `Estado` INT NOT NULL,
  `Contenido` TEXT NOT NULL,
  `Imagen` TEXT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `fk_Articulos_Usuarios1`
    FOREIGN KEY (`Usuario`)
    REFERENCES `metropolitan`.`Usuarios` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Articulos_EstadoDeArticulos_copy11`
    FOREIGN KEY (`Estado`)
    REFERENCES `metropolitan`.`EstadoArticulos` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `IdArticulos_UNIQUE` ON `metropolitan`.`Articulos` (`Id` ASC) VISIBLE;

CREATE INDEX `fk_Articulos_Usuarios1_idx` ON `metropolitan`.`Articulos` (`Usuario` ASC) VISIBLE;

CREATE INDEX `fk_Articulos_EstadoDeArticulos_copy11_idx` ON `metropolitan`.`Articulos` (`Estado` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `metropolitan`.`Etiqueta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`Etiqueta` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` TEXT NOT NULL,
  `FechaDeCreacion` DATE NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `IdEtiqueta_UNIQUE` ON `metropolitan`.`Etiqueta` (`Id` ASC) VISIBLE;

CREATE UNIQUE INDEX `Nombre_UNIQUE` ON `metropolitan`.`Etiqueta` (`Nombre`(255) ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `metropolitan`.`EstadoComentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`EstadoComentarios` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `NombreDelEstado` TEXT NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `idRol_UNIQUE` ON `metropolitan`.`EstadoComentarios` (`Id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `metropolitan`.`Comentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`Comentarios` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Articulo` INT NOT NULL,
  `Usuario` INT NOT NULL,
  `Estado` INT NOT NULL,
  `Contenido` TEXT NOT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `fk_Comentarios_Articulos1`
    FOREIGN KEY (`Articulo` , `Usuario`)
    REFERENCES `metropolitan`.`Articulos` (`Id` , `Usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comentarios_EstadoComentarios1`
    FOREIGN KEY (`Estado`)
    REFERENCES `metropolitan`.`EstadoComentarios` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `IdComentarios_UNIQUE` ON `metropolitan`.`Comentarios` (`Id` ASC) VISIBLE;

CREATE INDEX `fk_Comentarios_Articulos1_idx` ON `metropolitan`.`Comentarios` (`Articulo` ASC, `Usuario` ASC) VISIBLE;

CREATE INDEX `fk_Comentarios_EstadoComentarios1_idx` ON `metropolitan`.`Comentarios` (`Estado` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `metropolitan`.`EstadoNotificaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`EstadoNotificaciones` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `NombreDelEstado` TEXT NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `Id_UNIQUE` ON `metropolitan`.`EstadoNotificaciones` (`Id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `metropolitan`.`Notificación`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`Notificación` (
  `IdNotificación` INT NOT NULL AUTO_INCREMENT,
  `Mensaje` TEXT NOT NULL,
  `FechaDeEnvio` DATE NOT NULL,
  `Usuario` INT NOT NULL,
  `Estado` INT NOT NULL,
  PRIMARY KEY (`IdNotificación`),
  CONSTRAINT `fk_Notificación_Usuario`
    FOREIGN KEY (`Usuario`)
    REFERENCES `metropolitan`.`Usuarios` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Notificación_Estado`
    FOREIGN KEY (`Estado`)
    REFERENCES `metropolitan`.`EstadoNotificaciones` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `IdNotificación_UNIQUE` ON `metropolitan`.`Notificación` (`IdNotificación` ASC) VISIBLE;

CREATE INDEX `fk_Notificación_Usuario_idx` ON `metropolitan`.`Notificación` (`Usuario` ASC) VISIBLE;

CREATE INDEX `fk_Notificación_Estado_idx` ON `metropolitan`.`Notificación` (`Estado` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `metropolitan`.`Dudas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`Dudas` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` TEXT NOT NULL,
  `Correo` TEXT NOT NULL,
  `Descripcion` TEXT NOT NULL,
  `ImagenDeAyudaAlProblema` TEXT NULL,
  `FechaDeReporte` DATE NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `IdReportes_UNIQUE` ON `metropolitan`.`Dudas` (`Id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `metropolitan`.`EtiquetasDeUsuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`EtiquetasDeUsuario` (
  `Usuario` INT NOT NULL,
  `Etiqueta` INT NOT NULL,
  PRIMARY KEY (`Usuario`, `Etiqueta`),
  CONSTRAINT `fk_Etiqeuta_Usuario`
    FOREIGN KEY (`Usuario`)
    REFERENCES `metropolitan`.`Usuarios` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EtiquetaDeUsuario_Etiqueta`
    FOREIGN KEY (`Etiqueta`)
    REFERENCES `metropolitan`.`Etiqueta` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_EtiquetaDeUsuario_Etiqueta_idx` ON `metropolitan`.`EtiquetasDeUsuario` (`Etiqueta` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `metropolitan`.`EtiquetasDeArticulo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`EtiquetasDeArticulo` (
  `Articulo` INT NOT NULL,
  `Etiqueta` INT NOT NULL,
  PRIMARY KEY (`Articulo`, `Etiqueta`),
  CONSTRAINT `fk_EtiquetaDeArticulo_Articulo`
    FOREIGN KEY (`Articulo`)
    REFERENCES `metropolitan`.`Articulos` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EtiquetaDeArticulo_Etiqueta`
    FOREIGN KEY (`Etiqueta`)
    REFERENCES `metropolitan`.`Etiqueta` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_EtiquetaDeArticulo_Etiqueta_idx` ON `metropolitan`.`EtiquetasDeArticulo` (`Etiqueta` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `metropolitan`.`Likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`Likes` (
  `Usuario` INT NOT NULL,
  `Articulo` INT NOT NULL,
  PRIMARY KEY (`Usuario`, `Articulo`),
  CONSTRAINT `fk_Likes_Usuarios`
    FOREIGN KEY (`Usuario`)
    REFERENCES `metropolitan`.`Usuarios` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Likes_Articulo`
    FOREIGN KEY (`Articulo`)
    REFERENCES `metropolitan`.`Articulos` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Likes_Articulo_idx` ON `metropolitan`.`Likes` (`Articulo` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `metropolitan`.`UsuarioArticulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`UsuarioArticulos` (
  `Usuario` INT NOT NULL,
  `Articulo` INT NOT NULL,
  PRIMARY KEY (`Usuario`, `Articulo`),
  CONSTRAINT `FK_Usuario_Articulo`
    FOREIGN KEY (`Usuario`)
    REFERENCES `metropolitan`.`Usuarios` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Articulo_Usuario`
    FOREIGN KEY (`Articulo`)
    REFERENCES `metropolitan`.`Articulos` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `FK_Articulo_Usuario_idx` ON `metropolitan`.`UsuarioArticulos` (`Articulo` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `metropolitan`.`ModeracionComentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`ModeracionComentarios` (
  `Usuario` INT NOT NULL,
  `Comentario` INT NOT NULL,
  PRIMARY KEY (`Usuario`, `Comentario`),
  CONSTRAINT `FK_Comentario_Usuario`
    FOREIGN KEY (`Comentario`)
    REFERENCES `metropolitan`.`Comentarios` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Usuario_Comentario`
    FOREIGN KEY (`Usuario`)
    REFERENCES `metropolitan`.`Usuarios` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `FK_Comentario_Usuario_idx` ON `metropolitan`.`ModeracionComentarios` (`Comentario` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `metropolitan`.`ModeracionArticulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`ModeracionArticulos` (
  `Usuario` INT NOT NULL,
  `Articulo` INT NOT NULL,
  PRIMARY KEY (`Usuario`, `Articulo`),
  CONSTRAINT `FK_Usuario_Articulo0`
    FOREIGN KEY (`Usuario`)
    REFERENCES `metropolitan`.`Usuarios` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Articulo_Usuario0`
    FOREIGN KEY (`Articulo`)
    REFERENCES `metropolitan`.`Articulos` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `FK_Articulo_Usuario_idx` ON `metropolitan`.`ModeracionArticulos` (`Articulo` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema metropolitan
-- -----------------------------------------------------

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
  `NombreDelRol` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `idRol_UNIQUE` (`Id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `metropolitan`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`Usuarios` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(255) NOT NULL,
  `Usuario` VARCHAR(255) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
  `FechaRegistro` DATE NOT NULL,
  `Descripción` VARCHAR(255) NOT NULL,
  `FotoPerfil` VARCHAR(255) NULL,
  `Rol` INT NOT NULL,
  `Contraseña` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `idUsuarios_UNIQUE` (`Id` ASC) VISIBLE,
  INDEX `fk_Usuarios_Roles_idx` (`Rol` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_Roles`
    FOREIGN KEY (`Rol`)
    REFERENCES `metropolitan`.`Roles` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `metropolitan`.`EstadoArticulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`EstadoArticulos` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `NombreDelEstado` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `idRol_UNIQUE` (`Id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `metropolitan`.`Articulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`Articulos` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(255) NOT NULL,
  `FechaDeCreacion` DATE NOT NULL,
  `Visitas` INT NOT NULL,
  `Usuario` INT NOT NULL,
  `Estado` INT NOT NULL,
  `Contenido` VARCHAR(255) NOT NULL,
  `Imagen` VARCHAR(255) NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `IdArticulos_UNIQUE` (`Id` ASC) VISIBLE,
  INDEX `fk_Articulos_Usuarios1_idx` (`Usuario` ASC) VISIBLE,
  INDEX `fk_Articulos_EstadoDeArticulos_copy11_idx` (`Estado` ASC) VISIBLE,
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


-- -----------------------------------------------------
-- Table `metropolitan`.`Etiqueta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`Etiqueta` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(255) NOT NULL,
  `FechaDeCreacion` DATE NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `IdEtiqueta_UNIQUE` (`Id` ASC) VISIBLE,
  UNIQUE INDEX `Nombre_UNIQUE` (`Nombre` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `metropolitan`.`EstadoComentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`EstadoComentarios` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `NombreDelEstado` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `idRol_UNIQUE` (`Id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `metropolitan`.`Comentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`Comentarios` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Articulo` INT NOT NULL,
  `Usuario` INT NOT NULL,
  `Estado` INT NOT NULL,
  `Contenido` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `IdComentarios_UNIQUE` (`Id` ASC) VISIBLE,
  INDEX `fk_Comentarios_Articulos1_idx` (`Articulo` ASC, `Usuario` ASC) VISIBLE,
  INDEX `fk_Comentarios_EstadoComentarios1_idx` (`Estado` ASC) VISIBLE,
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


-- -----------------------------------------------------
-- Table `metropolitan`.`EstadoNotificaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`EstadoNotificaciones` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `NombreDelEstado` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `metropolitan`.`Notificación`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`Notificación` (
  `IdNotificación` INT NOT NULL AUTO_INCREMENT,
  `Mensaje` VARCHAR(255) NOT NULL,
  `FechaDeEnvio` DATE NOT NULL,
  `Usuario` INT NOT NULL,
  `Estado` INT NOT NULL,
  PRIMARY KEY (`IdNotificación`),
  UNIQUE INDEX `IdNotificación_UNIQUE` (`IdNotificación` ASC) VISIBLE,
  INDEX `fk_Notificación_Usuario_idx` (`Usuario` ASC) VISIBLE,
  INDEX `fk_Notificación_Estado_idx` (`Estado` ASC) VISIBLE,
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


-- -----------------------------------------------------
-- Table `metropolitan`.`Dudas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`Dudas` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(255) NOT NULL,
  `Correo` VARCHAR(255) NOT NULL,
  `Descripcion` VARCHAR(255) NOT NULL,
  `FechaDeReporte` DATE NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `IdReportes_UNIQUE` (`Id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `metropolitan`.`EtiquetasDeUsuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`EtiquetasDeUsuario` (
  `Usuario` INT NOT NULL,
  `Etiqueta` INT NOT NULL,
  PRIMARY KEY (`Usuario`, `Etiqueta`),
  INDEX `fk_EtiquetaDeUsuario_Etiqueta_idx` (`Etiqueta` ASC) VISIBLE,
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


-- -----------------------------------------------------
-- Table `metropolitan`.`EtiquetasDeArticulo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`EtiquetasDeArticulo` (
  `Articulo` INT NOT NULL,
  `Etiqueta` INT NOT NULL,
  PRIMARY KEY (`Articulo`, `Etiqueta`),
  INDEX `fk_EtiquetaDeArticulo_Etiqueta_idx` (`Etiqueta` ASC) VISIBLE,
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


-- -----------------------------------------------------
-- Table `metropolitan`.`Likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`Likes` (
  `Usuario` INT NOT NULL,
  `Articulo` INT NOT NULL,
  PRIMARY KEY (`Usuario`, `Articulo`),
  INDEX `fk_Likes_Articulo_idx` (`Articulo` ASC) VISIBLE,
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


-- -----------------------------------------------------
-- Table `metropolitan`.`UsuarioArticulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`UsuarioArticulos` (
  `Usuario` INT NOT NULL,
  `Articulo` INT NOT NULL,
  PRIMARY KEY (`Usuario`, `Articulo`),
  INDEX `FK_Articulo_Usuario_idx` (`Articulo` ASC) VISIBLE,
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


-- -----------------------------------------------------
-- Table `metropolitan`.`ModeracionComentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`ModeracionComentarios` (
  `Usuario` INT NOT NULL,
  `Comentario` INT NOT NULL,
  PRIMARY KEY (`Usuario`, `Comentario`),
  INDEX `FK_Comentario_Usuario_idx` (`Comentario` ASC) VISIBLE,
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


-- -----------------------------------------------------
-- Table `metropolitan`.`ModeracionArticulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metropolitan`.`ModeracionArticulos` (
  `Usuario` INT NOT NULL,
  `Articulo` INT NOT NULL,
  PRIMARY KEY (`Usuario`, `Articulo`),
  INDEX `FK_Articulo_Usuario_idx` (`Articulo` ASC) VISIBLE,
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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- INSERCIÓN DE DATOS INICIALES --

-- Inserta un nuevo rol para el administrador
INSERT INTO `metropolitan`.`Roles` (`NombreDelRol`) 
VALUES ('Usuario');

INSERT INTO `metropolitan`.`Roles` (`NombreDelRol`) 
VALUES ('Administrador');

INSERT INTO `metropolitan`.`Roles` (`NombreDelRol`) 
VALUES ('Suspendido');


-- Inserta un usuario administrador --
INSERT INTO `metropolitan`.`Usuarios` 
(`Nombre`, `Usuario`, `Email`, `FechaRegistro`, `Descripción`, `FotoPerfil`, `Rol`, `Contraseña`) 
VALUES 
('Admin', 'admin', 'admin@metropolitan.com', CURDATE(), 'Usuario administrador del sistema', NULL, 2, 'admin');


-- Insertar las etiquetas --
INSERT INTO `metropolitan`.`Etiqueta` (`Nombre`, `FechaDeCreacion`)
VALUES ('Naturaleza', CURDATE());

INSERT INTO `metropolitan`.`Etiqueta` (`Nombre`, `FechaDeCreacion`)
VALUES ('Tecnología', CURDATE());

INSERT INTO `metropolitan`.`Etiqueta` (`Nombre`, `FechaDeCreacion`)
VALUES ('Moda', CURDATE());


-- Insertar estados de Notificaciones --
INSERT INTO `metropolitan`.`EstadoNotificaciones` (`Nombre`)
VALUES ('Enviado');

INSERT INTO `metropolitan`.`EstadoNotificaciones` (`Nombre`)
VALUES ('Leido');


-- Insertar estados de Articulos --
INSERT INTO `metropolitan`.`EstadoArticulos` (`NombreDelEstado`)
VALUES ('En progreso');

INSERT INTO `metropolitan`.`EstadoArticulos` (`NombreDelEstado`)
VALUES ('Publicado');

INSERT INTO `metropolitan`.`EstadoArticulos` (`NombreDelEstado`)
VALUES ('Suspendido');


-- Insertar estados de Comentarios --
INSERT INTO `metropolitan`.`EstadoComentarios` (`NombreDelEstado`)
VALUES ('Publico');

INSERT INTO `metropolitan`.`EstadoComentarios` (`NombreDelEstado`)
VALUES ('Suspendido');

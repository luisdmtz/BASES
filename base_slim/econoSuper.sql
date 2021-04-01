-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: econoSuper
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Datos_factura_usuario`
--

DROP TABLE IF EXISTS `Datos_factura_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Datos_factura_usuario` (
  `idDatos_factura_usuario` int NOT NULL,
  `rfc` varchar(17) NOT NULL,
  `idtarjeta` varchar(20) DEFAULT NULL,
  `tipo_factura` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `persona_idpersona` int NOT NULL,
  `metodoPago_idmetodoPago` int NOT NULL,
  PRIMARY KEY (`idDatos_factura_usuario`),
  KEY `fk_Datos_factura_usuario_persona1_idx` (`persona_idpersona`),
  KEY `fk_Datos_factura_usuario_metodoPago1_idx` (`metodoPago_idmetodoPago`),
  CONSTRAINT `fk_Datos_factura_usuario_metodoPago1` FOREIGN KEY (`metodoPago_idmetodoPago`) REFERENCES `metodoPago` (`idmetodoPago`),
  CONSTRAINT `fk_Datos_factura_usuario_persona1` FOREIGN KEY (`persona_idpersona`) REFERENCES `persona` (`idpersona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Datos_factura_usuario`
--

LOCK TABLES `Datos_factura_usuario` WRITE;
/*!40000 ALTER TABLE `Datos_factura_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `Datos_factura_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `idcategoria` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idcategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deta_pedido`
--

DROP TABLE IF EXISTS `deta_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deta_pedido` (
  `iddeta_pedido` int NOT NULL,
  `costo` decimal(10,0) NOT NULL,
  `cantidad` int NOT NULL,
  `producto_idproducto` int NOT NULL,
  `persona_idpersona` int NOT NULL,
  `pedido_idpedido` int NOT NULL,
  PRIMARY KEY (`iddeta_pedido`),
  KEY `fk_deta_pedido_producto1_idx` (`producto_idproducto`),
  KEY `fk_deta_pedido_persona1_idx` (`persona_idpersona`),
  KEY `fk_deta_pedido_pedido1_idx` (`pedido_idpedido`),
  CONSTRAINT `fk_deta_pedido_pedido1` FOREIGN KEY (`pedido_idpedido`) REFERENCES `pedido` (`idpedido`),
  CONSTRAINT `fk_deta_pedido_persona1` FOREIGN KEY (`persona_idpersona`) REFERENCES `persona` (`idpersona`),
  CONSTRAINT `fk_deta_pedido_producto1` FOREIGN KEY (`producto_idproducto`) REFERENCES `producto` (`idproducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deta_pedido`
--

LOCK TABLES `deta_pedido` WRITE;
/*!40000 ALTER TABLE `deta_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `deta_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_status`
--

DROP TABLE IF EXISTS `detalle_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_status` (
  `iddetalle_status` int NOT NULL,
  `fecha` datetime NOT NULL,
  `pedido_id` int NOT NULL,
  PRIMARY KEY (`iddetalle_status`),
  KEY `fk_detalle_status_pedido1_idx` (`pedido_id`),
  CONSTRAINT `id_pedido ` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`idpedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_status`
--

LOCK TABLES `detalle_status` WRITE;
/*!40000 ALTER TABLE `detalle_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direcciones`
--

DROP TABLE IF EXISTS `direcciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direcciones` (
  `iddirecciones` int NOT NULL,
  `calle` varchar(45) NOT NULL,
  `colonia` varchar(45) NOT NULL,
  `no_casa` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `ciudad` varchar(45) NOT NULL,
  `text_direc` varchar(45) NOT NULL,
  `id_persona` int NOT NULL,
  PRIMARY KEY (`iddirecciones`),
  KEY `fk_direcciones_persona1_idx` (`id_persona`),
  CONSTRAINT `fk_direcciones_persona1` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`idpersona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direcciones`
--

LOCK TABLES `direcciones` WRITE;
/*!40000 ALTER TABLE `direcciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `direcciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gal_product`
--

DROP TABLE IF EXISTS `gal_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gal_product` (
  `idgal_product` int NOT NULL,
  `imagen` varchar(250) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `producto_idproducto` int NOT NULL,
  PRIMARY KEY (`idgal_product`),
  KEY `fk_gal_product_producto1_idx` (`producto_idproducto`),
  CONSTRAINT `fk_gal_product_producto1` FOREIGN KEY (`producto_idproducto`) REFERENCES `producto` (`idproducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gal_product`
--

LOCK TABLES `gal_product` WRITE;
/*!40000 ALTER TABLE `gal_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `gal_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensajes` (
  `idmensajes` int NOT NULL,
  `fecha_envio` varchar(45) DEFAULT NULL,
  `mensajes` datetime DEFAULT NULL,
  `fecha_expiracion` datetime DEFAULT NULL,
  `codigo` varchar(45) DEFAULT NULL,
  `codigo_pais` varchar(45) DEFAULT NULL,
  `temtelefono` varchar(10) DEFAULT NULL,
  `pedido_idpedido` int NOT NULL,
  PRIMARY KEY (`idmensajes`),
  KEY `fk_mensajes_pedido1_idx` (`pedido_idpedido`),
  CONSTRAINT `fk_mensajes_pedido1` FOREIGN KEY (`pedido_idpedido`) REFERENCES `pedido` (`idpedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensajes`
--

LOCK TABLES `mensajes` WRITE;
/*!40000 ALTER TABLE `mensajes` DISABLE KEYS */;
/*!40000 ALTER TABLE `mensajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodoPago`
--

DROP TABLE IF EXISTS `metodoPago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodoPago` (
  `idmetodoPago` int NOT NULL,
  `Descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idmetodoPago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodoPago`
--

LOCK TABLES `metodoPago` WRITE;
/*!40000 ALTER TABLE `metodoPago` DISABLE KEYS */;
/*!40000 ALTER TABLE `metodoPago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ofer_product`
--

DROP TABLE IF EXISTS `ofer_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ofer_product` (
  `idofer_product` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `precio_actual` decimal(10,0) NOT NULL,
  `porcen_desc` decimal(10,0) NOT NULL,
  `precio_ofer` decimal(10,0) NOT NULL,
  `producto_idproducto` int NOT NULL,
  PRIMARY KEY (`idofer_product`),
  KEY `fk_ofer_product_producto1_idx` (`producto_idproducto`),
  CONSTRAINT `fk_ofer_product_producto1` FOREIGN KEY (`producto_idproducto`) REFERENCES `producto` (`idproducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ofer_product`
--

LOCK TABLES `ofer_product` WRITE;
/*!40000 ALTER TABLE `ofer_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `ofer_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pas_pago`
--

DROP TABLE IF EXISTS `pas_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pas_pago` (
  `idpas_pago` int NOT NULL,
  `id_clientePaspago` varchar(45) NOT NULL,
  `persona_idpersona` int NOT NULL,
  PRIMARY KEY (`idpas_pago`),
  KEY `fk_pas_pago_persona1_idx` (`persona_idpersona`),
  CONSTRAINT `fk_pas_pago_persona1` FOREIGN KEY (`persona_idpersona`) REFERENCES `persona` (`idpersona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pas_pago`
--

LOCK TABLES `pas_pago` WRITE;
/*!40000 ALTER TABLE `pas_pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `pas_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `idpedido` int NOT NULL,
  `Fecha` datetime NOT NULL,
  `total` datetime NOT NULL,
  `pagado` varchar(45) DEFAULT NULL,
  `persona_idpersona` int NOT NULL,
  PRIMARY KEY (`idpedido`),
  KEY `fk_pedido_persona1_idx` (`persona_idpersona`),
  CONSTRAINT `fk_pedido_persona1` FOREIGN KEY (`persona_idpersona`) REFERENCES `persona` (`idpersona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_motivo`
--

DROP TABLE IF EXISTS `pedido_motivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_motivo` (
  `idpedido_motivo` int NOT NULL,
  `motivo` varchar(45) DEFAULT NULL,
  `status_pedido_idstatus_pedido` int NOT NULL,
  `pedido_idpedido` int NOT NULL,
  PRIMARY KEY (`idpedido_motivo`),
  KEY `fk_pedido_motivo_status_pedido1_idx` (`status_pedido_idstatus_pedido`),
  KEY `fk_pedido_motivo_pedido1_idx` (`pedido_idpedido`),
  CONSTRAINT `fk_pedido_motivo_pedido1` FOREIGN KEY (`pedido_idpedido`) REFERENCES `pedido` (`idpedido`),
  CONSTRAINT `fk_pedido_motivo_status_pedido1` FOREIGN KEY (`status_pedido_idstatus_pedido`) REFERENCES `status_pedido` (`idstatus_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_motivo`
--

LOCK TABLES `pedido_motivo` WRITE;
/*!40000 ALTER TABLE `pedido_motivo` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido_motivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `idpersona` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(60) NOT NULL,
  `apellidos` varchar(60) NOT NULL,
  `status` varchar(45) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `codigo_pais` varchar(10) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `tipoPersona_idtipoPersona` int NOT NULL,
  PRIMARY KEY (`idpersona`),
  KEY `fk_persona_tipoPersona_idx` (`tipoPersona_idtipoPersona`),
  CONSTRAINT `fk_persona_tipoPersona` FOREIGN KEY (`tipoPersona_idtipoPersona`) REFERENCES `tipoPersona` (`idtipoPersona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `idproducto` int NOT NULL,
  `cod_product` varchar(45) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` decimal(10,0) NOT NULL,
  `informacion` varchar(50) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `disponible` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `imagen` varchar(45) NOT NULL,
  `categoria_idcategoria` int NOT NULL,
  PRIMARY KEY (`idproducto`),
  KEY `fk_producto_categoria1_idx` (`categoria_idcategoria`),
  CONSTRAINT `fk_producto_categoria1` FOREIGN KEY (`categoria_idcategoria`) REFERENCES `categoria` (`idcategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_pedido`
--

DROP TABLE IF EXISTS `status_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_pedido` (
  `idstatus_pedido` int NOT NULL,
  `status` varchar(45) NOT NULL,
  `pedido_idpedido` int NOT NULL,
  PRIMARY KEY (`idstatus_pedido`),
  KEY `fk_status_pedido_pedido1_idx` (`pedido_idpedido`),
  CONSTRAINT `fk_status_pedido_pedido1` FOREIGN KEY (`pedido_idpedido`) REFERENCES `pedido` (`idpedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_pedido`
--

LOCK TABLES `status_pedido` WRITE;
/*!40000 ALTER TABLE `status_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `status_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarjetas`
--

DROP TABLE IF EXISTS `tarjetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarjetas` (
  `idtarjetas` int NOT NULL,
  `last` varchar(45) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `persona_idpersona` int NOT NULL,
  `pas_pago_idpas_pago` int NOT NULL,
  PRIMARY KEY (`idtarjetas`),
  KEY `fk_tarjetas_persona1_idx` (`persona_idpersona`),
  KEY `fk_tarjetas_pas_pago1_idx` (`pas_pago_idpas_pago`),
  CONSTRAINT `fk_tarjetas_pas_pago1` FOREIGN KEY (`pas_pago_idpas_pago`) REFERENCES `pas_pago` (`idpas_pago`),
  CONSTRAINT `fk_tarjetas_persona1` FOREIGN KEY (`persona_idpersona`) REFERENCES `persona` (`idpersona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarjetas`
--

LOCK TABLES `tarjetas` WRITE;
/*!40000 ALTER TABLE `tarjetas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tarjetas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoPersona`
--

DROP TABLE IF EXISTS `tipoPersona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoPersona` (
  `idtipoPersona` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idtipoPersona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoPersona`
--

LOCK TABLES `tipoPersona` WRITE;
/*!40000 ALTER TABLE `tipoPersona` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipoPersona` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-17 16:58:59

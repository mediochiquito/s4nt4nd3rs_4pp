-- phpMyAdmin SQL Dump
-- version 4.0.6
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 20-12-2013 a las 22:12:39
-- Versión del servidor: 5.5.33
-- Versión de PHP: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `santanders`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `categorias_id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `categorias_nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`categorias_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`categorias_id`, `categorias_nombre`) VALUES
(1, 'Deportes'),
(2, 'Moda'),
(3, 'Música'),
(4, 'Culturales'),
(5, 'Gastronómico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `eventos_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `eventos_nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `eventos_fecha_hora` datetime NOT NULL,
  `eventos_lugar` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `eventos_desc` text COLLATE utf8_unicode_ci NOT NULL,
  `eventos_lat` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `eventos_lon` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `eventos_uid` bigint(20) unsigned NOT NULL,
  `eventos_tags` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `eventos_fecha_hora_creado` datetime NOT NULL,
  `eventos_categoria_id` tinyint(2) unsigned NOT NULL,
  `eventos_sync_value` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`eventos_id`),
  KEY `eventos_categoria_id` (`eventos_categoria_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=13 ;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`eventos_id`, `eventos_nombre`, `eventos_fecha_hora`, `eventos_lugar`, `eventos_desc`, `eventos_lat`, `eventos_lon`, `eventos_uid`, `eventos_tags`, `eventos_fecha_hora_creado`, `eventos_categoria_id`, `eventos_sync_value`) VALUES
(1, 'Evento 1', '2013-12-13 12:00:00', 'Lugar 1', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.966647', '-54.95191', 0, '', '2013-12-13 00:59:42', 1, 1),
(2, 'e', '2013-12-13 12:00:00', '2232323232323', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.969812', '-54.950537', 0, '', '2013-12-03 00:00:00', 1, 2),
(3, '33 3 3 33 ', '2013-12-13 12:00:00', '333 333 ', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.953282', '-54.937405', 0, '', '2013-12-25 10:00:00', 3, 1),
(4, 'Evento 4', '2013-12-13 12:00:00', 'Lugar4', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.962005', '-54.945473', 0, '', '0000-00-00 00:00:00', 2, 1),
(5, 'Evento 555555', '2013-12-13 12:00:00', 'Lugar5555555', 'aaaaaaa', '-34.963693', '-54.941095', 0, '', '0000-00-00 00:00:00', 5, 4),
(6, 'Even6', '2013-12-13 12:00:00', 'Lugar6', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.95293', '-54.931912', 0, '', '0000-00-00 00:00:00', 1, 1),
(8, 'Even7', '2013-12-13 12:00:00', 'Lugar7', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.947654', '-54.939722', 0, '', '0000-00-00 00:00:00', 3, 1),
(9, 'Even8', '2013-12-13 12:00:00', 'Luga8', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.945614', '-54.932255', 0, '', '0000-00-00 00:00:00', 4, 1),
(10, 'Even9', '2013-12-13 12:00:00', 'Luga9', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.940267', '-54.930538', 0, '', '0000-00-00 00:00:00', 4, 1),
(11, '000000', '2013-12-13 12:00:00', 'Luga1000000', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.946036', '-54.934916', 0, '', '0000-00-00 00:00:00', 3, 2),
(12, '111111111111111111111111', '2013-12-13 12:00:00', 'Luga1111111', 'sadsad', '-34.959402', '-54.941095', 0, '', '0000-00-00 00:00:00', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ofertas`
--

CREATE TABLE `ofertas` (
  `ofertas_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `ofertas_nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ofertas_tel` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ofertas_dir` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ofertas_descuento` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ofertas_cutoas` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ofertas_dias` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ofertas_desc` text COLLATE utf8_unicode_ci NOT NULL,
  `ofertas_lat` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ofertas_lon` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ofertas_tags` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ofertas_tipo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ofertas_id`),
  KEY `eventos_categoria_id` (`ofertas_tipo`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=38 ;

--
-- Volcado de datos para la tabla `ofertas`
--

INSERT INTO `ofertas` (`ofertas_id`, `ofertas_nombre`, `ofertas_tel`, `ofertas_dir`, `ofertas_descuento`, `ofertas_cutoas`, `ofertas_dias`, `ofertas_desc`, `ofertas_lat`, `ofertas_lon`, `ofertas_tags`, `ofertas_tipo`) VALUES
(1, 'Estela Jinchuk', '4244 9741', 'Calle 20 entre 27 y 28', '20%', '6 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal. El beneficio no aplica para la compra de líquidos para lentes de contacto, ni para los productos de la marca Ray Ban.', '-34.961319390107235', '-54.94433396403201', 'Punta del Este', 'Óptica\r'),
(2, 'AVIS', '4244 2020', 'Calle 31 (entre Gorlero y Rambla) ', '10%', '', 'Todos los días', 'Para aplicar el descuento se debe pagar el alquiler del vehículo en las oficinas de AVIS de Uruguay. Promoción válida en los países donde se acepta voucher prepago.', '-34.95894532659741', '-54.939033919018584', 'Punta del Este', 'Alquiler de autos\r'),
(3, 'AVIS', '4255 9858', 'Punta Del Este Airport (Airport) Laguna Del Sauce', '10%', '', 'Todos los días', 'Para aplicar el descuento se debe pagar el alquiler del vehículo en las oficinas de AVIS de Uruguay. Promoción válida en los países donde se acepta voucher prepago.', '-34.86052642170021', '-55.09839618652347', 'Aeropuerto', 'Alquiler de autos\r'),
(4, 'Cymaco', '4225 0997', 'M. Chiossi casi 3 de Febrero', '15%', '12 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.91274646537331', '-54.95332034365538', 'Maldonado', 'Repuestos para autos\r'),
(5, 'Doyte', '4224 6206', 'Roman Guerra Esq. Ventura Alegre', '15%', '12 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.9064514', '-54.95659460000002', 'Maldonado', 'Repuestos para autos\r'),
(6, 'S&F', '4248 9015', 'Punta Shopping (Av. Roosevelt Esq. Los Alpes) Local 260', '15%', '6 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.93957041724333', '-54.93419760947876', 'Punta del Este', 'Repuestos para autos\r'),
(7, 'Farmashop', '4248 6927', 'Av. Roosevelt y Parada 10', '10%', '6 cuotas sin interés', 'Todos los días', 'El beneficio es acumulable a otros descuentos en cualquiera de los locales Farmashop.', '-34.93381078855851', '-54.940298824667366', 'Punta del Este', 'Farmacia\r'),
(8, 'Farmashop', '4224 8358', 'Av. Roosevelt y Zelmar Michelini', '10%', '7 cuotas sin interés', 'Todos los días', 'El beneficio es acumulable a otros descuentos en cualquiera de los locales Farmashop.', '-34.9141594439079', '-54.96124133809815', 'Maldonado', 'Farmacia\r'),
(9, 'Farmashop', '4244 1202', 'Av. Gorlero esq. 31', '10%', '8 cuotas sin interés', 'Todos los días', 'El beneficio es acumulable a otros descuentos en cualquiera de los locales Farmashop.', '-34.95848285439487', '-54.939435785813885', 'Punta del Este', 'Farmacia\r'),
(10, 'Farmashop', '4244 4826', 'Av. Gorlero 780, Ed. Libertador, Loc. 002', '10%', '9 cuotas sin interés', 'Todos los días', 'El beneficio es acumulable a otros descuentos en cualquiera de los locales Farmashop.', '-34.96179335383436', '-54.94308895449217', 'Punta del Este', 'Farmacia\r'),
(11, 'Freccero', '4244 1219', 'Av. Gorlero 545', '10%', '6 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal. El descuento no aplica para los casos de servicios, arreglos y composturas.', '-34.96554333307415', '-54.94720882753904', 'Punta del Este', 'Joyería\r'),
(12, 'BookShop', '4224 4502', 'Sarandí y Ventura Alegre', '15%', '3 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal. El beneficio aplica únicamente para la compra de libros. Promoción no válida para textos de estudio.', '-34.906556982937545', '-54.95768894127809', 'Maldonado', 'Librería\r'),
(13, 'Don Pepperone', '4244 8870', 'Av.  Gorlero y Calle 27', '20%', '', 'Todos los días', 'El descuento se realizará directamente en el Estado de Cuenta del Cliente e incluye 9 puntos de IVA por disposición legal.', '-34.961595518979735', '-54.942917293115215', 'Punta del Este', 'Restaurantes\r'),
(14, 'Don Pepperone', '4249 6924', 'Punta Shopping (Av. Roosevelt Esq. Los Alpes)', '20%', '', 'Todos los días', 'El descuento se realizará directamente en el Estado de Cuenta del Cliente e incluye 9 puntos de IVA por disposición legal.', '-34.9395704172433', '-54.93419760947876', 'Punta del Este', 'Restaurantes\r'),
(15, 'Don Pepperone', '', 'Ruta 10 y Calle 10', '20%', '', 'Todos los días', 'El descuento se realizará directamente en el Estado de Cuenta del Cliente e incluye 9 puntos de IVA por disposición legal.', '-34.899289417011964', '-54.80245471669929', 'La Barra', 'Restaurantes\r'),
(16, 'Maui Club', '4249 8413', 'Punta Shopping (Av. Roosevelt Esq. Los Alpes) Local 393', '15%', '12 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.93957041724333', '-54.93419760947876', 'Punta del Este', 'Restaurantes\r'),
(17, 'Petit baby', '4224 5492', 'Román Guerra 866', '15%', '6 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.90798047009191', '-54.95641219444275', 'Maldonado', 'Vestimenta infantil y juguetería\r'),
(18, 'Carmen Steffens', '4244 8350', 'Calle 20 y Calle 31. Edificio Torre Gattás Local 003', '15%', '6 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.95771219360022', '-54.940453052362045', 'Punta del Este', 'Vestimenta y calzado\r'),
(19, 'Daniel Cassin', '4249 4248', 'Punta Shopping (Av. Roosevelt Esq. Los Alpes) Local 314', '15%', '6 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.93957041724333', '-54.93419760947876', 'Punta del Este', 'Vestimenta y calzado\r'),
(20, 'Espacio b.a.', '', 'Sarandí y Ventura Alegre', '15%', '6 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.906504191485745', '-54.95771039895021', 'Maldonado', 'Vestimenta y calzado\r'),
(21, 'Espacio b.a.', '4248 8086', 'Punta Shopping ( (Av. Roosevelt Esq. Los Alpes) Local 206', '15%', '7 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.93957041724333', '-54.93419760947876', 'Punta del Este', 'Vestimenta y calzado\r'),
(22, 'Legacy', '4225 8598', 'Ituzaingó y Sarandí ', '15%', '6 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.907366447614976', ' -54.957624568261735', 'Maldonado', 'Vestimenta y calzado\r'),
(23, 'Levi''s', '4277 3251', 'Victor Haedo entre Ensueños y Duende Azul - Local 001', '15%', '3 cuotas sin interés con Visa. 6 cuotas sin interés con Master.', 'Todos los días', 'El beneficio aplica en todos los locales de Levi''s en Uruguay, incluyendo los dos Outlet de la marca. Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.91455047126162', '-54.862267921951286', 'Punta del Este', 'Vestimenta y calzado\r'),
(24, 'Levi''s', '4249 2355', 'Punta Shopping (Av. Roosevelt Esq. Los Alpes) Local 301', '', '', '', '', '-34.93957041724333', '-54.93419760947876', 'Punta del Este', 'Vestimenta y calzado\r'),
(25, 'Manos del Uruguay', '4244 1953', 'Av. Gorlero entre 30 y 31', '15%', '6 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.95890491753841', '-54.9398703036743', 'Punta del Este', 'Vestimenta y calzado\r'),
(26, 'MVD Leather', '4248 1423', 'Punta Shopping (Av. Roosevelt Esq. Los Alpes) Nivel 3', '15%', '6 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.93957041724333', ' -54.93419760947876', 'Punta del Este', 'Vestimenta y calzado\r'),
(27, 'Sagali', '4249 1958', 'Punta Shopping  Local 361', '15%', '6 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.93957041724333', ' -54.93419760947876', 'Punta del Este', 'Vestimenta y calzado\r'),
(28, 'Sara Pérez', '', 'Av. Gorlero y 31', '15%', '6 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.95850044040259', ' -54.939462607904034', 'Punta del Este', 'Vestimenta y calzado\r'),
(29, 'Sisi', '2902 48 79 (int.226)', 'Punta Shopping (Av. Roosevelt Esq. Los Alpes) Local 208', '15%', '6 cuotas sin interés', 'Todos los días', 'Para hacer uso de las 6 cuotas sin recargo, la compra debe ser mayor a $ 1.200. Descuento no acumulable a otras promociones o liquidaciones.', '-34.93957041724333', ' -54.93419760947876', 'Punta del Este', 'Vestimenta y calzado\r'),
(30, 'Sisi', '2902 48 79 (int.243)', 'Punta Shopping (Av. Roosevelt Esq. Los Alpes) Local 217', '', '', '', '', '-34.93957041724333', '-54.93419760947876', 'Punta del Este', 'Vestimenta y calzado\r'),
(31, '', '2 902 48 79 (int.217)', 'Sarandí 922 entre Ituzaingó y Ventura Alegre', '', '', '', '', '-34.906954012073605', '-54.95761431163942', 'Maldonado', 'Vestimenta y calzado\r'),
(32, 'Sport&Casual Company', '4248 0378', 'Av. Roosevelt casi Av. Brasil', '15%', '6 cuotas sin interés', 'Todos los días', 'El descuento aplica a productos Reebok y a otras marcas solamente a colecciones anteriores.', '-34.93432793885717', '-54.939792480920346', 'Punta del Este', 'Vestimenta y calzado\r'),
(33, 'Uniform', '4247 7705', 'Punta Shopping (Av. Roosevelt Esq. Los Alpes) Local 370', '15%', '6 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.93957041724333', '-54.93419760947876 ', 'Punta del Este', 'Vestimenta y calzado\r'),
(34, 'Victoria M. Ortiz', '4244 6909', 'Calle 20 entre 27 y 28', '15%', '6 cuotas sin interés', 'Todos los días', 'Descuento no acumulable a otras promociones del comercio. El cliente podrá hacer uso de los planes de cuota de acuerdo al mínimo de compra establecido por cada sucursal.', '-34.96047307625922', '-54.94336518332818', 'Punta del Este', 'Vestimenta y calzado\r'),
(35, '', '4249 2301', 'Punta Shopping (Av. Roosevelt Esq. Los Alpes) Local 359', '', '', '', '', '-34.93957041724333', '-54.93419760947876', 'Punta del Este', 'Vestimenta y calzado\r'),
(36, 'Buquebus', '', 'Terminal Punta del Este (Gorlero y 32) Local 09', '10% en paquetes a Ar y Uy. 15% con tarjeta Santander Buquebús', '12 cuotas sin interés', 'Todos los días', 'Descuento válido exclusivamente en paquetes turísticos que incluyan estadía de 2 noches de hotel como mínimo, pasaje y los traslados del puerto al hotel y del hotel al puerto. El descuento no aplica para tramos aéreos y no es acumulable a otras promociones y se realizará únicamente en los locales Buquebus de Uruguay. No válido para compras realizadas telefónicamente o en Agencias de Viaje. Descuento válido únicamente para el titular de la tarjeta y/o familiares directos (padres, hijos, esposo/a). El descuento aplica para compras de hasta 4 paquetes por transacción.', '-34.957782437964504', '-54.938794699166806', 'Punta del Este', 'Turismo\r'),
(37, 'Buquebus', '', 'Punta Shopping (Av. Roosevelt Esq. Los Alpes) Local 104', '10% en paquetes a Ar y Uy. 15% con tarjeta Santander Buquebús', '13 cuotas sin interés', 'Todos los días', 'Descuento válido exclusivamente en paquetes turísticos que incluyan estadía de 2 noches de hotel como mínimo, pasaje y los traslados del puerto al hotel y del hotel al puerto. El descuento no aplica para tramos aéreos y no es acumulable a otras promociones y se realizará únicamente en los locales Buquebus de Uruguay. No válido para compras realizadas telefónicamente o en Agencias de Viaje. Descuento válido únicamente para el titular de la tarjeta y/o familiares directos (padres, hijos, esposo/a). El descuento aplica para compras de hasta 4 paquetes por transacción.', '-34.93957041724333', '-54.93419760947876', 'Punta del Este', 'Turismo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `push`
--

CREATE TABLE `push` (
  `push_id` mediumint(9) unsigned NOT NULL AUTO_INCREMENT,
  `push_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `push_platform` enum('ios','android') COLLATE utf8_unicode_ci NOT NULL,
  `push_fecha_hora_creado` datetime NOT NULL,
  PRIMARY KEY (`push_id`),
  UNIQUE KEY `push_token` (`push_token`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=9 ;

--
-- Volcado de datos para la tabla `push`
--

INSERT INTO `push` (`push_id`, `push_token`, `push_platform`, `push_fecha_hora_creado`) VALUES
(8, 'APA91bE5RcCsiKgVF0aM2_yGkE9owZhsIsc9Kny2uH1ULrIPfz4M368bwRDBdU_WWQoPvjs5As1caqwS95PNGQ-QgzsRXIatcAH3_H-Q4VjoEDuGHNig2EWEmEyBypAW4DHEwAvFW0B-ZbnKWIdWQqO108twyWaDAw', 'android', '2013-12-15 15:05:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sync`
--

CREATE TABLE `sync` (
  `sync_value` smallint(5) unsigned NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sync`
--

INSERT INTO `sync` (`sync_value`) VALUES
(4);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`eventos_categoria_id`) REFERENCES `categorias` (`categorias_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

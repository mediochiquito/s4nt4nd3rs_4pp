-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 17-12-2013 a las 12:03:54
-- Versión del servidor: 5.5.24-log
-- Versión de PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
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

CREATE TABLE IF NOT EXISTS `categorias` (
  `categorias_id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `categorias_nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`categorias_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE IF NOT EXISTS `eventos` (
  `eventos_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `eventos_nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `eventos_fecha_hora` datetime NOT NULL,
  `eventos_lugar` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `eventos_desc` text COLLATE utf8_unicode_ci NOT NULL,
  `eventos_lat` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `eventos_lon` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `eventos_uid` bigint(20) unsigned NOT NULL,
  `eventos_fecha_hora_creado` datetime NOT NULL,
  `eventos_categoria` tinyint(2) unsigned NOT NULL,
  `eventos_sync_value` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`eventos_id`),
  KEY `eventos_categoria_eventos_id` (`eventos_categoria`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=13 ;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`eventos_id`, `eventos_nombre`, `eventos_fecha_hora`, `eventos_lugar`, `eventos_desc`, `eventos_lat`, `eventos_lon`, `eventos_uid`, `eventos_fecha_hora_creado`, `eventos_categoria`, `eventos_sync_value`) VALUES
(1, 'Evento 1', '2013-12-13 12:00:00', 'Lugar 1', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.966647', '-54.95191', 0, '2013-12-13 00:59:42', 1, 1),
(2, 'e', '2013-12-13 12:00:00', '2232323232323', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.969812', '-54.950537', 0, '2013-12-03 00:00:00', 1, 2),
(3, '33 3 3 33 ', '2013-12-13 12:00:00', '333 333 ', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.953282', '-54.937405', 0, '2013-12-25 10:00:00', 3, 1),
(4, 'Evento 4', '2013-12-13 12:00:00', 'Lugar4', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.962005', '-54.945473', 0, '0000-00-00 00:00:00', 2, 1),
(5, 'Evento 555555', '2013-12-13 12:00:00', 'Lugar5555555', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.963693', '-54.941095', 0, '0000-00-00 00:00:00', 5, 1),
(6, 'Even6', '2013-12-13 12:00:00', 'Lugar6', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.95293', '-54.931912', 0, '0000-00-00 00:00:00', 1, 1),
(8, 'Even7', '2013-12-13 12:00:00', 'Lugar7', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.947654', '-54.939722', 0, '0000-00-00 00:00:00', 3, 1),
(9, 'Even8', '2013-12-13 12:00:00', 'Luga8', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.945614', '-54.932255', 0, '0000-00-00 00:00:00', 4, 1),
(10, 'Even9', '2013-12-13 12:00:00', 'Luga9', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.940267', '-54.930538', 0, '0000-00-00 00:00:00', 4, 1),
(11, '000000', '2013-12-13 12:00:00', 'Luga1000000', 'Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs Descs ', '-34.946036', '-54.934916', 0, '0000-00-00 00:00:00', 3, 2),
(12, '111111111111111111111111', '2013-12-13 12:00:00', 'Luga1111111', 'sadsad', '-34.959402', '-54.941095', 0, '0000-00-00 00:00:00', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `push`
--

CREATE TABLE IF NOT EXISTS `push` (
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

CREATE TABLE IF NOT EXISTS `sync` (
  `sync_value` smallint(5) unsigned NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sync`
--

INSERT INTO `sync` (`sync_value`) VALUES
(1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

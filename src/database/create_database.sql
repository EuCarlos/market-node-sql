CREATE TABLE IF NOT EXISTS city (
  id int(11) NOT NULL,
  name varchar(50) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS customer (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(250) DEFAULT NULL,
  email varchar(75) DEFAULT NULL,
  phone_number varchar(63) NOT NULL,
  cityId int(11) NOT NULL,
  zip_code varchar(9) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=357 ;

CREATE TABLE IF NOT EXISTS product (
  id varchar(15) NOT NULL,
  produto varchar(255) NOT NULL,
  NCM int(8) DEFAULT NULL,
  unidade_comercial_produto varchar(255) NOT NULL,
  preco_comercial_produto float NOT NULL,
  unidade_tributavel_produto varchar(255) NOT NULL,
  preco_tributavel_produto float NOT NULL,
  CFOP int(4) NOT NULL DEFAULT '5405',
  CST int(3) NOT NULL DEFAULT '60',
  origem int(1) NOT NULL DEFAULT '0',
  situacao_tributaria int(3) NOT NULL DEFAULT '60',
  regime int(2) NOT NULL DEFAULT '3' COMMENT 'Verificar',
  PIS int(2) NOT NULL DEFAULT '7',
  cofins int(2) NOT NULL DEFAULT '7',
  cEan bigint(13) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

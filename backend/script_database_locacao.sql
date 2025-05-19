create database if not exists locacao;

use locacao;

-- Tabela de tipos de veículos
CREATE TABLE tb_tipo_veiculo (
    id_tipo_veiculo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ds_tipo VARCHAR(100) NOT NULL
);

-- Tabela de veículos
CREATE TABLE tb_veiculo (
    id_veiculo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_tipo_veiculo INT NOT NULL,
    ds_modelo VARCHAR(50) NOT NULL,
    ds_marca VARCHAR(50) NOT NULL,
    ds_placa VARCHAR(50) NOT NULL,
    nr_ano INT NOT NULL,
    FOREIGN KEY (id_tipo_veiculo) REFERENCES tb_tipo_veiculo(id_tipo_veiculo)
);

-- Tabela de clientes
CREATE TABLE tb_cliente (
    id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nm_cliente VARCHAR(200) NOT NULL,
    ds_cpf VARCHAR(50) NOT NULL,
    ds_telefone VARCHAR(50) NOT NULL,
    ds_email VARCHAR(100) NOT NULL,
    ds_cnh VARCHAR(500) NOT NULL
);

-- Tabela de locações
CREATE TABLE tb_locacao (
    id_locacao INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_veiculo INT NOT NULL,
    nr_km_retirada VARCHAR(50) NOT NULL,
    dt_locacao DATETIME NOT NULL,
    bt_seguro BOOLEAN NOT NULL,
    ds_observacoes VARCHAR(800) NOT NULL,
    ds_situacao VARCHAR(150) NOT NULL,
    nr_km_entrega VARCHAR(50) NOT NULL,
    dt_entrega DATETIME NOT NULL,
    vl_total DECIMAL(15,2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES tb_cliente(id_cliente),
    FOREIGN KEY (id_veiculo) REFERENCES tb_veiculo(id_veiculo)
);

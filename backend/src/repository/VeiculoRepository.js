import connection from "./connection.js";

//create
export async function inserir(veiculo) {
    const comando = `INSERT INTO tb_veiculo 
        (id_tipo_veiculo, ds_modelo, ds_marca, ds_placa, nr_ano)
        values (?, ?, ?, ?, ?)`;

    let [info] = await connection.query(comando,
        [veiculo.id_tipo_veiculo, veiculo.ds_modelo, veiculo.ds_marca, veiculo.ds_placa, veiculo.nr_ano]);

    return info.insertId;
}

//read
export async function listar() {
    const comando = `SELECT * FROM tb_veiculo`;

    let resp = await connection.query(comando);

    return resp[0];
}

export async function buscarPorId(id) {
    const comando = `SELECT * FROM tb_veiculo
                    WHERE id_veiculo = ?`;

    let resp = await connection.query(comando, [id]);

    return resp[0];
}

//update
export async function atualizar(id, veiculo) {
    const comando = `UPDATE tb_veiculo SET
                    id_tipo_veiculo = ?, ds_modelo = ?, ds_marca = ?,
                    ds_placa = ?, nr_ano = ?
                    WHERE id_veiculo = ?`;

    let [info] = await connection.query(comando,
        [veiculo.id_tipo_veiculo, veiculo.ds_modelo, veiculo.ds_marca, 
         veiculo.ds_placa, veiculo.nr_ano, id])

    return info.affectedRows;
}

//delete
export async function deletar(id) {
    const comando = `DELETE FROM tb_veiculo
                    WHERE id_veiculo = ?`;

    let [info] = await connection.query(comando, [id]);

    return info.affectedRows;
} 
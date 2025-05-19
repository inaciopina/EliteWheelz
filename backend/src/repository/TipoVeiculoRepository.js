import connection from "./connection.js";

//create
export async function inserir(tipoVeiculo) {
    const comando = `INSERT INTO tb_tipo_veiculo 
        (ds_tipo)
        values (?)`;

    let [info] = await connection.query(comando,
        [tipoVeiculo.ds_tipo]);

    return info.insertId;
}

//read
export async function listar() {
    const comando = `SELECT * FROM tb_tipo_veiculo`;

    let resp = await connection.query(comando);

    return resp[0];
}

export async function buscarPorId(id) {
    const comando = `SELECT * FROM tb_tipo_veiculo
                    WHERE id_tipo_veiculo = ?`;

    let resp = await connection.query(comando, [id]);

    return resp[0];
}

//update
export async function atualizar(id, tipoVeiculo) {
    const comando = `UPDATE tb_tipo_veiculo SET
                    ds_tipo = ?
                    WHERE id_tipo_veiculo = ?`;

    let [info] = await connection.query(comando,
        [tipoVeiculo.ds_tipo, id])

    return info.affectedRows;
}

//delete
export async function deletar(id) {
    const comando = `DELETE FROM tb_tipo_veiculo
                    WHERE id_tipo_veiculo = ?`;

    let [info] = await connection.query(comando, [id]);

    return info.affectedRows;
} 
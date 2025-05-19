import connection from "./connection.js";

//create
export async function inserir(locacao) {
    const comando = `INSERT INTO tb_locacao 
        (id_cliente, id_veiculo, nr_km_retirada, dt_locacao, bt_seguro,
         ds_observacoes, ds_situacao, nr_km_entrega, dt_entrega, vl_total)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    let [info] = await connection.query(comando,
        [locacao.id_cliente, locacao.id_veiculo, locacao.nr_km_retirada,
         locacao.dt_locacao, locacao.bt_seguro, locacao.ds_observacoes,
         locacao.ds_situacao, locacao.nr_km_entrega, locacao.dt_entrega,
         locacao.vl_total]);

    return info.insertId;
}

//read
export async function listar() {
    const comando = `SELECT * FROM tb_locacao`;

    let resp = await connection.query(comando);

    return resp[0];
}

export async function buscarPorId(id) {
    const comando = `SELECT * FROM tb_locacao
                    WHERE id_locacao = ?`;

    let resp = await connection.query(comando, [id]);

    return resp[0];
}

//update
export async function atualizar(id, locacao) {
    const comando = `UPDATE tb_locacao SET
                    id_cliente = ?, id_veiculo = ?, nr_km_retirada = ?,
                    dt_locacao = ?, bt_seguro = ?, ds_observacoes = ?,
                    ds_situacao = ?, nr_km_entrega = ?, dt_entrega = ?,
                    vl_total = ?
                    WHERE id_locacao = ?`;

    let [info] = await connection.query(comando,
        [locacao.id_cliente, locacao.id_veiculo, locacao.nr_km_retirada,
         locacao.dt_locacao, locacao.bt_seguro, locacao.ds_observacoes,
         locacao.ds_situacao, locacao.nr_km_entrega, locacao.dt_entrega,
         locacao.vl_total, id])

    return info.affectedRows;
}

//delete
export async function deletar(id) {
    const comando = `DELETE FROM tb_locacao
                    WHERE id_locacao = ?`;

    let [info] = await connection.query(comando, [id]);

    return info.affectedRows;
} 
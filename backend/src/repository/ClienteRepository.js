import connection from "./connection.js";

//create
export async function inserir(cliente) {
    const comando = `INSERT INTO tb_cliente 
        (nm_cliente, ds_cpf, ds_telefone, ds_email, ds_cnh)
        values (?, ?, ?, ?, ?)`;

    let [info] = await connection.query(comando,
        [cliente.nm_cliente, cliente.ds_cpf, cliente.ds_telefone, 
         cliente.ds_email, cliente.ds_cnh]);

    return info.insertId;
}

//read
export async function listar() {
    const comando = `SELECT * FROM tb_cliente`;

    let resp = await connection.query(comando);

    return resp[0];
}

export async function buscarPorId(id) {
    const comando = `SELECT * FROM tb_cliente
                    WHERE id_cliente = ?`;

    let resp = await connection.query(comando, [id]);

    return resp[0];
}

//update
export async function atualizar(id, cliente) {
    const comando = `UPDATE tb_cliente SET
                    nm_cliente = ?, ds_cpf = ?, ds_telefone = ?,
                    ds_email = ?, ds_cnh = ?
                    WHERE id_cliente = ?`;

    let [info] = await connection.query(comando,
        [cliente.nm_cliente, cliente.ds_cpf, cliente.ds_telefone,
         cliente.ds_email, cliente.ds_cnh, id])

    return info.affectedRows;
}

//delete
export async function deletar(id) {
    const comando = `DELETE FROM tb_cliente
                    WHERE id_cliente = ?`;

    let [info] = await connection.query(comando, [id]);

    return info.affectedRows;
} 
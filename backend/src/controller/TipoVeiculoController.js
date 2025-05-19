import * as a from "../repository/TipoVeiculoRepository.js"
import { Router } from "express"

const endpoints = Router();

//gets
endpoints.get('/tipo-veiculo', async (req, resp) => {
    let tipos = await a.listar();
    resp.send(tipos);
});

endpoints.get('/tipo-veiculo/:id', async (req, resp) => {
    let id = req.params.id;
    let tipo = await a.buscarPorId(id);
    resp.send(tipo);
});

//post
endpoints.post('/tipo-veiculo', async (req, resp) => {
    let tipo = req.body;
    let id = await a.inserir(tipo);
    resp.send({id});
});

//put
endpoints.put('/tipo-veiculo/:id', async (req, resp) => {
    let id = req.params.id;
    let tipo = req.body;
    let affectedRows = await a.atualizar(id, tipo);
    resp.send({affectedRows});
});

//delete
endpoints.delete('/tipo-veiculo/:id', async (req, resp) => {
    let id = req.params.id;
    let affectedRows = await a.deletar(id);
    resp.send({affectedRows});
});

export default endpoints; 
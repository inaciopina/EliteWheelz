import * as a from "../repository/VeiculoRepository.js"
import { Router } from "express"

const endpoints = Router();

//gets
endpoints.get('/veiculo', async (req, resp) => {
    let veiculos = await a.listar();
    resp.send(veiculos);
});

endpoints.get('/veiculo/:id', async (req, resp) => {
    let id = req.params.id;
    let veiculo = await a.buscarPorId(id);
    resp.send(veiculo);
});

//post
endpoints.post('/veiculo', async (req, resp) => {
    let veiculo = req.body;
    let id = await a.inserir(veiculo);
    resp.send({id});
});

//put
endpoints.put('/veiculo/:id', async (req, resp) => {
    let id = req.params.id;
    let veiculo = req.body;
    let affectedRows = await a.atualizar(id, veiculo);
    resp.send({affectedRows});
});

//delete
endpoints.delete('/veiculo/:id', async (req, resp) => {
    let id = req.params.id;
    let affectedRows = await a.deletar(id);
    resp.send({affectedRows});
});

export default endpoints; 
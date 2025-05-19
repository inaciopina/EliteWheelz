import * as a from "../repository/ClienteRepository.js"
import { Router } from "express"

const endpoints = Router();

//gets
endpoints.get('/cliente', async (req, resp) => {
    let clientes = await a.listar();
    resp.send(clientes);
});

endpoints.get('/cliente/:id', async (req, resp) => {
    let id = req.params.id;
    let cliente = await a.buscarPorId(id);
    resp.send(cliente);
});

//post
endpoints.post('/cliente', async (req, resp) => {
    let cliente = req.body;
    let id = await a.inserir(cliente);
    resp.send({id});
});

//put
endpoints.put('/cliente/:id', async (req, resp) => {
    let id = req.params.id;
    let cliente = req.body;
    let affectedRows = await a.atualizar(id, cliente);
    resp.send({affectedRows});
});

//delete
endpoints.delete('/cliente/:id', async (req, resp) => {
    let id = req.params.id;
    let affectedRows = await a.deletar(id);
    resp.send({affectedRows});
});

export default endpoints; 
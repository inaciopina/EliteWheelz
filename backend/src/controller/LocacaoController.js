import * as a from "../repository/LocacaoRepository.js"
import { Router } from "express"

const endpoints = Router();

//gets
endpoints.get('/locacao', async (req, resp) => {
    let locacoes = await a.listar();
    resp.send(locacoes);
});

endpoints.get('/locacao/:id', async (req, resp) => {
    let id = req.params.id;
    let locacao = await a.buscarPorId(id);
    resp.send(locacao);
});

//post
endpoints.post('/locacao', async (req, resp) => {
    let locacao = req.body;
    let id = await a.inserir(locacao);
    resp.send({id});
});

//put
endpoints.put('/locacao/:id', async (req, resp) => {
    let id = req.params.id;
    let locacao = req.body;
    let affectedRows = await a.atualizar(id, locacao);
    resp.send({affectedRows});
});

//delete
endpoints.delete('/locacao/:id', async (req, resp) => {
    let id = req.params.id;
    let affectedRows = await a.deletar(id);
    resp.send({affectedRows});
});

export default endpoints; 
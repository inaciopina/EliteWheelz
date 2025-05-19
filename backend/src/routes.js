import cliente from './controller/ClienteController.js'
import locacao from './controller/LocacaoController.js'
import tipoVeiculo from './controller/TipoVeiculoController.js'
import veiculo from './controller/VeiculoController.js'

export default function adicionarRotas(servidor){
    servidor.use(cliente);
    servidor.use(tipoVeiculo);
    servidor.use(locacao);
    servidor.use(veiculo);
}
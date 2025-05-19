import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  MenuItem,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';
import {
  getLocacoes,
  createLocacao,
  deleteLocacao
} from '../api';

interface Locacao {
  id_locacao: number;
  id_cliente: number;
  id_veiculo: number;
  nr_km_retirada: string;
  dt_locacao: string;
  bt_seguro: boolean;
  ds_observacoes: string;
  ds_situacao: string;
  nr_km_entrega: string;
  dt_entrega: string;
  vl_total: number;
}

// Exemplo de clientes e veículos para select (substitua por dados reais da API)
const clientes = [
  { id_cliente: 1, nm_cliente: 'Bruno', ds_cpf: '123.345.589-10' },
  { id_cliente: 2, nm_cliente: 'Helen', ds_cpf: '432.543.642-34' },
];
const veiculos = [
  { id_veiculo: 1, ds_modelo: 'HB20', nr_ano: 2016, ds_placa: 'ABC-123' },
  { id_veiculo: 2, ds_modelo: 'FIT', nr_ano: 2017, ds_placa: 'ABC-432' },
];

const Locacao: React.FC = () => {
  const [locacoes, setLocacoes] = useState<Locacao[]>([]);
  const [busca, setBusca] = useState('');
  const [formData, setFormData] = useState({
    id_cliente: 1,
    id_veiculo: 1,
    nr_km_retirada: '',
    dt_locacao: '',
    bt_seguro: false,
    ds_observacoes: '',
    ds_situacao: 'Em andamento',
    nr_km_entrega: '',
    dt_entrega: '',
    vl_total: 0,
  });

  useEffect(() => {
    async function fetchLocacoes() {
      const data = await getLocacoes();
      setLocacoes(data);
    }
    fetchLocacoes();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'id_cliente' || name === 'id_veiculo' ? Number(value) : value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createLocacao(formData);
    const data = await getLocacoes();
    setLocacoes(data);
    setFormData({
      id_cliente: 1,
      id_veiculo: 1,
      nr_km_retirada: '',
      dt_locacao: '',
      bt_seguro: false,
      ds_observacoes: '',
      ds_situacao: 'Em andamento',
      nr_km_entrega: '',
      dt_entrega: '',
      vl_total: 0,
    });
  };

  const handleDelete = async (id: number) => {
    await deleteLocacao(id);
    const data = await getLocacoes();
    setLocacoes(data);
  };

  const locacoesFiltradas = locacoes.filter(
    (locacao) =>
      clientes.find(c => c.id_cliente === locacao.id_cliente)?.nm_cliente.toLowerCase().includes(busca.toLowerCase()) ||
      clientes.find(c => c.id_cliente === locacao.id_cliente)?.ds_cpf.includes(busca)
  );

  return (
    <Layout>
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ color: '#FF6C00', fontWeight: 700, mb: 0.5 }}
        >
          ÁREA ADMINISTRATIVA
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mb: 3 }}
        >
          Controle de Locação
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Nova Locação
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
              <TextField
                name="id_cliente"
                label="Cliente"
                select
                value={formData.id_cliente}
                onChange={handleInputChange}
                required
                fullWidth
              >
                {clientes.map((c) => (
                  <MenuItem key={c.id_cliente} value={c.id_cliente}>{c.nm_cliente}, {c.ds_cpf}</MenuItem>
                ))}
              </TextField>
              <TextField
                name="id_veiculo"
                label="Veículo"
                select
                value={formData.id_veiculo}
                onChange={handleInputChange}
                required
                fullWidth
              >
                {veiculos.map((v) => (
                  <MenuItem key={v.id_veiculo} value={v.id_veiculo}>{v.ds_modelo}, {v.nr_ano}, {v.ds_placa}</MenuItem>
                ))}
              </TextField>
              <TextField
                name="dt_locacao"
                label="Data da Locação"
                type="date"
                value={formData.dt_locacao}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                name="nr_km_retirada"
                label="KM Retirada"
                placeholder="78540"
                value={formData.nr_km_retirada}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="ds_observacoes"
                label="Observações"
                placeholder="Digite observações..."
                value={formData.ds_observacoes}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="bt_seguro"
                    checked={formData.bt_seguro}
                    onChange={handleInputChange}
                  />
                }
                label="Seguro"
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: '#9C27B0', color: '#fff', fontWeight: 700, mt: 2 }}
                fullWidth
              >
                SALVAR LOCAÇÃO
              </Button>
            </Box>
          </form>
        </Paper>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Locações em Andamento
          </Typography>
          <Box sx={{ mb: 2, maxWidth: 300 }}>
            <TextField
              fullWidth
              placeholder="Nome ou CPF"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Cliente</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>CPF</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Veículo</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Data da Locação</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locacoesFiltradas.map((locacao) => (
                  <TableRow key={locacao.id_locacao}>
                    <TableCell>{clientes.find(c => c.id_cliente === locacao.id_cliente)?.nm_cliente}</TableCell>
                    <TableCell>{clientes.find(c => c.id_cliente === locacao.id_cliente)?.ds_cpf}</TableCell>
                    <TableCell>{veiculos.find(v => v.id_veiculo === locacao.id_veiculo)?.ds_modelo} ({veiculos.find(v => v.id_veiculo === locacao.id_veiculo)?.ds_placa})</TableCell>
                    <TableCell>{locacao.dt_locacao}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ mr: 1, bgcolor: '#9C27B0', fontWeight: 700 }}
                      >
                        Concluir
                      </Button>
                      <IconButton color="primary" size="small" sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" size="small" onClick={() => handleDelete(locacao.id_locacao)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Locacao; 
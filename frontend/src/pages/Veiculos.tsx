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
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';
import {
  getVeiculos,
  createVeiculo,
  deleteVeiculo
} from '../api';

interface Veiculo {
  id_veiculo: number;
  id_tipo_veiculo: number;
  ds_modelo: string;
  ds_marca: string;
  ds_placa: string;
  nr_ano: number;
}

const tiposVeiculo = [
  { id: 1, ds_tipo: 'Carro' },
  { id: 2, ds_tipo: 'Moto' },
];

const Veiculos: React.FC = () => {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [busca, setBusca] = useState('');
  const [formData, setFormData] = useState({
    id_tipo_veiculo: 1,
    ds_modelo: '',
    ds_marca: '',
    ds_placa: '',
    nr_ano: '',
  });

  useEffect(() => {
    async function fetchVeiculos() {
      const data = await getVeiculos();
      setVeiculos(data);
    }
    fetchVeiculos();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'id_tipo_veiculo' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createVeiculo({
      ...formData,
      nr_ano: Number(formData.nr_ano),
    });
    const data = await getVeiculos();
    setVeiculos(data);
    setFormData({
      id_tipo_veiculo: 1,
      ds_modelo: '',
      ds_marca: '',
      ds_placa: '',
      nr_ano: '',
    });
  };

  const handleDelete = async (id: number) => {
    await deleteVeiculo(id);
    const data = await getVeiculos();
    setVeiculos(data);
  };

  const veiculosFiltrados = veiculos.filter(
    (veiculo) =>
      veiculo.ds_modelo.toLowerCase().includes(busca.toLowerCase()) ||
      veiculo.ds_marca.toLowerCase().includes(busca.toLowerCase()) ||
      veiculo.ds_placa.toLowerCase().includes(busca.toLowerCase())
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
          Controle de Veículos
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Novo Veículo
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
              <TextField
                name="id_tipo_veiculo"
                label="Tipo"
                select
                value={formData.id_tipo_veiculo}
                onChange={handleInputChange}
                required
                fullWidth
                placeholder="Carro"
              >
                {tiposVeiculo.map((tipo) => (
                  <MenuItem key={tipo.id} value={tipo.id}>{tipo.ds_tipo}</MenuItem>
                ))}
              </TextField>
              <TextField
                name="ds_modelo"
                label="Modelo"
                placeholder="HB20"
                value={formData.ds_modelo}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="ds_marca"
                label="Marca"
                placeholder="Hyunday"
                value={formData.ds_marca}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="nr_ano"
                label="Ano"
                placeholder="2016"
                value={formData.nr_ano}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="ds_placa"
                label="Placa"
                placeholder="ABC-000"
                value={formData.ds_placa}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: '#9C27B0', color: '#fff', fontWeight: 700, mt: 2 }}
                fullWidth
              >
                SALVAR
              </Button>
            </Box>
          </form>
        </Paper>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Lista de Veículos
          </Typography>
          <Box sx={{ mb: 2, maxWidth: 300 }}>
            <TextField
              fullWidth
              placeholder="Modelo, Marca, Placa"
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
                  <TableCell sx={{ fontWeight: 700 }}>Modelo</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Marca</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Ano</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Tipo</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Placa</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {veiculosFiltrados.map((veiculo) => (
                  <TableRow key={veiculo.id_veiculo}>
                    <TableCell>{veiculo.ds_modelo}</TableCell>
                    <TableCell>{veiculo.ds_marca}</TableCell>
                    <TableCell>{veiculo.nr_ano}</TableCell>
                    <TableCell>{tiposVeiculo.find(t => t.id === veiculo.id_tipo_veiculo)?.ds_tipo || veiculo.id_tipo_veiculo}</TableCell>
                    <TableCell>{veiculo.ds_placa}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" size="small" sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" size="small" onClick={() => handleDelete(veiculo.id_veiculo)}>
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

export default Veiculos; 
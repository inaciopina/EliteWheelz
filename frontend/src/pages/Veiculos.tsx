import React, { useState } from 'react';
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

interface Veiculo {
  id: number;
  tipo: string;
  modelo: string;
  marca: string;
  ano: string;
  placa: string;
}

const tiposVeiculo = [
  'Sedan',
  'Hatchback',
  'SUV',
  'Pickup',
  'Van',
];

const Veiculos: React.FC = () => {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [busca, setBusca] = useState('');
  const [formData, setFormData] = useState({
    tipo: '',
    modelo: '',
    marca: '',
    ano: '',
    placa: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVeiculo: Veiculo = {
      id: Date.now(),
      ...formData,
    };
    setVeiculos((prev) => [...prev, newVeiculo]);
    setFormData({
      tipo: '',
      modelo: '',
      marca: '',
      ano: '',
      placa: '',
    });
  };

  const veiculosFiltrados = veiculos.filter(
    (veiculo) =>
      veiculo.modelo.toLowerCase().includes(busca.toLowerCase()) ||
      veiculo.marca.toLowerCase().includes(busca.toLowerCase()) ||
      veiculo.placa.toLowerCase().includes(busca.toLowerCase())
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
                name="tipo"
                label="Tipo"
                select
                value={formData.tipo}
                onChange={handleInputChange}
                required
                fullWidth
                placeholder="Carro"
              >
                <MenuItem value="Carro">Carro</MenuItem>
                <MenuItem value="Moto">Moto</MenuItem>
              </TextField>
              <TextField
                name="modelo"
                label="Modelo"
                placeholder="HB20"
                value={formData.modelo}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="marca"
                label="Marca"
                placeholder="Hyunday"
                value={formData.marca}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="ano"
                label="Ano"
                placeholder="2016"
                value={formData.ano}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="placa"
                label="Placa"
                placeholder="ABC-000"
                value={formData.placa}
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
                  <TableRow key={veiculo.id}>
                    <TableCell>{veiculo.modelo}</TableCell>
                    <TableCell>{veiculo.marca}</TableCell>
                    <TableCell>{veiculo.ano}</TableCell>
                    <TableCell>{veiculo.tipo}</TableCell>
                    <TableCell>{veiculo.placa}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" size="small" sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" size="small">
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
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
    <Box>
      <Typography variant="h4" gutterBottom>
        Controle de Veículos
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Novo Veículo
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { sm: '1fr 1fr' } }}>
            <TextField
              name="tipo"
              label="Tipo"
              select
              value={formData.tipo}
              onChange={handleInputChange}
              required
              fullWidth
            >
              {tiposVeiculo.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="modelo"
              label="Modelo"
              value={formData.modelo}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              name="marca"
              label="Marca"
              value={formData.marca}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              name="ano"
              label="Ano"
              value={formData.ano}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              name="placa"
              label="Placa"
              value={formData.placa}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ bgcolor: '#9C27B0' }}
            >
              Salvar
            </Button>
          </Box>
        </form>
      </Paper>

      <Paper>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Buscar por Modelo, Marca ou Placa"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Modelo</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Ano</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Placa</TableCell>
                <TableCell align="right">Ações</TableCell>
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
                    <IconButton color="primary" size="small">
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
  );
};

export default Veiculos; 
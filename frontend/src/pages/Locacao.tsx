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
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

interface Locacao {
  id: number;
  nome: string;
  cliente: string;
  modelo: string;
  veiculo: string;
  dataLocacao: string;
  kmRetirada: string;
  seguro: boolean;
  observacoes: string;
}

const Locacao: React.FC = () => {
  const [locacoes, setLocacoes] = useState<Locacao[]>([]);
  const [busca, setBusca] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    cliente: '',
    modelo: '',
    veiculo: '',
    dataLocacao: '',
    kmRetirada: '',
    seguro: false,
    observacoes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLocacao: Locacao = {
      id: Date.now(),
      ...formData,
    };
    setLocacoes((prev) => [...prev, newLocacao]);
    setFormData({
      nome: '',
      cliente: '',
      modelo: '',
      veiculo: '',
      dataLocacao: '',
      kmRetirada: '',
      seguro: false,
      observacoes: '',
    });
  };

  const locacoesFiltradas = locacoes.filter(
    (locacao) =>
      locacao.nome.toLowerCase().includes(busca.toLowerCase()) ||
      locacao.cliente.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Controle de Locação
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Nova Locação
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { sm: '1fr 1fr' } }}>
            <TextField
              name="nome"
              label="Nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              name="cliente"
              label="Cliente"
              select
              value={formData.cliente}
              onChange={handleInputChange}
              required
              fullWidth
            >
              <MenuItem value="cliente1">Cliente 1</MenuItem>
              <MenuItem value="cliente2">Cliente 2</MenuItem>
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
              name="veiculo"
              label="Veículo"
              select
              value={formData.veiculo}
              onChange={handleInputChange}
              required
              fullWidth
            >
              <MenuItem value="veiculo1">Veículo 1</MenuItem>
              <MenuItem value="veiculo2">Veículo 2</MenuItem>
            </TextField>
            <TextField
              name="dataLocacao"
              label="Data de Locação"
              type="date"
              value={formData.dataLocacao}
              onChange={handleInputChange}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="kmRetirada"
              label="KM Retirada"
              value={formData.kmRetirada}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              name="observacoes"
              label="Observações"
              value={formData.observacoes}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
              sx={{ gridColumn: '1 / -1' }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="seguro"
                  checked={formData.seguro}
                  onChange={handleInputChange}
                />
              }
              label="Seguro"
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ bgcolor: '#9C27B0' }}
            >
              Salvar Locação
            </Button>
          </Box>
        </form>
      </Paper>

      <Paper>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Buscar por nome ou CPF"
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
                <TableCell>Cliente</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Veículo</TableCell>
                <TableCell>Data da Locação</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locacoesFiltradas.map((locacao) => (
                <TableRow key={locacao.id}>
                  <TableCell>{locacao.cliente}</TableCell>
                  <TableCell>{locacao.nome}</TableCell>
                  <TableCell>{locacao.veiculo}</TableCell>
                  <TableCell>{locacao.dataLocacao}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mr: 1, bgcolor: '#9C27B0' }}
                    >
                      Concluir
                    </Button>
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

export default Locacao; 
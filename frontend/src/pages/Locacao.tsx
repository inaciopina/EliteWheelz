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
import Layout from '../components/Layout';

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
                name="nome"
                label="Nome"
                placeholder="Bruno"
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
                placeholder="Bruno, 123.345.589-10"
              >
                <MenuItem value="Bruno, 123.345.589-10">Bruno, 123.345.589-10</MenuItem>
                <MenuItem value="Helen, 432.543.642-34">Helen, 432.543.642-34</MenuItem>
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
                name="veiculo"
                label="Veículo"
                select
                value={formData.veiculo}
                onChange={handleInputChange}
                required
                fullWidth
                placeholder="HB20, 2016, ABC-123"
              >
                <MenuItem value="HB20, 2016, ABC-123">HB20, 2016, ABC-123</MenuItem>
                <MenuItem value="FIT, 2017, ABC-432">FIT, 2017, ABC-432</MenuItem>
              </TextField>
              <TextField
                name="dataLocacao"
                label="Data da Locação"
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
                placeholder="78540"
                value={formData.kmRetirada}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="observacoes"
                label="Observações"
                placeholder="Digite observações..."
                value={formData.observacoes}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
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
                  <TableRow key={locacao.id}>
                    <TableCell>{locacao.cliente}</TableCell>
                    <TableCell>{locacao.nome}</TableCell>
                    <TableCell>{locacao.veiculo}</TableCell>
                    <TableCell>{locacao.dataLocacao}</TableCell>
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

export default Locacao; 
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
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  cnh: string;
}

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    cnh: '',
  });
  const [busca, setBusca] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCliente: Cliente = {
      id: Date.now(),
      ...formData,
    };
    setClientes((prev) => [...prev, newCliente]);
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      cnh: '',
    });
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase())
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
          Controle de Clientes
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Novo Cliente
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
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
                name="email"
                label="Email"
                placeholder="bruno@gmail.com"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="telefone"
                label="Telefone"
                placeholder="(11) 999938-5764"
                value={formData.telefone}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="cpf"
                label="CPF"
                placeholder="323.323.232-33"
                value={formData.cpf}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="cnh"
                label="CNH"
                placeholder="06856723456897"
                value={formData.cnh}
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
            Lista de Clientes
          </Typography>
          <Box sx={{ mb: 2, maxWidth: 300 }}>
            <TextField
              fullWidth
              placeholder="Nome"
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
                  <TableCell sx={{ fontWeight: 700 }}>Nome</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>CPF</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Telefone</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>E-mail</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientesFiltrados.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>{cliente.nome}</TableCell>
                    <TableCell>{cliente.cpf}</TableCell>
                    <TableCell>{cliente.telefone}</TableCell>
                    <TableCell>{cliente.email}</TableCell>
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
}

export default Clientes; 
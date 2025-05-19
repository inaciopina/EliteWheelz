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
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';
import {
  getClientes,
  createCliente,
  deleteCliente
} from '../api';

interface Cliente {
  id_cliente: number;
  nm_cliente: string;
  ds_email: string;
  ds_telefone: string;
  ds_cpf: string;
  ds_cnh: string;
}

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [formData, setFormData] = useState({
    nm_cliente: '',
    ds_email: '',
    ds_telefone: '',
    ds_cpf: '',
    ds_cnh: '',
  });
  const [busca, setBusca] = useState('');

  useEffect(() => {
    async function fetchClientes() {
      const data = await getClientes();
      setClientes(data);
    }
    fetchClientes();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCliente(formData);
    const data = await getClientes();
    setClientes(data);
    setFormData({
      nm_cliente: '',
      ds_email: '',
      ds_telefone: '',
      ds_cpf: '',
      ds_cnh: '',
    });
  };

  const handleDelete = async (id: number) => {
    await deleteCliente(id);
    const data = await getClientes();
    setClientes(data);
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nm_cliente.toLowerCase().includes(busca.toLowerCase())
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
                name="nm_cliente"
                label="Nome"
                placeholder="Bruno"
                value={formData.nm_cliente}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="ds_email"
                label="Email"
                placeholder="bruno@gmail.com"
                type="email"
                value={formData.ds_email}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="ds_telefone"
                label="Telefone"
                placeholder="(11) 999938-5764"
                value={formData.ds_telefone}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="ds_cpf"
                label="CPF"
                placeholder="323.323.232-33"
                value={formData.ds_cpf}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="ds_cnh"
                label="CNH"
                placeholder="06856723456897"
                value={formData.ds_cnh}
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
                  <TableRow key={cliente.id_cliente}>
                    <TableCell>{cliente.nm_cliente}</TableCell>
                    <TableCell>{cliente.ds_cpf}</TableCell>
                    <TableCell>{cliente.ds_telefone}</TableCell>
                    <TableCell>{cliente.ds_email}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" size="small" sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" size="small" onClick={() => handleDelete(cliente.id_cliente)}>
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
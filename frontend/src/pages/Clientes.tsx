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
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Controle de Clientes
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Novo Cliente
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
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              name="telefone"
              label="Telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              name="cpf"
              label="CPF"
              value={formData.cpf}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              name="cnh"
              label="CNH"
              value={formData.cnh}
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
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.nome}</TableCell>
                  <TableCell>{cliente.cpf}</TableCell>
                  <TableCell>{cliente.telefone}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
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

export default Clientes; 
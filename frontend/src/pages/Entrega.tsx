import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Layout from '../components/Layout';

interface EntregaData {
  cliente: string;
  veiculo: string;
  dataEntrega: string;
  kmEntrega: string;
  seguro: boolean;
  observacoes: string;
  total: number;
}

const Entrega: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<EntregaData>({
    cliente: 'João Silva',
    veiculo: 'Toyota Corolla 2020',
    dataEntrega: '',
    kmEntrega: '',
    seguro: true,
    observacoes: '',
    total: 850.00,
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
    // Lógica para salvar a entrega
    console.log('Dados da entrega:', formData);
  };

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
          Entrega de Veículo
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ minWidth: 250 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Cliente:</Typography>
              <Typography variant="body1">{formData.cliente}</Typography>
            </Box>
            <Box sx={{ minWidth: 250 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Veículo:</Typography>
              <Typography variant="body1">{formData.veiculo}</Typography>
            </Box>
            <Box sx={{ minWidth: 200 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Data de Entrega:</Typography>
              <Typography variant="body1">{formData.dataEntrega || '--/--/----'}</Typography>
            </Box>
            <Box sx={{ minWidth: 200 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>KM Entrega:</Typography>
              <Typography variant="body1">{formData.kmEntrega || '----'}</Typography>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Seguro:</Typography>
              <Typography variant="body1">{formData.seguro ? 'Sim' : 'Não'}</Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Observações</Typography>
            <Typography variant="body2">{formData.observacoes || '---'}</Typography>
          </Box>
        </Paper>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Finalizar Locação
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
              <TextField
                name="dataEntrega"
                label="Data de Entrega"
                type="date"
                value={formData.dataEntrega}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                name="kmEntrega"
                label="KM Entrega"
                placeholder="78540"
                value={formData.kmEntrega}
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
              <Box
                sx={{
                  bgcolor: '#EDE7F6',
                  color: '#222',
                  p: 2,
                  borderRadius: 1,
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: 24,
                  mb: 2,
                }}
              >
                TOTAL R$ {formData.total.toFixed(2)}
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: '#9C27B0', color: '#fff', fontWeight: 700 }}
                fullWidth
              >
                SALVAR LOCAÇÃO
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Entrega; 
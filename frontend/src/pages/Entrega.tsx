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
    <Box>
      <Typography variant="h4" gutterBottom>
        Entrega de Veículo
      </Typography>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Cliente
              </Typography>
              <Typography variant="body1">{formData.cliente}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Veículo
              </Typography>
              <Typography variant="body1">{formData.veiculo}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="dataEntrega"
                label="Data da Entrega"
                type="date"
                value={formData.dataEntrega}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="kmEntrega"
                label="KM Entrega"
                value={formData.kmEntrega}
                onChange={handleInputChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="observacoes"
                label="Observações"
                value={formData.observacoes}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  p: 2,
                  borderRadius: 1,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5">
                  TOTAL R$ {formData.total.toFixed(2)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ bgcolor: '#9C27B0' }}
              >
                Salvar Locação
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Entrega; 
import React, { useState, useEffect } from 'react';
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
import { getLocacao, updateLocacao } from '../api';

interface EntregaData {
  id_cliente: number;
  id_veiculo: number;
  nr_km_entrega: string;
  dt_entrega: string;
  bt_seguro: boolean;
  ds_observacoes: string;
  vl_total: number;
  cliente_nome?: string;
  veiculo_nome?: string;
}

const Entrega: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<EntregaData>({
    id_cliente: 0,
    id_veiculo: 0,
    nr_km_entrega: '',
    dt_entrega: '',
    bt_seguro: false,
    ds_observacoes: '',
    vl_total: 0,
    cliente_nome: '',
    veiculo_nome: '',
  });

  useEffect(() => {
    async function fetchLocacao() {
      if (id) {
        const data = await getLocacao(Number(id));
        setFormData({
          id_cliente: data.id_cliente,
          id_veiculo: data.id_veiculo,
          nr_km_entrega: data.nr_km_entrega || '',
          dt_entrega: data.dt_entrega || '',
          bt_seguro: data.bt_seguro || false,
          ds_observacoes: data.ds_observacoes || '',
          vl_total: data.vl_total || 0,
          cliente_nome: data.cliente_nome || '',
          veiculo_nome: data.veiculo_nome || '',
        });
      }
    }
    fetchLocacao();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateLocacao(Number(id), formData);
      // Opcional: feedback de sucesso
    }
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
              <Typography variant="body1">{formData.cliente_nome}</Typography>
            </Box>
            <Box sx={{ minWidth: 250 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Veículo:</Typography>
              <Typography variant="body1">{formData.veiculo_nome}</Typography>
            </Box>
            <Box sx={{ minWidth: 200 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Data de Entrega:</Typography>
              <Typography variant="body1">{formData.dt_entrega || '--/--/----'}</Typography>
            </Box>
            <Box sx={{ minWidth: 200 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>KM Entrega:</Typography>
              <Typography variant="body1">{formData.nr_km_entrega || '----'}</Typography>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Seguro:</Typography>
              <Typography variant="body1">{formData.bt_seguro ? 'Sim' : 'Não'}</Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Observações</Typography>
            <Typography variant="body2">{formData.ds_observacoes || '---'}</Typography>
          </Box>
        </Paper>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Finalizar Locação
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
              <TextField
                name="dt_entrega"
                label="Data de Entrega"
                type="date"
                value={formData.dt_entrega}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                name="nr_km_entrega"
                label="KM Entrega"
                placeholder="78540"
                value={formData.nr_km_entrega}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="ds_observacoes"
                label="Observações"
                placeholder="Digite observações..."
                value={formData.ds_observacoes}
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
                TOTAL R$ {formData.vl_total.toFixed(2)}
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
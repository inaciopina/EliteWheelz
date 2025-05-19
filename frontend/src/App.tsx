import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import Clientes from './pages/Clientes';
import Veiculos from './pages/Veiculos';
import Locacao from './pages/Locacao';
import Entrega from './pages/Entrega';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9C27B0',
    },
    secondary: {
      main: '#FF6C00',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Clientes />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/veiculos" element={<Veiculos />} />
            <Route path="/locacao" element={<Locacao />} />
            <Route path="/entrega/:id" element={<Entrega />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App; 
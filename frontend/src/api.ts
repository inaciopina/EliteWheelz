const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// CLIENTES
export async function getClientes() {
  const res = await fetch(`${API_URL}/cliente`);
  return res.json();
}

export async function getCliente(id: number) {
  const res = await fetch(`${API_URL}/cliente/${id}`);
  return res.json();
}

export async function createCliente(cliente: any) {
  const res = await fetch(`${API_URL}/cliente`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
  return res.json();
}

export async function updateCliente(id: number, cliente: any) {
  const res = await fetch(`${API_URL}/cliente/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
  return res.json();
}

export async function deleteCliente(id: number) {
  const res = await fetch(`${API_URL}/cliente/${id}`, { method: 'DELETE' });
  return res.json();
}

// VEÍCULOS
export async function getVeiculos() {
  const res = await fetch(`${API_URL}/veiculo`);
  return res.json();
}

export async function getVeiculo(id: number) {
  const res = await fetch(`${API_URL}/veiculo/${id}`);
  return res.json();
}

export async function createVeiculo(veiculo: any) {
  const res = await fetch(`${API_URL}/veiculo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(veiculo),
  });
  return res.json();
}

export async function updateVeiculo(id: number, veiculo: any) {
  const res = await fetch(`${API_URL}/veiculo/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(veiculo),
  });
  return res.json();
}

export async function deleteVeiculo(id: number) {
  const res = await fetch(`${API_URL}/veiculo/${id}`, { method: 'DELETE' });
  return res.json();
}

// LOCAÇÕES
export async function getLocacoes() {
  const res = await fetch(`${API_URL}/locacao`);
  return res.json();
}

export async function getLocacao(id: number) {
  const res = await fetch(`${API_URL}/locacao/${id}`);
  return res.json();
}

export async function createLocacao(locacao: any) {
  const res = await fetch(`${API_URL}/locacao`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(locacao),
  });
  return res.json();
}

export async function updateLocacao(id: number, locacao: any) {
  const res = await fetch(`${API_URL}/locacao/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(locacao),
  });
  return res.json();
}

export async function deleteLocacao(id: number) {
  const res = await fetch(`${API_URL}/locacao/${id}`, { method: 'DELETE' });
  return res.json();
}

// TIPOS DE VEÍCULO
export async function getTiposVeiculo() {
  const res = await fetch(`${API_URL}/tipo-veiculo`);
  return res.json();
}

export async function getTipoVeiculo(id: number) {
  const res = await fetch(`${API_URL}/tipo-veiculo/${id}`);
  return res.json();
}

export async function createTipoVeiculo(tipo: any) {
  const res = await fetch(`${API_URL}/tipo-veiculo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tipo),
  });
  return res.json();
}

export async function updateTipoVeiculo(id: number, tipo: any) {
  const res = await fetch(`${API_URL}/tipo-veiculo/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tipo),
  });
  return res.json();
}

export async function deleteTipoVeiculo(id: number) {
  const res = await fetch(`${API_URL}/tipo-veiculo/${id}`, { method: 'DELETE' });
  return res.json();
} 
// src/services/vehicleService.ts
import type  { Vehicle, VehicleInput } from '../types/Vehicle';

const API_BASE_URL = 'http://localhost:3001/vehicles'; // URL base da sua API de veículos

// GET all vehicles
// src/services/vehicleService.ts (apenas o trecho)
export const getAllVehicles = async (): Promise<Vehicle[]> => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      // Erros de status HTTP (4xx, 5xx) serão tratados aqui
      const errorText = await response.text(); // Tenta ler a resposta como texto
      throw new Error(`Failed to fetch vehicles: ${response.status} ${response.statusText} - ${errorText}`);
    }
    return response.json();
  } catch (err: any) {
    // Erros de rede (como CORS) ou outros erros de fetch serão tratados aqui
    console.error("Erro no getAllVehicles:", err); // <<< Adicione este log
    throw err; // Re-lança o erro para que o componente VehicleList o capture
  }
};
// GET vehicle by ID
export const getVehicleById = async (id: number): Promise<Vehicle> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch vehicle with ID ${id}`);
  }
  return response.json();
};

// POST create vehicle
export const createVehicle = async (vehicleData: VehicleInput): Promise<Vehicle> => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicleData),
  });
  if (!response.ok) {
    throw new Error('Failed to create vehicle');
  }
  return response.json();
};

// PUT update vehicle
export const updateVehicle = async (id: number, vehicleData: Partial<VehicleInput>): Promise<Vehicle> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicleData),
  });
  if (!response.ok) {
    throw new Error(`Failed to update vehicle with ID ${id}`);
  }
  return response.json();
};

// DELETE vehicle
export const deleteVehicle = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete vehicle with ID ${id}`);
  }
  // No content for 204 response
};
// src/types/Vehicle.ts

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  plate: string;
  color: string;
  mileage: number;
  price: number;
  status: 'available' | 'rented' | 'maintenance';
  createdAt: string; // Datas geralmente vêm como string da API
  updatedAt: string;
}

// Se você tiver um formulário para criar/atualizar, pode ter uma interface para os dados de entrada
export type VehicleInput = Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>;
// src/pages/VehicleList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Vehicle } from '../types/Vehicle';
import { getAllVehicles, deleteVehicle } from '../services/vehicleService';

const VehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = async () => {
    console.log('fetchVehicles function is called. Initiating API request...');
    setLoading(true);
    setError(null);

    try {
      const data = await getAllVehicles();
      console.log('API response received:', data);
      setVehicles(data);
      console.log('Vehicles state updated:', data); // <<< NOVO LOG AQUI
    } catch (err: any) {
      console.error('Error fetching vehicles:', err);
      setError(`Falha ao carregar veículos: ${err.message || 'Erro desconhecido'}`);
    } finally {
      console.log('fetchVehicles function finished. Setting loading to false.');
      setLoading(false); // Garante que loading seja false no final
    }
  };

  useEffect(() => {
    console.log('useEffect in VehicleList is running. Calling fetchVehicles...');
    fetchVehicles();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este veículo?')) {
      try {
        await deleteVehicle(id);
        setVehicles(vehicles.filter(v => v.id !== id));
      } catch (err: any) {
        setError(err.message);
        console.error('Error deleting vehicle:', err);
      }
    }
  };

  // --- RENDERIZAÇÃO CONDICIONAL ---
  console.log('Current loading state:', loading); // <<< NOVO LOG AQUI
  console.log('Current error state:', error);     // <<< NOVO LOG AQUI
  console.log('Current vehicles state length:', vehicles.length); // <<< NOVO LOG AQUI

  if (loading) return <div className="text-center text-blue-500 text-xl py-4">Carregando veículos...</div>;
  if (error) return <div className="text-center text-red-500 text-xl py-4">Erro: {error}</div>;

  // Se não está carregando e não há erro, mas não há veículos
  if (vehicles.length === 0) return <div className="text-center text-gray-600 text-xl py-4 mt-4">Nenhum veículo cadastrado.</div>;

  // --- RENDERIZAÇÃO DA LISTA DE VEÍCULOS ---
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* ... restante do código da tabela ... */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Lista de Veículos</h2>
      <div className="mb-4">
        <Link to="/vehicles/new" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Adicionar Novo Veículo
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {/* Altere px-4 para px-2 em todas as th */}
              <th className="py-2 px-1 border-b text-left text-gray-600 font-semibold">ID</th>
              <th className="py-2 px-1 border-b text-left text-gray-600 font-semibold">Marca</th>
              <th className="py-2 px-1 border-b text-left text-gray-600 font-semibold">Modelo</th>
              <th className="py-2 px-1 border-b text-left text-gray-600 font-semibold">Ano</th>
              <th className="py-2 px-1 border-b text-left text-gray-600 font-semibold">Placa</th>
              <th className="py-2 px-1 border-b text-left text-gray-600 font-semibold">Status</th>
              <th className="py-2 px-1 border-b text-left text-gray-600 font-semibold">Preço</th>
              <th className="py-2 px-1 border-b text-left text-gray-600 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                {/* Altere px-4 para px-2 em todas as td */}
                <td className="py-2 px-1 border-b">{vehicle.id}</td>
                <td className="py-2 px-1 border-b">{vehicle.brand}</td>
                <td className="py-2 px-1 border-b">{vehicle.model}</td>
                <td className="py-2 px-1 border-b">{vehicle.year}</td>
                <td className="py-2 px-1 border-b">{vehicle.plate}</td>
                <td className="py-2 px-1 border-b">{vehicle.color}</td>
                <td className="py-2 px-1 border-b">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    vehicle.status === 'available' ? 'bg-green-100 text-green-800' :
                    vehicle.status === 'rented' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {vehicle.status}
                  </span>
                </td>
                <td className="py-2 px-2 border-b">R$ {Number(vehicle.price).toFixed(2)}</td>

                {/* Esta é a TD da coluna Ações. Já tinha space-x-2 e whitespace-nowrap */}
                {/* Vamos manter space-x-2 ou space-x-1 para testar se muda algo */}
                <td className="py-2 px-2 border-b flex space-x-1 whitespace-nowrap"> {/* <-- Reduzi para space-x-1 e px-2 */}
                  <Link to={`/vehicles/${vehicle.id}`} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-2 rounded">
                    Ver
                  </Link>
                  <Link to={`/vehicles/edit/${vehicle.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold py-1 px-2 rounded">
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(vehicle.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-2 rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleList;
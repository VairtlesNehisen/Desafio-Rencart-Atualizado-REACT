// src/pages/VehicleDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importa useParams para pegar o ID da URL
import type { Vehicle } from '../types/Vehicle'; // Importa o tipo Vehicle
import { getVehicleById } from '../services/vehicleService'; // Importa a função de serviço

const VehicleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Hook para extrair o 'id' da URL (ex: /vehicles/123)
  const [vehicle, setVehicle] = useState<Vehicle | null>(null); // Estado para armazenar os dados do veículo
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar o carregamento
  const [error, setError] = useState<string | null>(null); // Estado para armazenar mensagens de erro

  useEffect(() => {
    // Garante que só tenta buscar se um ID for fornecido na URL
    if (id) {
      const fetchVehicle = async () => {
        try {
          const data = await getVehicleById(Number(id)); // Chama o serviço para buscar o veículo pelo ID (converte ID para número)
          setVehicle(data); // Atualiza o estado com os dados do veículo
        } catch (err: any) {
          console.error("Erro ao buscar detalhes do veículo:", err);
          setError(err.message || "Não foi possível carregar os detalhes do veículo.");
        } finally {
          setLoading(false); // Finaliza o estado de carregamento
        }
      };
      fetchVehicle(); // Executa a função de busca
    } else {
      // Se não houver ID na URL, exibe uma mensagem de erro
      setError("ID do veículo não fornecido na URL.");
      setLoading(false);
    }
  }, [id]); // O efeito roda novamente sempre que o 'id' na URL mudar

  // Renderização condicional baseada nos estados
  if (loading) return <div className="text-center text-blue-500 text-xl py-4">Carregando detalhes do veículo...</div>;
  if (error) return <div className="text-center text-red-500 text-xl py-4">Erro: {error}</div>;
  if (!vehicle) return <div className="text-center text-gray-600 text-xl py-4 mt-4">Veículo não encontrado.</div>; // Se não carregou e não há erro, mas o veículo é null

  // Conteúdo principal dos detalhes do veículo
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Detalhes do Veículo</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-800">
        <p><strong>Marca:</strong></p><p>{vehicle.brand}</p>
        <p><strong>Modelo:</strong></p><p>{vehicle.model}</p>
        <p><strong>Ano:</strong></p><p>{vehicle.year}</p>
        <p><strong>Placa:</strong></p><p>{vehicle.plate}</p>
        <p><strong>Cor:</strong></p><p>{vehicle.color}</p>
        <p><strong>Quilometragem:</strong></p><p>{vehicle.mileage} km</p>
        <p><strong>Preço:</strong></p><p>R$ {Number(vehicle.price).toFixed(2)}</p> {/* Garante que é número */}
        <p><strong>Status:</strong></p>
        <p>
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            vehicle.status === 'available' ? 'bg-green-100 text-green-800' :
            vehicle.status === 'rented' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {vehicle.status}
          </span>
        </p>
        <p><strong>Criado em:</strong></p><p>{new Date(vehicle.createdAt).toLocaleDateString()}</p>
        <p><strong>Última Atualização:</strong></p><p>{new Date(vehicle.updatedAt).toLocaleDateString()}</p>
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        {/* Links para outras rotas */}
        <Link to={`/vehicles/edit/${vehicle.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Editar Veículo
        </Link>
        <Link to="/" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Voltar para a Lista
        </Link>
      </div>
    </div>
  );
};

export default VehicleDetails;
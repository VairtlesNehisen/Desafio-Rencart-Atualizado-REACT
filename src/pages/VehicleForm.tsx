// src/pages/VehicleForm.tsx
import React, { useState, useEffect } from 'react';
import type { VehicleInput } from '../types/Vehicle'; // Importa o tipo VehicleInput
import { createVehicle, updateVehicle, getVehicleById } from '../services/vehicleService'; // Importa funções de serviço
import { useNavigate, useParams } from 'react-router-dom'; // Importa hooks do Router

const VehicleForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL (se estiver no modo de edição)
  const navigate = useNavigate(); // Hook para navegação programática após salvar

  // Estado inicial do formulário
  const [formData, setFormData] = useState<VehicleInput>({
    brand: '', model: '', year: 2024, plate: '', color: '',
    mileage: 0, price: 0, status: 'available',
  });
  const [loading, setLoading] = useState(true); // Controla o carregamento (especialmente para edição)
  const [error, setError] = useState<string | null>(null); // Armazena mensagens de erro

  // Efeito para carregar dados do veículo se estiver no modo de edição
  useEffect(() => {
    const fetchVehicleForEdit = async () => {
      if (id) { // Se um ID existe na URL, estamos em modo de edição
        try {
          const vehicle = await getVehicleById(Number(id)); // Busca o veículo na API
          setFormData({ // Popula o formulário com os dados do veículo existente
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            plate: vehicle.plate,
            color: vehicle.color,
            mileage: vehicle.mileage,
            price: Number(vehicle.price), // Converte o preço para número ao carregar no form
            status: vehicle.status,
          });
        } catch (err: any) {
          console.error("Erro ao carregar veículo para edição:", err);
          setError(err.message || "Não foi possível carregar o veículo para edição.");
        }
      }
      setLoading(false); // Finaliza o carregamento, mesmo se não houver ID (modo criação)
    };
    fetchVehicleForEdit();
  }, [id]); // O efeito roda novamente se o 'id' na URL mudar

  // Handler para mudança nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      // Converte valores numéricos para number, outros como string
      [name]: name === 'year' || name === 'mileage' || name === 'price' ? Number(value) : value,
    }));
  };

  // Handler para submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página
    setLoading(true); // Inicia o estado de carregamento para a submissão
    setError(null); // Limpa erros anteriores

    try {
      if (id) { // Se houver ID, é uma atualização
        await updateVehicle(Number(id), formData); // Chama o serviço de atualização
        alert('Veículo atualizado com sucesso!');
      } else { // Se não houver ID, é uma criação
        await createVehicle(formData); // Chama o serviço de criação
        alert('Veículo criado com sucesso!');
      }
      navigate('/'); // Redireciona para a página principal (lista de veículos) após o sucesso
    } catch (err: any) {
      console.error("Erro ao salvar veículo:", err);
      setError(err.message || "Falha ao salvar veículo.");
    } finally {
      setLoading(false); // Finaliza o estado de carregamento da submissão
    }
  };

  // Renderização condicional para o formulário
  if (loading) return <div className="text-center text-blue-500 text-xl py-4">Carregando formulário...</div>; // Exibe carregamento no modo edição
  if (error) return <div className="text-center text-red-500 text-xl py-4">Erro: {error}</div>;


  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">{id ? 'Editar Veículo' : 'Adicionar Novo Veículo'}</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}

      <div className="mb-4">
        <label htmlFor="brand" className="block text-gray-700 text-sm font-bold mb-2">Marca:</label>
        <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="model" className="block text-gray-700 text-sm font-bold mb-2">Modelo:</label>
        <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">Ano:</label>
        <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="plate" className="block text-gray-700 text-sm font-bold mb-2">Placa:</label>
        {/* Desabilita o campo de placa para edição para evitar mudanças que violariam UNIQUE sem lógica extra */}
        <input type="text" id="plate" name="plate" value={formData.plate} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled={!!id} />
        {id && <p className="text-xs text-gray-500 mt-1">A placa não pode ser alterada na edição.</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="color" className="block text-gray-700 text-sm font-bold mb-2">Cor:</label>
        <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="mileage" className="block text-gray-700 text-sm font-bold mb-2">Quilometragem:</label>
        <input type="number" id="mileage" name="mileage" value={formData.mileage} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-6">
        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Preço:</label>
        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} step="0.01" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-6">
        <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange} required className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="available">Disponível</option>
          <option value="rented">Alugado</option>
          <option value="maintenance">Manutenção</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? 'Salvando...' : 'Salvar Veículo'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default VehicleForm;
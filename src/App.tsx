// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import VehicleList from './pages/VehicleList';
import VehicleForm from './pages/VehicleForm';
import VehicleDetails from './pages/VehicleDetails';
import './index.css'; // Certifique-se de que este arquivo importa o CSS do Tailwind

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <nav className="container mx-auto flex justify-between items-center">
            <div className="text-xl font-bold">
              <Link to="/" className="hover:underline">Rentcars</Link>
            </div>
            <div>
              <Link to="/" className="mr-4 hover:underline">Lista de Veículos</Link>
              <Link to="/vehicles/new" className="hover:underline">Adicionar Veículo</Link>
            </div>
          </nav>
        </header>
        <main className="container mx-auto p-6 flex-grow">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Gerenciador de Veículos</h1>
          <Routes>
            <Route path="/" element={<VehicleList />} /> {/* Rota para a lista de veículos (home) */}
            <Route path="/vehicles/new" element={<VehicleForm />} /> {/* Rota para criar novo veículo */}
            <Route path="/vehicles/edit/:id" element={<VehicleForm />} /> {/* Rota para editar veículo (com ID) */}
            <Route path="/vehicles/:id" element={<VehicleDetails />} /> {/* Rota para detalhes do veículo (com ID) */}
            <Route path="*" element={<div className="text-center text-red-500 text-xl">Página não encontrada!</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
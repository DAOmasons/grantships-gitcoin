import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Text } from '@mantine/core';
import { Selections } from './pages/Selections';
import { Elections } from './pages/Elections';
import { Applications } from './pages/Applications';
import { Reviews } from './pages/Reviews';
import { Dashboard } from './pages/Dashboard';
import { RoundApplication } from './pages/RoundApplication';

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/elections" element={<Elections />} />
      <Route path="/selections" element={<Selections />} />
      {/* <Route path="" element={<RoundApplication />} /> */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

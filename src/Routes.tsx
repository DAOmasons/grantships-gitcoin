import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Text } from '@mantine/core';
import { Selections } from './pages/Selections';
import { Elections } from './pages/Elections';

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/reviews" element={<Text>Reviews</Text>} />
      <Route path="/dashboard" element={<Text>Dashboard</Text>} />
      <Route path="/applications" element={<Text>Applications</Text>} />
      <Route path="/elections" element={<Elections />} />
      <Route path="/selections" element={<Selections />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

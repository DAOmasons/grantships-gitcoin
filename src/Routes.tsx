import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Selections } from './pages/Selections';
import { Elections } from './pages/Elections';
import { Applications } from './pages/Applications';
import { Reviews } from './pages/Reviews';
import { JudgeDashboard } from './pages/JudgeDashboard';
import { VoteApplication } from './pages/VoteApplication';

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/judge-dashboard" element={<JudgeDashboard />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/elections" element={<Elections />} />
      <Route path="/selections" element={<Selections />} />
      <Route path="/vote-application/:id" element={<VoteApplication />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

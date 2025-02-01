import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Selections } from './pages/Selections';
import { Elections } from './pages/Elections';
import { Ships } from './pages/Ships';
import { Reviews } from './pages/Reviews';
import { JudgeDashboard } from './pages/JudgeDashboard';
import { VoteApplication } from './pages/VoteApplication';
import { ViewApplication } from './pages/ViewApplication';
import { Review } from './pages/ReviewApplication';
import { SubmitApplicationAlt } from './pages/SubmitApplicationAlt';

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/judge-dashboard" element={<JudgeDashboard />} />
      <Route path="/ships" element={<Ships />} />
      <Route path="/elections" element={<Elections />} />
      <Route path="/selections" element={<Selections />} />
      <Route path="/submit-application" element={<SubmitApplicationAlt />} />
      <Route path="/vote-application/:id" element={<VoteApplication />} />
      <Route path="/view-application/:id" element={<ViewApplication />} />
      <Route path="/review/:id" element={<Review />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

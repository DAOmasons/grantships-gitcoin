import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Selections } from './pages/Selections';
import { Elections } from './pages/Elections';
import { Ships } from './pages/Ships';
import { JudgeDashboard } from './pages/JudgeDashboard';
import { VoteApplication } from './pages/VoteApplication';
import { Review } from './pages/ReviewApplication';
import { SubmitApplicationAlt2 } from './pages/SubmitApplicationAlt2';
import { Applications } from './pages/Applications';
import { AppDraft } from './pages/AppDraft';
import { MyApplications } from './pages/MyApplications';
import { About } from './pages/About';
import { Ship } from './pages/Ship';
import { AdminDashboard } from './pages/AdminDashboard';
import { Vote } from './pages/Vote';

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/judge-dashboard" element={<JudgeDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/ships" element={<Ships />} />
      <Route path="/ship/:id" element={<Ship />} />
      <Route path="/about" element={<About />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/elections" element={<Elections />} />
      <Route path="/selections" element={<Selections />} />
      <Route path="/submit-application" element={<SubmitApplicationAlt2 />} />
      <Route path="/vote-application/:id" element={<VoteApplication />} />
      <Route path="/view-draft/:id" element={<AppDraft />} />
      <Route path="/my-applications/:address" element={<MyApplications />} />
      <Route path="/review/:id" element={<Review />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import TopUp from './components/TopUp';
import Transfers from './components/Transfers'; 
import Loans from './components/Loans'; 
import LoanTerms from './components/LoanTerms';
import Investments from './components/Investments';
import CustomerCare from './pages/CustomerCare';
import TransferHistoryPage from './pages/TransferHistoryPage';
import QueryPage from './pages/QueryPage';
import AdminChat from './components/AdminChat';
import LoginPage from './pages/LoginPage'; 

const PrivateRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? element : <Navigate to="/" />; 
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<PrivateRoute element={<DashBoard />} />} />
        <Route path="/topup" element={<PrivateRoute element={<TopUp />} />} />
        <Route path="/transfers" element={<PrivateRoute element={<Transfers />} />} />
        <Route path="/loans" element={<PrivateRoute element={<Loans />} />} />
        <Route path="/investments" element={<PrivateRoute element={<Investments />} />} />
        <Route path="/customercare" element={<PrivateRoute element={<CustomerCare />} />} />
        <Route path="/transferhistorypage" element={<PrivateRoute element={<TransferHistoryPage />} />} />
        <Route path="/querypage" element={<PrivateRoute element={<QueryPage />} />} />
        <Route path="/loanterms" element={<PrivateRoute element={<LoanTerms />} />} />
        <Route path="/adminchat" element={<PrivateRoute element={<AdminChat />} />} />
      </Routes>
    </Router>
  );
}

export default App;

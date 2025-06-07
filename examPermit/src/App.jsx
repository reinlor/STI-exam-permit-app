import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./login/Login"

// Student
import Homepage from './homepage/Homepage.jsx';
import About from './about/About.jsx';
import Balance from './balance/Balance.jsx';
import Permit from './permit/Permit.jsx';
import Transaction from './transaction/Transaction.jsx';
import Validation from './validation/Validation.jsx';
import Profile from './profile/Profile.jsx';

// Admin
import Admin from './admin/Admin.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/balance" element={<Balance />} />
        <Route path="/permit" element={<Permit />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/validation" element={<Validation />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App

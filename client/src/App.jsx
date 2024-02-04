//import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { AddCompanyPage } from './pages/AddCompanyPage';
import { AddWorkPointPage } from './pages/AddWorkPointPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='/profile'
          element={<UserProfilePage />}
        />
        <Route
          path='/addCompany'
          element={<AddCompanyPage />}
        />
        <Route
          path='/addWorkPoint'
          element={<AddWorkPointPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

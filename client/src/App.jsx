//import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { AddWorkPointPage } from './pages/AddWorkPointPage';
import { BillDownloadPage } from './pages/BillDownloadPage';

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
          path='/addWorkPoint'
          element={<AddWorkPointPage />}
        />
        <Route
          path='/downloadBill'
          element={<BillDownloadPage />}
        />
        <Route
          path='/downloadBill/:orderId'
          element={<BillDownloadPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

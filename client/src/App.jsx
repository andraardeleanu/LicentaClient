//import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';

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
        {/* <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='*'
          element={<NotFound />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

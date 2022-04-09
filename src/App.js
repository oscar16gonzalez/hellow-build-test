import logo from './logo.svg';
import './App.css';
import Resgister from './components/auth/register/Register';
import Login from './components/auth/login/Login';
import { MainRoute } from './Router/MainRoute';

function App() {
  return (
    <MainRoute>
      <Resgister />
      <Login />
    </MainRoute>
  );
}

export default App;

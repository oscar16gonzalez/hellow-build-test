import './App.css';
import Login from './components/auth/login/Login';
import { MainRoute } from './Router/MainRoute';

function App() {
  return (
    <MainRoute>
      <Login />
    </MainRoute>
  );
}

export default App;

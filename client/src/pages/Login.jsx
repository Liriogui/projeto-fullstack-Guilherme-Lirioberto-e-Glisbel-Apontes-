import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState([]);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErros([]);
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, senha });
      login(response.data.token, response.data.user);
      navigate('/agendamentos');
    } catch (error) {
      if (error.response?.data?.errors) {
        setErros(error.response.data.errors);
      } else {
        setErros(['Erro ao fazer login. Verifique suas credenciais.']);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        
        {erros.length > 0 && (
          <div className="error-message">
            {erros.map((erro, index) => (
              <p key={index}>{erro}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="Sua senha"
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="auth-link">
          Não tem uma conta? <Link to="/register">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}
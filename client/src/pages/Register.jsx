import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [erros, setErros] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErros([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErros([]);
    setLoading(true);

    // Validação básica no frontend
    if (formData.senha !== formData.confirmarSenha) {
      setErros(['As senhas não coincidem']);
      setLoading(false);
      return;
    }

    if (formData.senha.length < 6) {
      setErros(['A senha deve ter pelo menos 6 caracteres']);
      setLoading(false);
      return;
    }

    try {
      const { confirmarSenha, ...dataToSend } = formData;
      await api.post('/auth/register', dataToSend);
      navigate('/');
    } catch (error) {
      if (error.response?.data?.errors) {
        setErros(error.response.data.errors);
      } else {
        setErros(['Erro ao criar conta. Tente novamente.']);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Criar Conta</h2>
        
        {erros.length > 0 && (
          <div className="error-message">
            {erros.map((erro, index) => (
              <p key={index}>{erro}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Seu nome completo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
              placeholder="Digite a senha novamente"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>

        <p className="auth-link">
          Já tem uma conta? <Link to="/">Fazer login</Link>
        </p>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function Agendamentos() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    data: '',
    servico: ''
  });
  const [formErrors, setFormErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { logout, isAdmin, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const carregarAgendamentos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/agendamentos');
      setLista(response.data);
      setErro('');
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
        navigate('/');
      } else {
        setErro('Erro ao carregar agendamentos');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors([]);
    setSubmitting(true);

    try {
      await api.post('/agendamentos', formData);
      setFormData({ data: '', servico: '' });
      setShowForm(false);
      carregarAgendamentos();
    } catch (error) {
      if (error.response?.data?.errors) {
        setFormErrors(error.response.data.errors);
      } else {
        setFormErrors(['Erro ao criar agendamento']);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      return;
    }

    try {
      await api.delete(`/agendamentos/${id}`);
      carregarAgendamentos();
    } catch (error) {
      alert('Erro ao excluir agendamento');
    }
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Agendamentos</h1>
        <div className="header-actions">
          <span className="user-info">
            {user?.role === 'admin' && <span className="badge-admin">Admin</span>}
            {user?.nome || user?.email}
          </span>
          <button onClick={logout} className="btn-secondary">Sair</button>
        </div>
      </header>

      <div className="content">
        <div className="section-header">
          <h2>Meus Agendamentos</h2>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? 'Cancelar' : '+ Novo Agendamento'}
          </button>
        </div>

        {showForm && (
          <div className="card">
            <h3>Novo Agendamento</h3>
            {formErrors.length > 0 && (
              <div className="error-message">
                {formErrors.map((erro, index) => (
                  <p key={index}>{erro}</p>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="data">Data e Hora</label>
                <input
                  type="datetime-local"
                  id="data"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  required
                  disabled={submitting}
                />
              </div>
              <div className="form-group">
                <label htmlFor="servico">Serviço</label>
                <input
                  type="text"
                  id="servico"
                  value={formData.servico}
                  onChange={(e) => setFormData({ ...formData, servico: e.target.value })}
                  required
                  placeholder="Ex: Consulta médica, Corte de cabelo..."
                  disabled={submitting}
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary">
                {submitting ? 'Salvando...' : 'Salvar'}
              </button>
            </form>
          </div>
        )}

        {erro && <div className="error-message"><p>{erro}</p></div>}

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Carregando agendamentos...</p>
          </div>
        ) : lista.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum agendamento encontrado.</p>
          </div>
        ) : (
          <div className="agendamentos-grid">
            {lista.map((agendamento) => (
              <div key={agendamento._id} className="agendamento-card">
                <div className="agendamento-header">
                  <h3>{agendamento.servico}</h3>
                  {isAdmin() && agendamento.usuario && (
                    <span className="badge-user">
                      {agendamento.usuario.nome || agendamento.usuario.email}
                    </span>
                  )}
                </div>
                <p className="agendamento-data">
                  📅 {formatarData(agendamento.data)}
                </p>
                <div className="agendamento-actions">
                  <button
                    onClick={() => handleDelete(agendamento._id)}
                    className="btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
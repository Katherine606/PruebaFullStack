import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { votarFeedback, cambiarEstadoFeedback } from "../services/feedback";

interface Feedback {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  estado: string;
  votos: number;
  hasVoted?: boolean;
}

export default function FeedbackDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const feedbackInicial = location.state?.item as Feedback;
  const [feedback, setFeedback] = useState<Feedback | null>(feedbackInicial || null);

  if (!feedback) {
    return (
      <div className="container mt-5 text-center">
        <p>No se encontró información del feedback.</p>
        <button className="btn btn-primary btn-sm" onClick={() => navigate("/feedbacks")}>
          Volver al Tablero
        </button>
      </div>
    );
  }

  const handleVotar = async () => {
    try {
      const resultado = await votarFeedback(feedback.id);
      setFeedback({
        ...feedback,
        votos: resultado.totalVotos,
        hasVoted: resultado.votado,
      });
    } catch (err) {
      alert("Error al procesar el voto");
    }
  };

  const handleCambiarEstado = async (nuevoEstado: string) => {
    try {
      await cambiarEstadoFeedback(feedback.id, nuevoEstado);
      setFeedback({
        ...feedback,
        estado: nuevoEstado,
      });
    } catch (err) {
      alert("Error al cambiar el estado");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
      <button 
        className="btn btn-link text-decoration-none text-secondary ps-0 mb-4"
        onClick={() => navigate("/feedbacks")}
      >
        ← volver a feedbacks
      </button>

      <div className="card shadow-sm p-4 border-0">
        <div className="d-flex align-items-start gap-3">
          <button 
            className={`btn d-flex flex-column align-items-center px-3 py-2 ${feedback.hasVoted ? 'btn-success text-white' : 'btn-light border'}`}
            onClick={handleVotar}
          >
            <span className="fw-bold" style={{ fontSize: "12px" }}>▲</span>
            <span className="fw-bold">{feedback.votos}</span>
          </button>

          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge bg-light text-primary">{feedback.categoria}</span>
     
              <select 
                className="form-select form-select-sm w-auto" 
                value={feedback.estado}
                onChange={(e) => handleCambiarEstado(e.target.value)}
              >
                <option value="open">Por Hacer</option>
                <option value="doing">En Progreso</option>
                <option value="done">Completado</option>
              </select>
            </div>

            <h3 className="fw-bold mb-2">{feedback.titulo}</h3>
            <p className="text-muted mb-0" style={{ fontSize: "1.05rem" }}>
              {feedback.descripcion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
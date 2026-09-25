import { useNavigate } from "react-router-dom";

interface Feedback {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  estado: string;
  votos: number;
  hasVoted?: boolean; 
}

interface FeedbackCardProps {
  item: Feedback;
  onVotar: (id: number) => void;
  onCambiarEstado: (id: number, nuevoEstado: string) => void;
}
export function FeedbackCard({ item, onVotar, onCambiarEstado }: FeedbackCardProps) {
  const navigate = useNavigate();

  const irAlDetalle = () => {
    navigate(`/feedback/${item.id}`, { state: { item } });
  };

  return (
    <div className="card shadow-sm mb-3" style={{ cursor: "pointer" }} onClick={irAlDetalle}>
      <div className="card-body">
        <h6 className="card-title fw-bold">{item.titulo}</h6>
        <p className="card-text text-muted small mb-2">{item.descripcion}</p>
        
        <div className="mb-2" onClick={(e) => e.stopPropagation()}>
          <select 
            className="form-select form-select-sm" 
            value={item.estado}
            onChange={(e) => onCambiarEstado(item.id, e.target.value)}
          >
            <option value="open">Por Hacer</option>
            <option value="doing">En Progreso</option>
            <option value="done">Completado</option>
          </select>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3" onClick={(e) => e.stopPropagation()}>
          <small className="text-secondary">{item.categoria}</small>
          <button 
            className={`btn btn-sm ${item.hasVoted ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => onVotar(item.id)}
          >
            Voto: {item.votos}
          </button>
        </div>
      </div>
    </div>
  );
}
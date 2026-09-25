import { useState } from "react";
import { crearFeedback } from "../services/feedback";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onCreado: () => void;
}

export function ModalCrearFeedback({ show, onClose, onCreado }: ModalProps) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("Feature");
  const [estado, setEstado] = useState("open"); 
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await crearFeedback({ titulo, descripcion, categoria, estado });
 
      setTitulo("");
      setDescripcion("");
      setCategoria("Feature");
      setEstado("open");
      
      onCreado();
      onClose();  
    } catch (err) {
      alert("Error al crear el feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold">Crear Nuevo Feedback</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-bold small">Título</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={titulo} 
                  onChange={(e) => setTitulo(e.target.value)} 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold small">Categoría</label>
                <select 
                  className="form-select" 
                  value={categoria} 
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="FEATURE">Feature</option>
                  <option value="UI">UI</option>
                  <option value="UX">UX</option>
                  <option value="PERFORMANCE">Performance</option>
                  <option value="BUG">Bug</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold small">Estado inicial</label>
                <select 
                  className="form-select" 
                  value={estado} 
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="open">Por Hacer (Open)</option>
                  <option value="doing">En Progreso (Doing)</option>
                  <option value="done">Completado (Done)</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold small">Descripción</label>
                <textarea 
                  className="form-control" 
                  rows={3} 
                  value={descripcion} 
                  onChange={(e) => setDescripcion(e.target.value)} 
                  required 
                />
              </div>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                {loading ? "Guardando..." : "Crear Feedback"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
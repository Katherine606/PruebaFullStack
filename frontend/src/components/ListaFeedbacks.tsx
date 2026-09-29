import { useEffect, useState } from "react";
import { obtenerFeedbacks, votarFeedback, cambiarEstadoFeedback } from "../services/feedback";
import { useNavigate } from "react-router-dom";
import { ModalCrearFeedback } from "./ModalCrearFeedback";
import { FeedbackCard } from "./FeedbackCard";

interface Feedback {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  estado: string; 
  votos: number;
  hasVoted?: boolean;
}

function ListaFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string>("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("todas");
  
  const navigate = useNavigate();

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const data = await obtenerFeedbacks();
      setFeedbacks(data);
    } catch (err: any) {
      setError("No se pudieron cargar los feedbacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    cargarDatos();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleVotar = async (id: number) => {
    try {
      const resultado = await votarFeedback(id); 
      setFeedbacks(prevFeedbacks =>
        prevFeedbacks.map(f => f.id === id ? { ...f, votos: resultado.totalVotos, hasVoted: resultado.votado }: f )
      );
    } catch (err: any) {
      alert(err.response?.data?.mensaje || "Error al procesar el voto");
    }
  };

  const handleCambiarEstado = async (id: number, nuevoEstado: string) => {
    try {
      await cambiarEstadoFeedback(id, nuevoEstado);
      await cargarDatos();
    } catch (err: any) {
      alert("Error al cambiar el estado");
    }
  };


  const categoriasUnicas = Array.from(new Set(feedbacks.map(f => f.categoria)));

  const feedbacksFiltrados = feedbacks.filter((f) => {
    if (categoriaFiltro === "todas") return true;
    return f.categoria.toLowerCase() === categoriaFiltro.toLowerCase();
  });

  const openTareas = feedbacksFiltrados.filter((f) => f.estado === "open");
  const doingTareas = feedbacksFiltrados.filter((f) => f.estado === "doing");
  const doneTareas = feedbacksFiltrados.filter((f) => f.estado === "done");

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
   
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Tablero de Feedback</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
            + Nuevo Feedback
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={cerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

    
      <div className="card shadow-sm p-3 mb-4 bg-white border-0">
        <div className="row align-items-center">
          <div className="col-md-4">
            <label className="form-label fw-bold small mb-1">Filtrar por Categoría:</label>
            <select 
              className="form-select form-select-sm"
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
            >
              <option value="todas">Todas las categorías</option>
              {categoriasUnicas.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="row">
   
        <div className="col-md-4">
          <div className="card bg-light mb-3 border-0 shadow-sm">
            <div className="card-header fw-bold text-center">Por Hacer ({openTareas.length})</div>
            <div className="card-body" style={{ minHeight: "400px" }}>
              {openTareas.length === 0 ? (
                <p className="text-muted text-center small mt-4">No hay tareas en esta sección</p>
              ) : (
                openTareas.map((item) => (
                  <FeedbackCard 
                    key={item.id} 
                    item={item} 
                    onVotar={handleVotar} 
                    onCambiarEstado={handleCambiarEstado} 
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-light mb-3 border-0 shadow-sm">
            <div className="card-header fw-bold text-center ">En Progreso ({doingTareas.length})</div>
            <div className="card-body" style={{ minHeight: "400px" }}>
              {doingTareas.length === 0 ? (
                <p className="text-muted text-center small mt-4">No hay tareas en esta sección</p>
              ) : (
                doingTareas.map((item) => (
                  <FeedbackCard 
                    key={item.id} 
                    item={item} 
                    onVotar={handleVotar} 
                    onCambiarEstado={handleCambiarEstado} 
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-light mb-3 border-0 shadow-sm">
            <div className="card-header fw-bold text-center">Completado ({doneTareas.length})</div>
            <div className="card-body" style={{ minHeight: "400px" }}>
              {doneTareas.length === 0 ? (
                <p className="text-muted text-center small mt-4">No hay tareas en esta sección</p>
              ) : (
                doneTareas.map((item) => (
                  <FeedbackCard 
                    key={item.id} 
                    item={item} 
                    onVotar={handleVotar} 
                    onCambiarEstado={handleCambiarEstado} 
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <ModalCrearFeedback 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onCreado={cargarDatos} 
      />
    </div>  
  );
}

export default ListaFeedbacks;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import ListaFeedbacks from "./components/ListaFeedbacks";
import FeedbackDetail from "./components/FeedbackDetail";



function App() {
return (
 <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feedbacks" element={<ListaFeedbacks />} /> 
        <Route path="/feedback/:id" element={<FeedbackDetail />} />

      </Routes>
    </Router>
  );
}

export default App;
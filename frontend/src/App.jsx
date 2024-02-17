import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Word from "./pages/Word.jsx";
import Equation from "./pages/Equation.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/text-question' element={<Word />} />
        <Route path='/Equation' element={<Equation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

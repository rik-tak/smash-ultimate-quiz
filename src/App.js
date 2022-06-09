import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import QuizBoard from "./components/QuizBoard";


function App()  {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/quiz/`} element={<QuizBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

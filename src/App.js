import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import QuizBoard from "./components/QuizBoard";
import Quiz from "./components/Quiz";


function App()  {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/weight-quiz/`} element={<Quiz quizType="weight" />} />
        <Route path={`/block-frame-quiz/`} element={<Quiz quizType="blockFrame" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

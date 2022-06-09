import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import WeightQuiz from './WeightQuiz';


function QuizBoard()  {
  return (
    <div className="min-h-screen bg-green-50 py-6 flex flex-col justify-center relative overflow-hidden">
      <div className="relative pt-10 pb-8 bg-white shadow-xl ring-1 ring-gray-900/5 max-w-lg mx-auto rounded-lg px-10 w-64">
        <WeightQuiz />
        <Link to="/">
          <button variant="contained" className="btn-pill btn-blue">
            戻る
          </button>
        </Link>
      </div>
    </div>
  );
}

export default QuizBoard;

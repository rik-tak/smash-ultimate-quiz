import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";


function Home()  {
  return (
    <div className="min-h-screen bg-green-50 py-4 flex flex-col justify-center relative overflow-hidden">
      <div className="grid grid-cols-1 gap-2 relative pt-10 pb-8 bg-white shadow-xl ring-1 ring-gray-900/5 max-w-lg mx-auto rounded-lg px-10">
        <span className="block text-gray-700 text-center bg-gray-200 px-4 py-2">
          スマブラSPクイズ
        </span>
        <Link to="/weight-quiz" className="mx-auto">
          <button className="btn btn-blue">
            ファイター 体重値クイズ
          </button>
        </Link>
        <Link to="/block-frame-quiz" className="mx-auto">
          <button className="btn btn-blue">
            ガード硬直差クイズ
          </button>
        </Link>
        <span className="text-center">
          制作: @roknao
        </span>
      </div>
    </div>
  )
}

export default Home;

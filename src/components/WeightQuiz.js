import React, { useState, useEffect } from 'react';

import { collection, getDocs, doc, getDoc } from "firebase/firestore/lite";
import db from "../firebase";
import { Link } from "react-router-dom";

import { getRandomInt } from "../utils";


function WeightQuiz()  {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [choices, setChoices] = useState([0, 0, 0, 0]);
  const [result, setResult] = useState("-");
  const [openAnswer, setOpenAnswer] = useState(false);
  const [info, setInfo] = useState("");

  async function getFighterInfo() {
    var fighterId = getRandomInt(0, 89);
    fighterId = ('00' + fighterId).slice(-2);
    const docRef = doc(db, "fighter-basic-info", fighterId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
  }

  function loadQuiz() {
    getFighterInfo().then(fighter => {
      const newName = fighter.name;
      setName(newName);
      const newAnswer = getRandomInt(0, 4);
      setAnswer(newAnswer);
      const newChoice = [0, 0, 0, 0];
      const answerValue = fighter.weight;
      newChoice[newAnswer] = answerValue;
      for (var i=0; i<4; i++) {
        while(i!==newAnswer) {
          const offset = getRandomInt(-5, 6);
          if (!newChoice.includes(answerValue + offset)) {
            newChoice[i] = answerValue + offset;
            break;
          }
        }
      }
      setChoices(newChoice);
    });
  }

  function checkAnswer(choiceId) {
    const newQuizCount = quizCount + 1;
    var newCorrectCount = correctCount;
    var newResult = "ざんねん・・・";
    if (choiceId === answer) {
      newResult = "せいかい！";
      newCorrectCount = newCorrectCount + 1;
    }

    var newScore = 100 * newCorrectCount / newQuizCount;
    newScore = Math.round(newScore * 10) / 10;
    setScore(newScore);
    setCorrectCount(newCorrectCount);
    setQuizCount(newQuizCount);
    setResult(newResult);
    setInfo(newResult);
    setOpenAnswer(true);

    setTimeout(() => {
      setOpenAnswer(false);
      setInfo(`Score: ${newScore}% (${newCorrectCount} / ${newQuizCount})`)
      loadQuiz();
      setResult("");
    }, "1500");
  }

  useEffect(() => {
    loadQuiz();
  }, []);

  const ButtonChoice = (props) => {
    let buttonClassName;
    if (!openAnswer) {
      buttonClassName = "btn btn-blue"
    } else if (props.buttonNumber === answer) {
      buttonClassName = "btn btn-green"
    } else {
      buttonClassName = "btn btn-red"
    }

    return (
      <button onClick={() => checkAnswer(props.buttonNumber)} className={buttonClassName} disabled={openAnswer}>
        {choices[props.buttonNumber]}
      </button>
    )
  }

  return (
    <div className="grid grid-cols-1 grid-rows-3 gap-2">
      <span className="block text-gray-700 text-center bg-gray-200 px-4 py-2 mt-2">{name}の体重は？</span>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        {[0, 1, 2, 3].map((num) =>
          <ButtonChoice buttonNumber={num} key={num} />
        )}
      </div>
      <span className="block text-gray-700 text-center bg-gray-200 px-4 py-2 mt-2">{info}</span>
    </div>
  );
}

export default WeightQuiz;
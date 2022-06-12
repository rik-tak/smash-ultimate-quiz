import React, { useState, useEffect } from 'react';

import { collection, getDocs, doc, getDoc } from "firebase/firestore/lite";
import db from "../firebase";
import { Link } from "react-router-dom";

import { getRandomInt } from "../utils";


function Quiz()  {
  const [quizSentence, setQuizSentence] = useState("");
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [choices, setChoices] = useState([0, 0, 0, 0]);
  const [result, setResult] = useState("-");
  const [openAnswer, setOpenAnswer] = useState(false);
  const [info, setInfo] = useState("");

  async function getDataFromFirestore(collectionName, docName) {
    const docRef = doc(db, collectionName, docName);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data
  }

  async function getWeightQuiz() {
    var fighterId = getRandomInt(0, 89);
    fighterId = ('00' + fighterId).slice(-2);
    const data = await getDataFromFirestore("fighter-basic-info", fighterId)
    const quizSentence = data.name + "の体重は？";
    const quizAnswerValue = data.weight;
    return [quizSentence, quizAnswerValue];
  }

  function loadQuiz() {
    getWeightQuiz().then(res => {
      const quizSentence = res[0];
      const quizAnswerValue = res[1];
      setQuizSentence(quizSentence);

      const newAnswer = getRandomInt(0, 4);
      setAnswer(newAnswer);
      const newChoice = [0, 0, 0, 0];
      newChoice[newAnswer] = quizAnswerValue;
      for (var i=0; i<4; i++) {
        while(i!==newAnswer) {
          const offset = getRandomInt(-5, 6);
          if (!newChoice.includes(quizAnswerValue + offset)) {
            newChoice[i] = quizAnswerValue + offset;
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
      <span className="block text-gray-700 text-center bg-gray-200 px-4 py-2 mt-2">{quizSentence}</span>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        {[0, 1, 2, 3].map((num) =>
          <ButtonChoice buttonNumber={num} key={num} />
        )}
      </div>
      <span className="block text-gray-700 text-center bg-gray-200 px-4 py-2 mt-2">{info}</span>
    </div>
  );
}

export default Quiz;
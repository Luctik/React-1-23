import React, { useState } from 'react';

const RiddleComponent = () => {
  const [answers, setAnswers] = useState({});
  const [showCorrect, setShowCorrect] = useState(false);

  let riddles = [
    {
      id: 1,
      description: 'Что может взойти в гору и спуститься с горы, но остаться на том же месте?',
      options: ['Человек', 'Вода', 'Солнце', 'Лестница'],
      correct: 3
    },
    {
      id: 2,
      description: 'Что принадлежит вам, но другие его используют чаще всего?',
      options: ['Ваш дом', 'Ваше имя', 'Ваша одежда', 'Ваша машина'],
      correct: 1
    },
    {
      id: 3,
      description: 'Что может быть сломано, даже если его не трогать?',
      options: ['Стекло', 'Обещание', 'Лед', 'Палка'],
      correct: 1
    },
    {
      id: 4,
      description: 'Что вы можете держать только после того, как отдали?',
      options: ['Деньги', 'Подарок', 'Слово', 'Книгу'],
      correct: 2
    },
    {
      id: 5,
      description: 'Что больше всего похоже на половину яблока?',
      options: ['Другое яблоко', 'Вторая половина того же яблока', 'Груша', 'Апельсин'],
      correct: 1
    }
  ];

  const handleAnswer = (riddleId, optionIndex) => {
    setAnswers({
      ...answers,
      [riddleId]: optionIndex
    });
  };

  const isCorrect = (riddleId, optionIndex) => {
    return showCorrect && riddles.find(riddle => riddle.id === riddleId).correct === optionIndex;
  };

  const isIncorrect = (riddleId, optionIndex) => {
    return showCorrect && riddles.find(riddle => riddle.id === riddleId).correct !== optionIndex && answers[riddleId] === optionIndex;
  };

  const isSelected = (riddleId, optionIndex) => {
    return answers[riddleId] === optionIndex;
  };

  const finishTest = () => {
    setShowCorrect(true);
  };

  return (
    <div style={{backgroundColor: '#D3D3D3'}}>
      {riddles.map((riddle) => (
        <div key={riddle.id}>
          <h2>{riddle.description}</h2>
          {riddle.options.map((option, index) => (
            <p 
              key={index} 
              onClick={() => handleAnswer(riddle.id, index)}
              style={{
                color: isCorrect(riddle.id, index) ? 'green' : isIncorrect(riddle.id, index) ? 'red' : isSelected(riddle.id, index) ? 'blue' : 'black'
              }}
            >
              {option}
            </p>
          ))}
          {showCorrect && <p style={{color: 'green'}}>Правильный ответ: {riddle.options[riddle.correct]}</p>}
        </div>
      ))}
      <button onClick={finishTest}>Завершить тест</button>
    </div>
  );
};

export default RiddleComponent;

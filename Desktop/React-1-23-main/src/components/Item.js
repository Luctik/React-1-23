import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const RiddleComponent = () => {
  const [answers, setAnswers] = useState({});
  const [showCorrect, setShowCorrect] = useState(false);
  const [newRiddle, setNewRiddle] = useState({ id: uuidv4(), description: '', options: ['', '', '', ''], correct: 0 });
  const [riddles, setRiddles] = useState([
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
  ]);

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

  const handleNewRiddleChange = (event) => {
    const { name, value } = event.target;
    setNewRiddle({
      ...newRiddle,
      [name]: value
    });
  };

  const handleNewOptionChange = (index, event) => {
    const newOptions = [...newRiddle.options];
    newOptions[index] = event.target.value;
    setNewRiddle({
      ...newRiddle,
      options: newOptions
    });
  };

  const deleteRiddle = (riddleId) => {
    const updatedRiddles = riddles.filter(riddle => riddle.id !== riddleId);
    setRiddles(updatedRiddles);
  };

  const editRiddle = (riddle) => {
    setNewRiddle({ ...riddle });
    deleteRiddle(riddle.id);
  };

  const addNewRiddle = () => {
    if (newRiddle.description.trim() === '' || newRiddle.options.some(option => option.trim() === '')) {
      alert('Пожалуйста, заполните все поля вопроса и ответов.');
      return;
    }

    if (newRiddle.correct < 0 || newRiddle.correct >= newRiddle.options.length) {
      alert('Пожалуйста, выберите правильный ответ.');
      return;
    }

    const existingRiddleIndex = riddles.findIndex(riddle => riddle.id === newRiddle.id);
    if (existingRiddleIndex !== -1) {
      const updatedRiddles = [...riddles];
      updatedRiddles.splice(existingRiddleIndex, 0, newRiddle);
      setRiddles(updatedRiddles);
    } else {
      const newRiddleWithId = { ...newRiddle, id: uuidv4() };
      setRiddles([...riddles, newRiddleWithId]);
    }

    setNewRiddle({ id: uuidv4(), description: '', options: ['', '', '', ''], correct: 0 });
  };

  // Подсчет количества правильных ответов
  const correctAnswersCount = Object.keys(answers).filter(riddleId => riddles.find(riddle => riddle.id === parseInt(riddleId)).correct === answers[riddleId]).length;

  return (
    <div style={{ backgroundColor: '#D3D3D3' }}>
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
          {showCorrect && <p style={{ color: 'green' }}>Правильный ответ: {riddle.options[riddle.correct]}</p>}
          <button onClick={() => deleteRiddle(riddle.id)}>Удалить</button>
          <button onClick={() => editRiddle(riddle)}>Редактировать</button>
        </div>
      ))}
      <div>
        <h2>Добавить новый вопрос</h2>
        <input type="text" name="description" placeholder="Введите вопрос" value={newRiddle.description} onChange={handleNewRiddleChange} />
        {newRiddle.options.map((option, index) => (
          <input key={index} type="text" placeholder={`Вариант ответа ${index + 1}`} value={option} onChange={(event) => handleNewOptionChange(index, event)} />
        ))}
        <select name="correct" value={newRiddle.correct} onChange={handleNewRiddleChange}>
          {newRiddle.options.map((_, index) => (
            <option key={index} value={index}>{`Вариант ответа ${index + 1}`}</option>
          ))}
        </select>
        <button onClick={addNewRiddle}>Добавить вопрос</button>
      </div>
      <button onClick={finishTest}>Завершить тест</button>
      {showCorrect && <p>Количество правильных ответов: {correctAnswersCount}</p>}
    </div>
  );
};

export default RiddleComponent;

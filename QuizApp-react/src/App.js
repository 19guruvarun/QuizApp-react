import { Button, Container, Row, Col, Stack } from "react-bootstrap";
import React, { useState } from 'react';


function App() {
  const [buttonStates, setButtonStates] = useState([false, false, false, false]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score,setscore]=useState(0);
  const [quizPhase,setquizPhase]=useState("welcome");

  const handleAnsweronButtonClick=(isCorrect)=>{
    if(isCorrect){
      setscore(score+1);
    }
    const nextQuestion=currentQuestion+1;
      if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setButtonStates([false, false, false, false]);
    } else {
      setquizPhase("completed");
    }
  }

  const handlereattemptquiz=()=>{
    setCurrentQuestion(0);
    setscore(0);
    setquizPhase("quiz");
  }
  const handleStartQuiz=()=>{
    setquizPhase("quiz");
  }
  const handleQuitQuiz=()=>{
    setquizPhase("welcome");
    setCurrentQuestion(0);
    setscore(0);
  }

  const questions = [
    {
      questionText: 'What is the capital of France?',
      answerOptions: [
        { answerText: 'New York', isCorrect: false },
        { answerText: 'London', isCorrect: false },
        { answerText: 'Paris', isCorrect: true },
        { answerText: 'Dublin', isCorrect: false },
      ],
    },
    {
      questionText: 'Who is CEO of Tesla?',
      answerOptions: [
        { answerText: 'Jeff Bezos', isCorrect: false },
        { answerText: 'Elon Musk', isCorrect: true },
        { answerText: 'Bill Gates', isCorrect: false },
        { answerText: 'Tony Stark', isCorrect: false },
      ],
    },
    {
      questionText: 'The iPhone was created by which company?',
      answerOptions: [
        { answerText: 'Apple', isCorrect: true },
        { answerText: 'Intel', isCorrect: false },
        { answerText: 'Amazon', isCorrect: false },
        { answerText: 'Microsoft', isCorrect: false },
      ],
    },
    {
      questionText: 'How many Harry Potter books are there?',
      answerOptions: [
        { answerText: '1', isCorrect: false },
        { answerText: '4', isCorrect: false },
        { answerText: '6', isCorrect: false },
        { answerText: '7', isCorrect: true },
      ],
    },
  ];

  const handleMouseEnter = (index) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = true;
    setButtonStates(newButtonStates);
  };

  const handleMouseLeave = (index) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = false;
    setButtonStates(newButtonStates);
  };

  const buttonStyle = (index) => ({
    border: buttonStates[index] ? '4px solid #424769' : '4px solid #7077A1',
    backgroundColor: buttonStates[index] ? '#7077A1' : '#424769',
    transition: 'background-color 0.3s',
    borderRadius: '27px',
  });

  return (
    <div>
      <Container className="" style={{ width: '100vh' }}>
        <Row
          className='d-flex justify-content-center align-items-center'
          style={{
            height: 'auto',
            backgroundColor: '#2D3250',
            marginTop: '30vh',
            borderRadius: '10px',
            border: '1px solid green',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
          }}
        >
          {quizPhase==="welcome" &&(
            <Col className="text-center m-3">
            <h1 className="text-white">Welcome to the Quiz!</h1>
            <p className="text-white">Get ready to test your knowledge.</p>
            <Button variant="success" onClick={handleStartQuiz}>
              Start Quiz
            </Button>
          </Col>
          )}
          {quizPhase === "quiz" && currentQuestion < questions.length &&  (
            <>
              <Col className="text-right m-3">
                <h2 className="text-white" style={{ marginBottom: '30px' }}>
                  Question {currentQuestion+1}/<sub className="text-light ">{questions.length}</sub>
                </h2>
                <h4 className=' text-white ' style={{ marginBottom: '130px', marginLeft: '25px' }}>
                  {questions[currentQuestion].questionText}
                </h4>
              </Col>
              <Col>
                <div className="m-4">
                  <Stack gap={3}>
                    {questions[currentQuestion].answerOptions.map((answeroption, index) => (
                      <Button
                        key={answeroption.answerText}
                        style={buttonStyle(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                        onClick={()=>handleAnsweronButtonClick(answeroption.isCorrect)}
                      >
                        {answeroption.answerText}
                      </Button>
                    ))}
                  </Stack>
                </div>
              </Col>
            </>
          ) }
          {quizPhase === "completed" && (
            <div style={{height:'40vh'}}>
              
            <div  className="text-white d-flex  justify-content-center mt-5" >
              <h1>Your Score is {score} out of {questions.length}</h1>
              
            </div>
            <div className="text-white d-flex  justify-content-center mt-5" >
              <Stack direction="horizontal" gap={5}>
              <Button className="" variant="primary" onClick={handlereattemptquiz}>
              Re-Attempt
              </Button>
              <Button variant="danger" onClick={handleQuitQuiz}>
                 Quit Quiz
              </Button>
              </Stack>
            </div>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}


export default App;

import React, {useState, useEffect}from "react";
import QuestionItem from "./QuestionItem";

export default function QuestionList() {
  const [questions, setQuestions] = useState([])
// When the application loads, get all the questions from server
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(resp => resp.json())
    .then(data => setQuestions(data))
  }, []);

// handle update
function updateRequest (id, correctIndex){
  fetch("http://localhost:4000/questions" ,{
    method: "PATCH",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({"correct-index": correctIndex})
  })
  .then(resp => resp.json())
  .then(data => {
    const newQuestions = questions.map((question) =>{
      if (question.id === data.id) {
        return data;
      }
      return question
    })
    return setQuestions(newQuestions);
  })
}

// handle delete
  function deleteQuestion(id){
    fetch("http://localhost:4000/questions", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => resp.json())
    .then(() => {
      const newQuestions = questions.filter((question) => question.id !==id)
      setQuestions(...questions, newQuestions);
    })

  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      {/* Questions loads */}
      <ul>{questions.map((question) => {
        return(
          <QuestionItem 
          question={question}
          key={question.id}
          deleteRequest={deleteQuestion}
          updateAnswer={updateRequest}
          />
        )
      })}</ul>
    </section>
  );
}


import './index.css'

const AssessmentDetails = props => {
  const {
    noOfQuestionSelected,
    questionNumber,
    questions,
    displayQuestion,
    onSubmit,
    total,
  } = props
  const noOfQuestionNotAns = total - noOfQuestionSelected
  const onClickSubmit = () => {
    onSubmit()
  }
  return (
    <>
      <div className="questions-attemp">
        <div className="ans-con">
          <button className="answered-question">
            <p>{noOfQuestionSelected}</p>
          </button>
          <p className="para">Answered Questions</p>
        </div>
        <div className="unans-con">
          <button className="unanswered-question">
            <p>{noOfQuestionNotAns}</p>
          </button>
          <p className="para">Unanswered Questions</p>
        </div>
      </div>
      <hr />
      <h1 className="question-heading">Questions ({total})</h1>
      <ul className="unordered-question-numbers">
        {questions.map((item, index) => (
          <li>
            <button
              type="button"
              className="btn-num"
              key={item.id}
              onClick={() => displayQuestion(index)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
      <div className="submit-con">
        <button className="submit-asses-btn" onClick={onClickSubmit}>
          Submit Assessment
        </button>
      </div>
    </>
  )
}

export default AssessmentDetails

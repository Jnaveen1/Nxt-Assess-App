import './index.css'

const AssessmentDetails = props => {
  const {
    noOfQuestionSelected,
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
          <p className="answered-question">{noOfQuestionSelected}</p>
          <p className="para">Answered Questions</p>
        </div>
        <div className="unans-con">
          <p className="unanswered-question">{noOfQuestionNotAns}</p>
          <p className="para">Unanswered Questions</p>
        </div>
      </div>
      <hr />
      <h1 className="question-heading">Questions ({total})</h1>
      <ul className="unordered-question-numbers">
        {questions.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              className="btn-num"
              onClick={() => displayQuestion(index)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
      <div className="submit-con">
        <button
          type="submit"
          className="submit-asses-btn"
          onClick={onClickSubmit}
        >
          Submit Assessment
        </button>
      </div>
    </>
  )
}

export default AssessmentDetails

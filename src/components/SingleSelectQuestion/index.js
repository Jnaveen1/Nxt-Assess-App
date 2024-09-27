import './index.css'

const SingleSelectQuestion = props => {
  const {clickNext, questionNumber, question, handleOptionSelect} = props
  const {id, questionText, option, optionsType} = question
  const onClickNextBtn = () => {
    clickNext(id)
  }
  return (
    <div className="question-container">
      <p className="question">
        {questionNumber + 1}.{questionText}
      </p>
      <hr className="horiz-line" />
      <select
        value={option.length > 0 ? option[0].id : ''}
        onChange={event => handleOptionSelect(question.id, event.target.value)}
        className="select-option"
      >
        {option.map(eachOption => (
          <option key={eachOption.id} value={eachOption.id} className="option">
            {eachOption.text}
          </option>
        ))}
      </select>
      <p>First option is selected by default</p>
      {questionNumber + 1 !== 10 ? (
        <button onClick={onClickNextBtn} className="next-btn">
          Next Question
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default SingleSelectQuestion

import './index.css'

const DefaultQuestion = props => {
  const {
    clickNext,
    questionNumber,
    question,
    handleOptionSelect,
    optionIds,
  } = props
  console.log(optionIds)

  const {id, questionText, option} = question
  const onClickNextBtn = () => {
    clickNext(id)
  }
  return (
    <div className="question-container">
      <p className="question">
        {questionNumber + 1}.{questionText}
      </p>
      <hr className="horiz-line" />
      <ul className="unordered-option-con">
        {option.map(eachOption => {
          const isSelect = optionIds.includes(eachOption.id)
          const classNameOptionSelect = isSelect
            ? 'selected-option'
            : 'option-btn'
          return (
            <li className="option-con">
              <button
                id={eachOption.id}
                onClick={() => handleOptionSelect(question.id, eachOption.id)}
                className={classNameOptionSelect}
              >
                {eachOption.text}
              </button>
            </li>
          )
        })}
      </ul>
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

export default DefaultQuestion

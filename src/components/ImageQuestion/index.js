import './index.css'

const ImageQuestion = props => {
  const {
    clickNext,
    questionNumber,
    question,
    handleOptionSelect,
    optionIds,
  } = props
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
      <ul className="unordered-option-con">
        {option.map(eachOption => {
          const isSelect = optionIds.includes(eachOption.id)
          console.log(eachOption.imageUrl)
          const classNameOptionSelect = isSelect
            ? 'selected-option'
            : 'option-btn'
          return (
            <li className="option-con">
              <button
                id={eachOption.id}
                onClick={() => handleOptionSelect(question.id, eachOption.id)}
              >
                <img
                  src={eachOption.imageUrl}
                  alt={eachOption.text}
                  className={classNameOptionSelect}
                />
              </button>
            </li>
          )
        })}
      </ul>
      <button onClick={onClickNextBtn} className="next-btn">
        Next Question
      </button>
    </div>
  )
}

export default ImageQuestion

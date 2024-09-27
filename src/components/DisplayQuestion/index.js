import './index.css'
import {Component} from 'react'

class DisplayQuestion extends Component {
  // const {eachQuestion} = this.props
  // const {id, optionsType, questionText, option} = eachQuestion
  // console.log(option)
  state = {
    optionType: '',
  }

  renderImageOption = (eachQuestion, nextQuestion) => <div />

  clikcEvent = nextQuestion => {
    nextQuestion()
  }

  renderDefaultOption = (eachQuestion, nextQuestion) => {
    const {option} = eachQuestion
    return (
      <ul className="optionsUnorderedList">
        {option.map(eachOption => (
          <li>
            <button className="option-btn">{eachOption.text}</button>
          </li>
        ))}
      </ul>
    )
  }

  renderSingleSelect = (eachQuestion, nextQuestion) => {
    const {option} = eachQuestion
    return (
      <select className="optionsUnorderedList">
        {option.map(eachOption => (
          <option>{eachOption.text}</option>
        ))}
      </select>
    )
  }

  renderOption = (eachQuestion, nextQuestion) => {
    // console.log('ma')
    // console.log(eachQuestion)
    switch (eachQuestion.optionsType) {
      case 'IMAGE':
        return this.renderImageOption(eachQuestion, nextQuestion)
      case 'DEFAULT':
        return this.renderDefaultOption(eachQuestion, nextQuestion)
      case 'SINGLE_SELECT':
        return this.renderSingleSelect(eachQuestion, nextQuestion)
      default:
        return null
    }
    // return <h1>{eachQuestion.optionsType}</h1>
  }

  render() {
    const {eachQuestion, nextQuestion} = this.props
    console.log(eachQuestion)
    // const {id, optionsType, questionText, option} = eachQuestion
    // console.log(option)
    return (
      <div className="assessment-sub-con">
        <div className="question-container">
          <h1 className="question">{eachQuestion.questionText}</h1>
          <hr />
          {this.renderOption(eachQuestion, nextQuestion)}
          <button onClick={this.clikcEvent(nextQuestion)}>Next Question</button>
        </div>
      </div>
    )
  }
}
// const DisplayQuestion = props => {
//   const {eachQuestion} = this.props
//   const {id, optionsType, questionText, option} = eachQuestion
//   return (
//     <div>
//       <h1>{questionText}</h1>
//     </div>
//   )
// }
export default DisplayQuestion

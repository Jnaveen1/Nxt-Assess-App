import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import AssessmentDetails from '../AssessmentDetails'

import DefaultQuestion from '../DefaultQuestion'
import ImageQuestion from '../ImageQuestion'
import SingleSelectQuestion from '../SingleSelectQuestion'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: ' SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Assessment extends Component {
  state = {
    timeLeft: 600,
    apiStatus: apiStatusConstants.initial,
    questions: [],
    questionNumber: 0,
    userAnswers: [],
    total: 0,
  }

  componentDidMount() {
    this.startTime()
    this.renderAssessment()
  }

  endAssessment = () => {
    const {timeLeft, questions, userAnswers} = this.state
    let result = 0
    questions.forEach(eachQuestion => {
      const correctOption = eachQuestion.option.find(
        eachOption => eachOption.isCorrect === 'true',
      )
      if (userAnswers[eachQuestion.id] === correctOption.id) {
        result += 1
      }
    })
    clearInterval(this.timerFun)
    const {history} = this.props
    history.replace('/results', {timeLeft, result, timeUp: true})
  }

  onSubmit = () => {
    const {timeLeft, questions, userAnswers} = this.state

    let result = 0
    questions.forEach(eachQuestion => {
      const correctOption = eachQuestion.option.find(
        eachOption => eachOption.isCorrect === 'true',
      )
      if (userAnswers[eachQuestion.id] === correctOption.id) {
        result += 1
      }
    })
    clearInterval(this.timerFun)
    const {history} = this.props
    history.replace('/results', {timeLeft, result, timeUp: false})
  }

  startTime = () => {
    this.timerFun = setInterval(() => {
      const {timeLeft} = this.state
      if (timeLeft > 0) {
        this.setState(prevState => ({
          timeLeft: prevState.timeLeft - 1,
        }))
      } else {
        clearInterval(this.timer)
        this.endAssessment()
      }
    }, 1000)
  }

  renderAssessment = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const jwtToken = Cookies.get('jwtToken')
    const url = 'https://apis.ccbp.in/assess/questions'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const {questions} = data
    const {total} = data
    if (response.ok) {
      const updatedQuestion = questions.map(eachQuestion => ({
        id: eachQuestion.id,
        optionsType: eachQuestion.options_type,
        questionText: eachQuestion.question_text,
        option: eachQuestion.options.map(eachOption => ({
          id: eachOption.id,
          isCorrect: eachOption.is_correct,
          text: eachOption.text,
          imageUrl: eachOption.image_url,
        })),
      }))
      this.setState({
        total,
        questions: updatedQuestion,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedQuestion)
    } else {
      console.log('fail')
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-con">
      <img
        src="https://res.cloudinary.com/dmsebahwn/image/upload/v1727029463/Group_7519_vzhkwl.png"
        className="fail-img"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.renderAssessment}
      >
        Retry
      </button>
    </div>
  )

  displayQuestion = index => {
    this.setState({questionNumber: index})
  }

  clickNext = id => {
    const {questions} = this.state
    const currentQuestionIndex = questions.findIndex(
      eachQuestion => eachQuestion.id === id,
    )
    if (currentQuestionIndex === 9) {
      this.setState({questionNumber: 0})
    } else {
      this.setState({questionNumber: currentQuestionIndex + 1})
    }
  }

  handleOptionSelect = (questionId, optionId) => {
    this.setState(prevState => ({
      userAnswers: {
        ...prevState.userAnswers,
        [questionId]: optionId,
      },
    }))
  }

  renderSuccesView = () => {
    const {questionNumber, questions, timeLeft, userAnswers, total} = this.state
    const noOfQuestionSelected = Object.keys(userAnswers).length
    const optionIds = Object.values(userAnswers)
    const minutes = Math.floor(timeLeft / 60)
    const seconds = Math.floor(timeLeft % 60)
    const formattedTime = `00:${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`
    return (
      <div className="assess-sub-con">
        <div className="questions-con">
          {questions[questionNumber].optionsType === 'DEFAULT' && (
            <DefaultQuestion
              clickNext={this.clickNext}
              questionNumber={questionNumber}
              question={questions[questionNumber]}
              onSubmit={this.onSubmit}
              handleOptionSelect={this.handleOptionSelect}
              optionIds={optionIds}
            />
          )}
          {questions[questionNumber].optionsType === 'IMAGE' && (
            <ImageQuestion
              questionNumber={questionNumber}
              question={questions[questionNumber]}
              clickNext={this.clickNext}
              onSubmit={this.onSubmit}
              handleOptionSelect={this.handleOptionSelect}
              optionIds={optionIds}
            />
          )}
          {questions[questionNumber].optionsType === 'SINGLE_SELECT' && (
            <SingleSelectQuestion
              clickNext={this.clickNext}
              questionNumber={questionNumber}
              question={questions[questionNumber]}
              onSubmit={this.onSubmit}
              handleOptionSelect={this.handleOptionSelect}
            />
          )}
        </div>
        <div className="timer-main-con">
          <div className="timer-header-con">
            <p className="timer-heading">Time Left</p>
            <p className="running-time">{formattedTime}</p>
          </div>
          <AssessmentDetails
            noOfQuestionSelected={noOfQuestionSelected}
            questionNumber={questionNumber}
            questions={questions}
            displayQuestion={this.displayQuestion}
            onSubmit={this.onSubmit}
            total={total}
          />
        </div>
      </div>
    )
  }

  renderProgress = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccesView()
      case apiStatusConstants.progress:
        return this.renderProgress()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="assessment-main-con">
        <>
          <Header />
        </>

        {this.renderApiStatus()}
      </div>
    )
  }
}

export default Assessment

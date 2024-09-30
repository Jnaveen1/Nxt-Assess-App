import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Result = ({location: {state: {timeLeft, result, timeUp} = {}}}) => {
  console.log(timeLeft)
  const spentTime = 600 - timeLeft
  const minutes = Math.floor(spentTime / 60)
  const seconds = Math.floor(spentTime % 60)
  const formattedTime = `00:${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`
  console.log(formattedTime)

  return (
    <div className="home-main-container">
      <Header />
      <div className="sub-con">
        {!timeUp && (
          <div className="result-con">
            <img
              src="https://res.cloudinary.com/dmsebahwn/image/upload/v1727171411/Asset_2_1_mrzqq4.png"
              className="result-img"
              alt="submit"
            />
            <h1 className="greets">Congrats! You completed the assessment</h1>
            <p className="time-head">
              Time Taken: <span className="time">{formattedTime}</span>
            </p>
            <p className="score">Your score: {result}</p>
            <Link to="/assessment">
              <button type="button" className="assessment-btn">
                Reattempt
              </button>
            </Link>
          </div>
        )}
        {timeUp && (
          <div className="result-con">
            <img
              src="https://res.cloudinary.com/dky69roxl/image/upload/v1705568376/calender_1_1_ebt1h1.png"
              className="result-img"
              alt="time up"
            />
            <h1 className="timeup">Time is up!</h1>
            <p className="result-para">
              You did not complete the assessment within the time
            </p>
            <p className="score">Your score: {result}</p>
            <Link to="/assessment">
              <button type="button" className="assessment-btn">
                Reattempt
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Result

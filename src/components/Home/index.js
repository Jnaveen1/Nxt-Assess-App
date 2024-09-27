import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-main-container">
        <Header />
        <div className="sub-con">
          <div className="sub-con1">
            <h1 className="instruction-heading">Instructions</h1>
            <ol className="unordered-list">
              <li>Total Questions: 10</li>
              <li>Types of Questions: MCQs</li>
              <li>Duration: 10 Mins</li>
              <li>Marking Scheme: Every Correct response, get 1 mark</li>
              <li>
                All the Progress will be lost, if you reload during the
                assessment
              </li>
            </ol>
            <Link to="/assessment">
              <button className="assessment-btn">Start Assessment</button>
            </Link>
          </div>
          <div className="sub-con2">
            <img
              src="https://res.cloudinary.com/dmsebahwn/image/upload/v1727022044/Group_dctylk.png"
              className="instruction-img"
              alt="assessment"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Home

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShowPassword: false,
    errorMsg: false,
  }

  renderSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const url = 'https://apis.ccbp.in/login'

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data.jwt_token)
    if (response.ok) {
      console.log('success')
      this.renderSuccess(data.jwt_token)
      this.setState({errorMsg: false})
    } else {
      console.log('fail')
      this.setState({errorMsg: true})
    }
  }

  changeShowStatus = () => {
    console.log('nav')
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isShowPassword, errorMsg} = this.state
    const passwordType = !isShowPassword ? 'password' : 'text'
    const error = errorMsg ? 'Please Enter Valid Username ans Password' : ''
    console.log(passwordType)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-container">
        <div className="sub-container">
          <img
            src="https://res.cloudinary.com/dmsebahwn/image/upload/v1726768735/mnc4rjcmcff6he5aythx.png"
            className="logo"
            alt="login website logo"
          />
          <form onSubmit={this.submitForm} className="form-container">
            <label htmlFor="userName" className="label">
              USERNAME
            </label>
            <br />
            <input
              id="userName"
              className="input"
              type="text"
              placeholder="username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <br />
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              id="password"
              className="input"
              type={passwordType}
              placeholder="password"
              value={password}
              onChange={this.onChangePassword}
            />
            <input
              type="checkbox"
              onChange={this.changeShowStatus}
              id="checkbox"
            />
            <label htmlFor="checkbox">Show Password</label>
            <button className="button" type="submit">
              Login
            </button>
            <p className="error">{error}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login

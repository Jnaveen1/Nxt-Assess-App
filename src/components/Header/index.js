import './index.css'
import {Redirect, withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const logoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    console.log('removed')
    history.replace('/login')
  }

  return (
    <div className="header-con">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dmsebahwn/image/upload/v1727010845/Group_8004_wwaext.png"
          className="header-logo"
          alt="website logo"
        />
      </Link>
      <button type="button" className="logout-btn" onClick={logoutBtn}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)

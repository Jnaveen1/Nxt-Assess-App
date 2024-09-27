import './index.css'

const NotFound = () => (
  <div className="not-found-main-container">
    <img
      src="https://res.cloudinary.com/dmsebahwn/image/upload/v1727006903/Group_7504_camacn.png"
      className="not-found-img"
      data-testid="notFound"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p>We are sorry, the page you requested could not be found</p>
  </div>
)

export default NotFound

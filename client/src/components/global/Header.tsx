import { Link } from 'react-router-dom'
import Menu from './Menu'

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light p-3"
      style={{ position: 'sticky', top: 0, left: 0, zIndex: 9 }}
    >

      <Link className="navbar-brand" to="/"><b>Pedia<span style={{ color: '#00e600' }}>Geek</span></b></Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse  navbar-collapse" id="navbarNav">
        <br />
        <Menu />
      </div>
    </nav>
  )
}

export default Header

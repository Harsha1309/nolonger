import { Link } from 'react-router-dom'
import Menu from './Menu'
import Search from './Search'

const Header = () => {
  return (

    <>
      <nav className="navbar navbar-expand navbar-light bg-light p-3"
        style={{ position: 'sticky', top: 0, left: 0, zIndex: 9 }}
      >
        <Link className="navbar-brand" to="/"><b>Pedia<span style={{ color: '#00e600' }}>Geek</span></b></Link>
{/* 
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}
       <div className="w-100"></div>
        <div id="navbarNav">
          <Menu />
        </div>
      </nav>
      < div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel1" aria-hidden="true" >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel1">Search For Blogs</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Search />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header

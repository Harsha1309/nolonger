import { Link } from 'react-router-dom'
import Menu from './Menu'
import Search from './Search'
import Notification from '../profile/Notification'
import GooglePrompt from '../auth/GooglePrompt'
import DarkMode from './DarkMode'
const Header = () => {

  let mode=localStorage.getItem('theme');
  
  return (

    <>
      <nav className={`navbar navbar-expand navbar-${mode==='light'?'dark':'light'} bg-${mode==='light'?'dark':'light'} p-3`}
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
        <DarkMode/>
        <hr />
        {/* {<i className={`fas fa-${mode==='light'?'sun':'moon'}` } style={{fontSize:'1.5rem', cursor:'pointer',color: mode==='light'?'darkorange':'yellow',padding:'3px',}} onClick={props.toggleMode} ></i> } */}
        {/* { <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'}`}>
                        <input className="form-check-input my-3" onClick={props.toggleMode} type="checkbox" id="flexSwitchCheckDefault"/>
                        <label className="form-check-label small mx-1" htmlFor="flexSwitchCheckDefault">{props.btnText}</label>
                    </div> } */}
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
      
      <Notification />
      <GooglePrompt />
    </>
  )
}

export default Header

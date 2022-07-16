import { Link, useHistory, useLocation } from 'react-router-dom'
import { useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/TypeScript'
import { logout } from '../../redux/actions/authAction'
import { notificationRead } from '../../redux/actions/notificationAction'
import { handledarkMode } from "../../redux/actions/DarkModeAction";

const Menu = () => {
  const { auth, notification,darkMode } = useSelector((state: RootStore) => state)
  const {isdarkMode}=darkMode;

const [btnTxt, setbtnTxt] = useState()
  const dispatch = useDispatch()
  const switchDarkMode = () => {
    isdarkMode
      ? dispatch(handledarkMode(false))
      : dispatch(handledarkMode(true));
      
  };
  useEffect(() => {
    document.body.style.backgroundColor = isdarkMode ? "#181818" : "#fff";
    
  }, [isdarkMode]);
  const history = useHistory();
  const { pathname } = useLocation()
  let url = history.location.pathname;
  url = url.substring(1);
  const bfLoginLinks = [
    { label: 'Login', class: 'fas fa-sign-in-alt fa-lg', path: `/login?${url}` },
    { label: 'Register', class: 'fas fa-user-plus fa-lg', path: `/register?${url}` }
  ]

  const afLoginLinks = [
    { label: 'Create', class: 'fas fa-edit fa-lg', path: '/create_blog' }
  ]

  const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks

  const isActive = (pn: string) => {
    if (pn === pathname) return 'active';
  }

  const handleLogout = () => {
    if (!auth.access_token) return;
    dispatch(logout(auth.access_token))
  }
  const Read = () => {
    dispatch(notificationRead(auth))
  }

  return (
    <>

      <ul className="navbar-nav ms-auto ml-1 w-100">
      <li className='nav-item' style={{ cursor: 'pointer' }}>
          <span className='nav-link' >
          <i className={`fas fa-${isdarkMode ? 'moon' : 'sun'} `} style={{ fontSize: '1.5rem', cursor: 'pointer', color: isdarkMode ? 'yellow' : 'darkorange',  }} onClick={switchDarkMode} ></i>
          </span>
        </li>

        <li className='nav-item' style={{ cursor: 'pointer' }}>
          <span className='nav-link' >
          <div className={`btn text-${isdarkMode ? 'white' : 'black'} bg-${isdarkMode?'dark':'light'}`} data-bs-toggle="modal" data-bs-target="#referalmodal" style={{ cursor: "pointer",marginTop:"-10px",marginLeft:"-10px",marginRight:"-10px"}}> <img src="Refer.png"  alt=""  style={{height:"3vh",filter:isdarkMode?'invert(1)':'none'}}/></div>
          </span>
        </li>

        {
          navLinks.map((link, index) => (
            <li key={index} className={`nav-item ${isActive(link.path)}`}>
              <Link className="nav-link" to={link.path}><i className={`${link.class}`} data-bs-toggle="tooltip" data-bs-placement="bottom" title={link.label}></i></Link>
            </li>
          ))
        }
        <li className='nav-item' style={{ cursor: 'pointer' }}>
          <span className='nav-link' data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
            <i className="fas fa-search fa-lg"></i>
          </span>
        </li>
        {
          auth.user &&
          <li className="nav-item dropdown text-cenetr" style={{ cursor: 'pointer' }}  >
            <span className="nav-link" data-bs-toggle="modal" data-bs-target="#modalPush" onClick={Read}>
              <i className="fas fa-bell fa-lg position-relative" >
                {notification.new && <span className="position-absolute top-0 start-100 translate-middle p-2 bg-primary border border-light rounded-circle">
                  <span className="visually-hidden">New alerts</span>
                </span>}
              </i>

            </span>
          </li>
        }
        {
          auth.user ?
            <li className="nav-item dropdown text-cenetr">
              <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={auth.user.avatar} alt="avatar" className="avatar" />
              </span>

              <ul className={` dropdown-menu dropdown-menu-end my-3 bg-${isdarkMode?'dark':'light'} text-${isdarkMode?'white':'black'}`} aria-labelledby="navbarDropdown" style={{zIndex:8}}>


                <li>
                  <Link className={`dropdown-item text-${isdarkMode?'white':'black'}`} to="/about_us">
                    About PediaGeek
                  </Link>
                </li><li><hr className="dropdown-divider" /></li>

                <li>
                  <Link className={`dropdown-item text-${isdarkMode?'white':'black'}`} to="/privacy_policy">
                    Privacy Policy
                  </Link>
                </li><li><hr className="dropdown-divider" /></li>

                <li>
                  <Link className={`dropdown-item text-${isdarkMode?'white':'black'}`} to="/disclaimer">
                    Disclaimer
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className={`dropdown-item text-${isdarkMode?'white':'black'}`}
                    to={`/profile/${auth.user._id}`}
                  >
                    Profile
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className={`dropdown-item text-${isdarkMode?'white':'black'}`} to="/"
                    onClick={handleLogout}>
                    Logout
                  </Link>
                </li>

              </ul>
            </li> :
            <li className="nav-item dropdown text-cenetr">
              <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="navbar-toggler-icon"></span>
              </span>

              <ul className="dropdown-menu dropdown-menu-end my-3" aria-labelledby="navbarDropdown" style={{ marginTop: 100 }}>
                <li>
                  <Link className="dropdown-item" to="#">

                  </Link>
                </li><li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/about_us">
                    About PediaGeek
                  </Link>
                </li><li><hr className="dropdown-divider" /></li>

                <li>
                  <Link className="dropdown-item" to="/privacy_policy">
                    Privacy Policy
                  </Link>
                </li><li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/disclaimer">
                    Disclaimer
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Home
                  </Link>
                </li>
              </ul>
            </li>


        }
      </ul >
    </>
  )
}

export default Menu



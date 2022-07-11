import { Link, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/TypeScript'
import { logout } from '../../redux/actions/authAction'
import { notificationRead } from '../../redux/actions/notificationAction'

const Menu = () => {
  const { auth, notification } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
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

              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item"
                    to={`/profile/${auth.user._id}`}
                  >
                    Profile
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>

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
                  <Link className="dropdown-item" to="/"
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

              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/">
                    Home
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

              </ul>
            </li>


        }
      </ul >
    </>
  )
}

export default Menu



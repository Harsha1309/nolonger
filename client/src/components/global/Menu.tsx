import { Link, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/TypeScript'
import { logout } from '../../redux/actions/authAction'
import Search from './Search'

const Menu = () => {
  const { auth } = useSelector((state: RootStore) => state)
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
    { label: 'Home', class: 'fas fa-home fa-lg', path: '/' },
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


  return (
    <ul className="navbar-nav ms-auto ml-3 w-100">

      <Search />
      <li className='nav-item'>
        <i className="fas fa-search fa-lg"></i>
      </li>

      {
        navLinks.map((link, index) => (
          <li key={index} className={`nav-item ${isActive(link.path)}`}>
            <Link className="nav-link" to={link.path}><i className={`${link.class}`}></i></Link>
          </li>
        ))
      }


      {
        auth.user &&
        <li className="nav-item dropdown text-cenetr" style={{ cursor: 'pointer' }}  >
          <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fas fa-bell fa-lg"></i>
          </span>
          <ul className="dropdown-menu text-ceneter" aria-labelledby="navbarDropdown">
            <li>
              {' '}No Notifications.
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
            </li>
          </ul>
        </li>
      }
      {
        auth.user &&
        <li className="nav-item dropdown text-cenetr">
          <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={auth.user.avatar} alt="avatar" className="avatar" style={{ objectFit: "cover" }} />
          </span>


          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <Link className="dropdown-item"
                to={`/profile/${auth.user._id}`}
              >
                Profile
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
        </li>
      }

    </ul >

  )
}

export default Menu


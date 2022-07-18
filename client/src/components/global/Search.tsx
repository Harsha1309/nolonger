import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { getAPI } from '../../utils/FetchData'
import { IBlog, ICategory, IUser } from '../../utils/TypeScript'
import CardHoriz from '../cards/CardHoriz'

import SearchCard from '../cards/searchCard'
import Follow from '../profile/Follow'
import Onlytick from '../profile/Onlytick'
import Loading from './Loading'

const Search = () => {
  const [search, setSearch] = useState('')
  const [blogs, setBlogs] = useState<IBlog[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [users, setUsers] = useState<IUser[]>([])
  const { pathname } = useLocation()

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.length < 2) return setBlogs([]);

      try {
        const rescat = await getAPI(`search/category?title=${search}`)
        if (rescat.status === 200 || rescat.status === 304)
          setCategories(rescat.data)
        else setCategories([])
      } catch (err) {
        console.log(err)
      }
    }, 1000)

    return () => clearTimeout(delayDebounce)
  }, [search])
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.length < 2) return setBlogs([]);

      try {
        const resuser = await getAPI(`search/user?title=${search}`)
        if (resuser.status === 200 || resuser.status === 304)
          setUsers(resuser.data)
        else setUsers([])
      } catch (err) {
        console.log(err)
      }
    }, 1000)

    return () => clearTimeout(delayDebounce)
  }, [search])

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.length < 2) return setBlogs([]);

      try {
        const resblog = await getAPI(`search/blogs?title=${search}`)
        if (resblog.status === 200 || resblog.status === 304)
          setBlogs(resblog.data)
        else setBlogs([])
      } catch (err) {
        console.log(err)
      }
    }, 1000)

    return () => clearTimeout(delayDebounce)
  }, [search])

  useEffect(() => {
    setSearch('')
    setBlogs([])
    setCategories([])
    setUsers([])
    $("#searchclose").trigger('click');
  }, [pathname])



  return (


    <div className="search w-100 position-relative me-4"  >
      <input type="text" className="form-control me-2"
        value={search} placeholder="Enter your search..."
        onChange={e => setSearch(e.target.value)} aria-label="Search" id='searchbox' />


      <nav>
        <div className="nav nav-pills nav-fill mt-2 mb-1" id="nav-tab" role="tablist">
          <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">All</button>
          <button className="nav-link" id="nav-drafts-tab" data-bs-toggle="tab" data-bs-target="#nav-drafts" type="button" role="tab" aria-controls="nav-drafts " aria-selected="false">Blogs</button>
          <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Accounts</button>
          <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Categories</button>
        </div>
      </nav>
      {
        search.length >= 2 &&

        <>
          <div className="tab-content my-3 position-relative pt-2 px-1 w-100 rounded mt-2" id="nav-tabContent"
            style={{
              background: '#eee', zIndex: 10,
              height: 'calc(100vh - 200px)',
              overflow: 'scroll'
            }}>
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex={0}>
              <div className="row">

                <div className="col-sm-6 my-2">
                  <div className='m-2'>
                    {categories.slice(0, 4).map((category, index) => (
                      <Link to={`/blogs/${category.name}`} key={index}
                        className={`btn btn-tag rounded-pill mx-1 px-2`} >
                        {category.name}</Link>
                    ))
                    }</div>


                  {
                    users.length
                      ?
                      <div className='m-2 rounded bg-light p-2'>
                        {users.slice(0, 2).map((user, index) => (
                          <div className="pr-1">
                            <div className="d-flex flex-row justify-content-between align-items-center ">
                              <Link to={`/profile/${user._id}`} className="text-decoration-none">
                                <div className="d-flex flex-row align-items-center"><img className="rounded-circle" src={user.avatar} width="55" height="55" />
                                  <div className="d-flex flex-column align-items-start ml-2"><span className="font-weight-bold mx-2">{user.name}<Onlytick role={user.role} /></span><span className={`followers mx-2`}>{user.follower.length} Followers</span></div>
                                </div>
                              </Link>
                              <div className="d-flex flex-row align-items-center mt-2"><Follow user={user} /></div>
                            </div>
                            <hr />
                          </div>))}
                      </div>
                      : <>
                      </>

                  }

                </div>
                <div className="col-sm-6">
                  {
                    blogs.length
                      ?
                      blogs.slice(0, 4).map((blog, index) => (
                        <SearchCard key={index} blog={blog} />
                      )) : ""

                  }</div>
              </div>
            </div>
            <div className="tab-pane fade" id="nav-drafts" role="tabpanel" aria-labelledby="nav-drafts-tab" tabIndex={0}>
              {
                blogs.length
                  ?
                  blogs.map(blog => (
                    <CardHoriz key={blog._id} blog={blog} />
                  ))
                  : <div className='my-3 text-center'><Loading />
                    <h3>
                      No Matching Blogs for this search.
                    </h3>
                  </div>
              }
            </div>
            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex={0}>
              <div className="row">
                {
                  users.length
                    ?
                    users.slice(0, 2).map((user, index) => (
                      <div className="pr-1 px-md-3 col-md-6">
                        <div className="d-flex flex-row justify-content-between align-items-center ">
                          <Link to={`/profile/${user._id}`} className="text-decoration-none">
                            <div className="d-flex flex-row align-items-center"><img className="rounded-circle" src={user.avatar} width="55" height="55" />
                              <div className="d-flex flex-column align-items-start ml-2"><span className="font-weight-bold mx-2">{user.name}<Onlytick role={user.role} /></span><span className={`followers mx-2`}>{user.follower.length} Followers</span></div>
                            </div>
                          </Link>
                          <div className="d-flex flex-row align-items-center mt-2"><Follow user={user} /></div>
                        </div>
                        <hr />
                      </div>
                    )) : <div className='my-3 text-center'><Loading />
                      <h3>
                        No Matching Users for this search.
                      </h3>
                    </div>
                }
              </div>
            </div>
            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex={0}>
              {categories.length ? categories.map((category, index) => (
                <Link to={`/blogs/${category.name}`} key={index}
                  className={`btn btn-tag rounded-pill m-2 px-2 `} >
                  {category.name}</Link>
              )) : <div className='my-3 text-center'><Loading />
                <h3>
                  No Matching categories for this search.
                </h3>
              </div>
              }
            </div>
          </div>
        </>
      }
    </div>



  )
}

export default Search

import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { getAPI } from '../../utils/FetchData'
import { IBlog } from '../../utils/TypeScript'

import CardHoriz from '../cards/CardHoriz'

const Search = () => {
  const [search, setSearch] = useState('')
  const [blogs, setBlogs] = useState<IBlog[]>([])
  // const [cross, setCross] = useState('0')
  const { pathname } = useLocation()

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.length < 2) return setBlogs([]);

      try {
        const res = await getAPI(`search/blogs?title=${search}`)
        setBlogs(res.data)
      } catch (err) {
        console.log(err)
      }
    }, 400)

    return () => clearTimeout(delayDebounce)
  }, [search])


  useEffect(() => {
    setSearch('')
    setBlogs([])

  }, [pathname])



  return (


    <div className="search w-100 position-relative me-4"  >
      <input type="text" className="form-control me-2"
        value={search} placeholder="Enter your search..."
        onChange={e => setSearch(e.target.value)} aria-label="Search" id='searchbox' />

      {
        search.length >= 2 &&

        <>
          <nav>
            <div className="nav nav-pills nav-fill mt-2 mb-1" id="nav-tab" role="tablist">
              <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">All</button>
              <button className="nav-link" id="nav-drafts-tab" data-bs-toggle="tab" data-bs-target="#nav-drafts" type="button" role="tab" aria-controls="nav-drafts " aria-selected="false">Blogs</button>
              <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Accounts</button>
              <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Categories</button>
            </div>
          </nav>
          <div className="tab-content my-3 position-relative pt-2 px-1 w-100 rounded mt-2" id="nav-tabContent"
            style={{
              background: '#eee', zIndex: 10,
              maxHeight: 'calc(100vh - 100px)',
              overflow: 'auto'
            }}>
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex={0}>
              <div className="row">
                <div className="col-sm-6"> 
                {
                  blogs.length
                    ?
                    blogs.map(blog => (
                      <CardHoriz key={blog._id} blog={blog} />
                    ))
                    : <h3 className="text-center">No Blogs</h3>
                }</div>
                <div className="col-sm-6">
                  {blogs.length
                    ?
                    blogs.map(blog => (
                      <CardHoriz key={blog._id} blog={blog} />
                    ))
                    : <h3 className="text-center">No Blogs</h3>}
                </div>
              </div>





            </div>
            <div className="tab-pane fade" id="nav-drafts" role="tabpanel" aria-labelledby="nav-drafts-tab" tabIndex={0}>
              {
                blogs.length
                  ?
                  blogs.map(blog => (
                    <CardHoriz key={blog._id} blog={blog} />
                  ))
                  : <h3 className="text-center">No Blogs</h3>
              }
            </div>
            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex={0}>C</div>
            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex={0}>D</div>
          </div>
        </>
      }
    </div>



  )
}

export default Search

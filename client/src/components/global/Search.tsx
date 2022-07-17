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
        <div className="position-relative pt-2 px-1 w-100 rounded mt-2"
          style={{
            background: '#eee', zIndex: 10,
            maxHeight: 'calc(100vh - 100px)',
            overflow: 'auto'
          }}>

          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Active</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Much</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">Disabled</a>
            </li>
          </ul>
          {/* {
            blogs.length
              ?
              blogs.map(blog => (
                <CardHoriz key={blog._id} blog={blog} />
              ))
              : <h3 className="text-center">No Blogs</h3>
          } */}
        </div>
      }
    </div>



  )
}

export default Search

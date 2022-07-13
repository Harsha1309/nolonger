import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getBlogsByCategoryId } from '../../redux/actions/blogAction'

import { RootStore, IParams, IBlog } from '../../utils/TypeScript'

import Loading from '../../components/global/Loading'
import Pagination from '../../components/global/Pagination'
import CardVert from '../../components/cards/CardVert'
import Referal from '../../components/global/Referal'
import Helmetglobal from '../../components/global/Helmetglobal'



const BlogsByCategory = () => {
  const { categories, blogsCategory ,darkMode} = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const {isdarkMode}=darkMode;
  const { slug } = useParams<IParams>()
  const [categoryId, setCategoryId] = useState('')
  const [blogs, setBlogs] = useState<IBlog[]>()
  const [total, setTotal] = useState(0)

  const history = useHistory()
  const { search } = history.location;

  useEffect(() => {
    const category = categories.find(item => item.name === slug)
    if (category?._id) setCategoryId(category._id)
  }, [slug, categories])


  useEffect(() => {
    if (!categoryId) return;
    if (blogsCategory.every(item => item.id !== categoryId)) {
      dispatch(getBlogsByCategoryId(categoryId, search))
    } else {
      const data = blogsCategory.find(item => item.id === categoryId)
      if (!data) return;
      setBlogs(data.blogs)
      setTotal(data.total)

      if (data.search) history.push(data.search)
    }
  }, [categoryId, blogsCategory, dispatch, search, history])


  const handlePagination = (num: number) => {
    const search = `?page=${num}`
    dispatch(getBlogsByCategoryId(categoryId, search))
  }


  if (!blogs) return <Loading />;
  return (
    <div>
      <Helmetglobal title={`${slug} Blogs`} description={`Blogs from ${slug} category.`} keyword={slug} />

      <div className="example pt-1 px-2 mb-1 border border-start-0 border-end-0" style={{
        position: 'sticky',
        display: 'block',
        overflow: 'hidden',
        overflowX: 'scroll',
        touchAction: 'pan-y',
        whiteSpace: 'nowrap',
        zIndex: 9,
        top: 42,
        backgroundColor:isdarkMode?'#202020':'white'
      }}>
        <div className={`btn btn-tag btn-success rounded-pill mx-1 text-${isdarkMode?'white':'black'}`} data-bs-toggle="modal" data-bs-target="#referalmodal" style={{ cursor: "pointer",backgroundColor:isdarkMode?'#373737':'#e9e3e3' }}>Refer and Earn</div>
        <Link to={`/`} className={`btn btn-tag rounded-pill mx-1 px-2 text-${isdarkMode?'white':'black'}`} style={{backgroundColor:isdarkMode?'#373737':'#e9e3e3'}} >Home</Link>
        {categories.map((category, index) => (

          <Link to={`/blogs/${category.name}`} key={index}
            className={`btn ${slug === category.name ? "active-tag" : "btn-tag"}  text-${isdarkMode?'white':'black'} rounded-pill mx-1 px-2 ` } style={{backgroundColor:isdarkMode && slug !== category.name ?'#373737':''}} >
            {category.name}</Link>

        ))
        }
      
      </div>

      <div className="blogs_category">
        {blogs.length > 0 ? <><div className="show_blogs">
          {
            blogs.map(blog => (
              <CardVert key={blog._id} blog={blog} />
            ))
          }
        </div>

          {
            total > 1 &&
            <Pagination
              total={total}
              callback={handlePagination}
            />
          }
        </> : <div style={{ height: '80vh', paddingTop: '30vh' }}>
          <div className=' container text-center'>
            <h3 className={`my-3 F text-${isdarkMode?'white':'black'}`}>No Blogs</h3>
            <Link to="/create_blog">
              <button className={`btn btn-primary text-${isdarkMode?'white':'black'}`}>Create One</button></Link>
          </div>
        </div>
        }
      </div>
    </div>
  )
}

export default BlogsByCategory

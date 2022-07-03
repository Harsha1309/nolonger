import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootStore } from '../utils/TypeScript'

import CardVert from '../components/cards/CardVert'
import Loading from '../components/global/Loading'
import Referal from '../components/global/Referal'
import Helmetglobal from '../components/global/Helmetglobal'

const Home = () => {
  const { homeBlogs } = useSelector((state: RootStore) => state)
  if (homeBlogs.length === 0) return <Loading />;
  return (
    <div className="home_page">
      <Helmetglobal title="Home-PediaGeek" description="PediaGeek is the best way to express your idea to the World." keyword="Home,explore,blogs,social_media" />
    
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        <strong><i className="fas fa-check-circle"></i> Update! </strong> Introducing Draft Post feature in Pediageek ,Start writing from where you have left in previous session.
        <Link to="/create_blog" className="text-capitalize text-decoration-none"> Explore. </Link>
      
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <Referal />
      {
        homeBlogs.map(homeBlog => (
          <div key={homeBlog._id}>
            {
              homeBlog.count > 0 &&
              <>
                <h3>
                  <Link to={`/blogs/${(homeBlog.name).toLowerCase()}`}>
                    {homeBlog.name} <small>({homeBlog.count})</small>
                  </Link>
                </h3>
                <hr className="mt-1" />

                <div className="home_blogs">
                  {
                    homeBlog.blogs.map(blog => (
                      <CardVert key={blog._id} blog={blog} />
                    ))
                  }
                </div>
              </>
            }

            {
              homeBlog.count > 4 &&
              <Link className="text-end d-block mt-2 mb-3 
              text-decoration-none"
                to={`/blogs/${homeBlog.name}`}>
                Read more &gt;&gt;
              </Link>
            }
          </div>
        ))
      }
    </div>
  )
}

export default Home

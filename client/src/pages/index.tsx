import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IBlog, RootStore } from '../utils/TypeScript'
import CardVert from '../components/cards/CardVert'
import Loading from '../components/global/Loading'
import Helmetglobal from '../components/global/Helmetglobal'
import { getHomeBlogs } from '../redux/actions/blogAction'
import InfiniteScroll from 'react-infinite-scroll-component';
import Referal from '../components/global/Referal'
import { Link } from 'react-router-dom'

const Home = (props) => {
  const { homeBlogs, categories } = useSelector((state: RootStore) => state)
  //const [promo, setPromo] = useState<IBlog>()
  const [hasMore, setHasMore] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    setHasMore(homeBlogs.count <= homeBlogs.total)
  }, [homeBlogs])

  const fetchMore = () => {
    dispatch(getHomeBlogs(`?page=${homeBlogs.count + 1}`))
    return
  }
  if (homeBlogs.blogs.length === 0) return <Loading />;

  return (
    <div className="home_page">
      <Referal />
      <Helmetglobal title="Home-PediaGeek" description="PediaGeek is the best way to express your idea to the World." keyword="Home,explore,blogs,social_media" />
      <div className="alert alert-secondary example" role="alert" style={{
        display: 'block',
        overflow:'hidden',
        overflowX:'scroll',
        touchAction:'pan-y',
        whiteSpace:'nowrap'


      }}>
        <div className="btn btn-tag btn-success rounded-pill mx-1" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ cursor: "pointer" }}>Refer and Earn</div>
        <Link to={`/`} className="btn btn-tag rounded-pill mx-1" >Home</Link>
        {categories.map((category, index) => (
          <>
            <Link to={`/blogs/${category.name}`} className="btn btn-tag mx-1 rounded-pill" >
              {category.name}</Link>
          </>
        ))
        }
      </div>


      <InfiniteScroll
        dataLength={homeBlogs.count * 8} //This is important field to render the next data
        next={fetchMore}
        hasMore={hasMore}
        loader={<Loading />}
        scrollThreshold={0.6}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="container">
          <div className="home_blogs">
            {homeBlogs.blogs.map((blog, index) => (
              <CardVert key={index} blog={blog} />
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div >
  )
}

export default Home




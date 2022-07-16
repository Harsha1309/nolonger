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
  const { homeBlogs, categories, darkMode } = useSelector((state: RootStore) => state)
  //const [promo, setPromo] = useState<IBlog>()
  const { isdarkMode } = darkMode;
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
    <>
      <div className={`example pt-1 px-2 mb-1  border border-start-0 border-end-0 d-none d-md-block`} style={{
        position: 'sticky',
        display: 'block',
        overflow: 'hidden',
        overflowX: 'scroll',
        touchAction: 'pan-y',
        whiteSpace: 'nowrap',
        zIndex: 9,
        top: 50,
        backgroundColor:isdarkMode?'#202020':'white'
      }}>

        
        <Link to={`/`} className={`btn active-tag rounded-pill mx-1 px-2`}  >Home</Link>
        {categories.map((category, index) => (
          <Link to={`/blogs/${category.name}`} key={index}
            className={`btn btn-tag rounded-pill mx-1 px-2 text-${isdarkMode ? 'white' : 'black'} `} style={{ backgroundColor: isdarkMode ? '#373737' : '#e9e3e3' }} >
            {category.name}</Link>
        ))
        }
      </div>

      <div className="home_page">

        <Referal />
        <Helmetglobal title="Home-PediaGeek" description="PediaGeek is the best way to express your idea to the World." keyword="Home,explore,blogs,social_media" />
        <InfiniteScroll
          dataLength={homeBlogs.count * 8} //This is important field to render the next data
          next={fetchMore}
          hasMore={hasMore}
          loader={<Loading />}
          scrollThreshold={0.6}
          endMessage={
            <p style={{ textAlign: 'center',color:isdarkMode?'white':'black' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="container px-0">
            <div className={`home_blogs bg-${isdarkMode ? 'dark' : 'light'}`} >
              {homeBlogs.blogs.map((blog, index) => (
                <CardVert key={index} blog={blog} />
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div >
    </>
  )
}
export default Home




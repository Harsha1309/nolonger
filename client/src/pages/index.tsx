import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IBlog, RootStore } from '../utils/TypeScript'
import CardVert from '../components/cards/CardVert'
import Loading from '../components/global/Loading'
import Helmetglobal from '../components/global/Helmetglobal'
import { getHomeBlogs } from '../redux/actions/blogAction'
import InfiniteScroll from 'react-infinite-scroll-component';
import Referal from '../components/global/Referal'

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
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        <h4 className="alert-heading"><i className="fas fa-check-circle"></i> Update!</h4>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <p> Introducing New Monetary Policy of PediaGeek now Earning will depend on Engagement of viewers on the blog. Improve your blogs quality for more income.</p>
        <hr />
        <b className="mb-0" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ cursor: "pointer" }}>Refer and Earn</b>
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
    </div>
  )
}

export default Home




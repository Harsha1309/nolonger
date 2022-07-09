import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { IParams, IBlog, RootStore } from '../../utils/TypeScript'
import { getAPI } from '../../utils/FetchData'

import Loading from '../../components/global/Loading'
import { showErrMsg } from '../../components/alert/Alert'
import DisplayBlog from '../../components/blog/DisplayBlog'
import Helmetglobal from '../../components/global/Helmetglobal'

const DetailBlog = () => {
  const id = useParams<IParams>().slug
  const { socket } = useSelector((state: RootStore) => state)
  const [blog, setBlog] = useState<IBlog>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {

    if (!id) return;

    setLoading(true)

    getAPI(`blog/${id}`)
      .then(res => {
        setBlog(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.response.data.msg)
        setLoading(false)
      })

    return () => setBlog(undefined)
  }, [id])

  // Join Room
  useEffect(() => {
    if (!id || !socket) return;
    socket.emit('joinRoom', id)

    return () => {
      socket.emit('outRoom', id)
    }
  }, [socket, id])


  if (loading) return (
    <><Helmetglobal title="Loading..." keyword="Loading" /><Loading /></>
  );
  return (
    <div className="my-4">

      {blog && (typeof blog.thumbnail === 'string') && (typeof blog.category === "string") &&
        <Helmetglobal title={blog.title} description={blog.description} keyword={blog.category} twitterimage={blog.thumbnail} ogimage={blog.thumbnail} ogdescription={blog.description} ogurl={`https://www.pediageek.com/blog/${blog._id}`} twitterdescription={blog.description} ogtitle={blog.title} twittertitle={blog.title} />
      }

      {error && showErrMsg(error)}

      {blog && <DisplayBlog blog={blog} />}

    </div>
  )
}

export default DetailBlog

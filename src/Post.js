import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({id,post}) => {
  return (
    <article className='Post'>
        <Link to={`/post/${post.id}`}>
        <h3>{post.title}</h3>
        </Link>
        <br></br>
        <p className='Pbody'>
            <span style={{textAlign:'left'}}>_@{post.userId} </span>
            <span> &emsp;
            {post.body.length <=50 ?(
                post.body
            ):`${post.body.slice(0,50)}..,`}
            </span>
        </p>
        <br></br>
    </article>
  )
}

export default Post
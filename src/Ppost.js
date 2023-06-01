import React from 'react'
import { useParams,Link ,useNavigate} from 'react-router-dom'
import {useStoreActions,useStoreState } from 'easy-peasy';

const Ppost = () => {
  const getPostId =useStoreState((state)=>state.getPostId);
  const delPost=useStoreActions((action)=>action.delPost)
  const history=useNavigate();
  const {id}=useParams();// takes the key/value pair from current url
  const post1=getPostId(id)
  const handleDelete= (id)=>{
      delPost(id)
      history('/')
    }

  return (
    <main className='Postpage'>
      <article>
        {post1 &&
          <>
              <h3>{post1.title}</h3>
              <p>User : {post1.userId}</p>
              <p>&emsp;{post1.body}</p>
              <br></br>
              <Link to={`/edit/${id}`} style={{position:'absolute',left:'10px',borderRadius:'7px',backgroundColor:'indigo',width:'50px',textDecoration:'none',color:'white',textAlign:'center'}}>Edit</Link>
              <button onClick={()=>handleDelete(post1.id)} className='Dbutton' style={{position:'absolute',right:'10px',borderRadius:'10px'}}>
                Delete
              </button>
          </>
        }
        {!post1 &&
          <>
            <h3>Page Not Found</h3>
            <Link to='/'>Home</Link>
          </>
        }
      </article>

    </main>
  )
}

export default Ppost
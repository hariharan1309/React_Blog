import React, { useEffect } from 'react'
import { useParams,Link,useNavigate} from 'react-router-dom'
// import { useContext,useState } from 'react'
// import Datacontext from './context/Datacontext'
import { useStoreState,useStoreActions } from 'easy-peasy'
// import api from './api/post'
const Edit = () => {
    // const post=useStoreState((state)=>state.posts)
    // const setPost=useStoreActions((action)=>action.setPosts)
    const etitle=useStoreState((state)=>state.editTitle)
    const setetitle=useStoreActions((action)=>action.seteditTitle)
    const ebody=useStoreState((state)=>state.editBody)
    const setebody=useStoreActions((action)=>action.seteditBody)
    const {id}=useParams();
    const history=useNavigate();
    const getPostId =useStoreState((state)=>state.getPostId);
    const post=getPostId(id)
    const editPost=useStoreActions((action)=>action.editPost)
    useEffect(()=>{
        if(post){
            setebody(post.body);
            setetitle(post.title)
        }
        else{
            console.log("Error !!!")
        }
    },[post,setebody,setetitle])
    const handleEdit = (id)=>{
        const userId=post.userId
        const Npost={userId:userId,id:id,title:etitle,body:ebody};
        console.log(Npost)
        editPost(Npost);
        history(`/post/${id}`)
        }
  return (
    <div>
        {etitle && 
            <>
                <h3>Edit Posts</h3>
                <form className='EditForm' onSubmit={(e)=>e.preventDefault()}>
                    <label htmlFor='ET' > <strong>Title :</strong></label>
                    <input id="ET" type='text' required value={etitle} onChange={(e)=>setetitle(e.target.value)}
                    style={{height:'30px',width:''}}>
                    </input><br></br><br></br>
                    <label htmlFor='EB'><strong>Content :</strong></label> <br></br>
                    <textarea id='EB' type='text' required value={ebody} onChange={(e)=>setebody(e.target.value)} 
                    style={{width:'250px',height:'100px'}}>
                    </textarea > <br></br>
                    <button type='button' onClick={()=>handleEdit(post.id)} style={{textAlign:'center'}}> Post </button> {/*because we have parms to provide */}
                </form>
            </>
            }
        {!etitle &&
            <>
                <h3>Page Not Found</h3>
                <Link to='/'>Home</Link>
            </>
            }
            
    </div>
  )
}

export default Edit
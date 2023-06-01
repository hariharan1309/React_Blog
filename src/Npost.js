import { useNavigate } from 'react-router-dom';
import { useStoreState,useStoreActions } from 'easy-peasy';

const Npost = () => {
  const post=useStoreState((state)=>state.posts)
  const ptitle=useStoreState((state)=>state.ptitle)
  const pbody=useStoreState((state)=>state.pbody)
  const setptitle=useStoreActions((action)=>action.setptitle)
  const setpbody=useStoreActions((action)=>action.setpbody)
  const savePost=useStoreActions((action)=>action.savePost)
  const history=useNavigate();
  const handleSubmit= (e)=>{
    e.preventDefault();
    const id=post.length?post[post.length-1].id+1:1;
    const userId=post.length?post[post.length-1].userId+1:1;
    const Npost={userId:userId,id:id,title:ptitle,body:pbody};
    savePost(Npost)
    history('/')
  }

  return (
    <main>
      <h3>New </h3>
      <form className='Npost' onSubmit={handleSubmit}>
        <label htmlFor='PT'><strong>Title : </strong></label><br></br> 
        <input 
          id='PT'
          type='text'
          required
          value={ptitle}
          onChange={
            (e)=>setptitle(e.target.value)
          }
        ></input> <br></br>
        <label htmlFor='PB'><strong>Body :</strong> </label><br></br>
        <textarea 
          id='PB'
          required
          value={pbody}
          onChange={(e)=>setpbody(e.target.value)}
          style={{width:'250px',height:'100px'}}
        ></textarea> <br></br><br></br>
        <button type='submit' style={{position:'absolute',left:'10px',borderRadius:'7px',backgroundColor:'blue',width:'70px',textDecoration:'none',color:'white',textAlign:'center',border:'none'}}>Submit</button>
      </form>
    </main>
  )
}

export default Npost
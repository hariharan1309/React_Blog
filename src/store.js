import {createStore,action,thunk,computed} from 'easy-peasy'; 
import api from './api/post'

export default createStore({
    posts:[],
    setPosts:action((state,payload)=>{
        state.posts=payload
    }),
    ptitle:'',
    setptitle:action((state,payload)=>{
        state.ptitle=payload
    }),
    pbody:'',
    setpbody:action((state,payload)=>{
        state.pbody=payload
    }),
    editTitle:'',
    seteditTitle:action((state,payload)=>{
        state.editTitle=payload
    }),
    editBody:'',
    seteditBody:action((state,payload)=>{
        state.editBody=payload
    }),
    search:'',
    setSearch:action((state,payload)=>{
        state.search=payload
    }),
    searchRes:[],
    setsearchRes:action((state,payload)=>{
        state.searchRes=payload
    }),
    postCount:computed((state)=>state.posts.length),
    getPostId:computed((state)=>{
        return (id)=> state.posts.find((post)=>(post.id).toString()===id)
    }),
    savePost:thunk(async (action,Npost,helpers)=>{
        const {posts}=helpers.getState();
        try{
            const response= await api.post('/posts',Npost)
            action.setPosts([...posts,response.data]);
            // console.log("Added "+id+"\n")
            action.setpbody('');
            action.setptitle(''); 
            // history('/');
          }
          catch(err){
            console.log(`Error: ${err.message}`)
          }
    }),
    delPost:thunk(async (action,id,helpers)=>{
        const {posts}=helpers.getState();
        try {
            await api.delete(`/posts/${id}`);
            action.setPosts(posts.filter(post=>post.id!==id));
            console.log('Deleted : '+ id)

            // history('/');
          } catch (err) {
            console.log(`Error: ${err.message}`)
          }
    }),
    editPost: thunk(async (action, Upost, helpers) => {
        const { posts } = helpers.getState();
        const { id } = Upost;
        try {
          const response = await api.put(`/posts/${id}`, Upost);
          if (response && response.data) {
            action.setPosts(
              posts.map((post) =>
                post.id=== id ? { ...response.data } : post
              )
            );
            console.log(response.data);
            action.seteditBody('');
            action.seteditTitle('');
            console.log("Done")
            // history('/');
          } else {
            console.log("Error: Invalid response");
          }
        } catch (err) {
          console.log(err.response ? err.response.data : err.message);
        }
      })
      
})
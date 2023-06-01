import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav'
import Home from './Home';
import About from './About';
import Npost from './Npost';
import Ppost from './Ppost';
import Missing from './Missing';
import './App.css'
import api from './api/post'
import Edit from './Edit';
import useWindowS from './hooks/useWindowS';
import useAXIOSFetch from './hooks/useAXIOSFetch';
import {DataProvider} from './context/Datacontext';

function App() {
  // const API_URL='https://jsonplaceholder.typicode.com/posts' Old Fetch
  const [post,setPost]=useState([]);
  const [search,setSearch]=useState('');
  const [searchRes,setSearchRes]=useState([]);
  const [ptitle,setptitle]=useState('');
  const [pbody,setpbody]=useState('');
  const history=useNavigate();
  const [etitle,setetitle]=useState('');
  const [ebody,setebody]=useState('');
  const {width}=useWindowS();
  const {data,fError,isLoad}=useAXIOSFetch('https://jsonplaceholder.typicode.com/posts');
  // Same work done by useAXIOS hook
  // useEffect( ()=>{
  //   const fetchItems= async ()=>{
  //     try{
  //       // Old Fetch
  //       // const response= await fetch(`${API_URL}`);
  //       // const data=await response.json()
  //       // setPost(data);
  //       // console.log("Added")
  //       const response= await api.get('/posts') //automatically creates the JSON and catch errors
  //       setPost(response.data)
  //     }
  //     catch(err){
  //       //console.log(err.response.data)
  //       // Not in range of 200 response
  //       if(err.response){
  //         console.log(err.response.data.message)
  //         console.log(err.response.status)
  //         console.log(err.response.headers)
  //       }
  //       else{
  //         console.log(`Error: ${err.message}`)
  //       }
        
  //     }
  //   }
  //   fetchItems();
  // },[])
  useEffect(()=>{
    setPost(data)
  },[data])
  useEffect(()=>{
    const filterRes= post.filter(posts=>
      ((posts.body).toLowerCase()).includes(search.toLowerCase()) ||
        ((posts.title).toLowerCase()).includes(search.toLowerCase())
    );
    setSearchRes(filterRes.reverse())
  },[post,search])
const handleSubmit= async(e)=>{
  e.preventDefault();
  const id=post.length?post[post.length-1].id+1:1;
  const userId=post.length?post[post.length-1].userId+1:1;
  const Npost={userId:userId,id:id,title:ptitle,body:pbody};
  try{
    const response= await api.post('/posts',Npost)
    setPost([...post,response.data]);
    console.log("Added "+id+"\n")
    setpbody('');
    setptitle('');
    history('/');
  }
  catch(err){
    console.log(`Error: ${err.message}`)
  }
}
  const handleEdit= async(id)=>{
    const userId=post[post.length-1].userId
    const Npost={userId:userId,id:id,title:etitle,body:ebody};
    console.log(Npost)
    try {
      const response =await api.put(`/posts/${id}`,Npost);
      console.log(`API`)
      setPost(post.map(posts => (posts.id).toString() === id ? {...response.data} : posts));
      console.log(response.data);
      setebody('');
      setetitle('');
      history('/');
    } catch (err) {
      console.log(err.response.data);
    }


  }
  const handleDelete= async(id)=>{
    try {
      await api.delete(`/posts/${id}`);
      const postList=post.filter(post=>post.id!==id)
      console.log('Deleted : '+ id)
      setPost(postList);
      history('/');
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }
  return (
    <>
      <DataProvider>
        <Header title={"Blogger"} width={width}/>
        <Nav search={search} setSearch={setSearch}/>
        <Routes >
          <Route path="/" element={<Home post={searchRes} fError={fError} isLoad={isLoad} />} />
          <Route path="/post" element={<Npost handleSubmit={handleSubmit} setptitle={setptitle} ptitle={ptitle} pbody={pbody} setpbody={setpbody}/>} />
          <Route path="/edit/:id" element={<Edit post={post} handleEdit={handleEdit}setetitle={setetitle} etitle={etitle} ebody={ebody} setebody={setebody}/>} />
          <Route path="/post/:id" element={<Ppost posts={post} handleDelete={handleDelete}/>} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </>
  );
}

export default App;

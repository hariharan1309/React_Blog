import {createContext} from 'react'
import React, { useState, useEffect } from 'react';
const Datacontext =createContext({}) // starts with empty object

export const DataProvider= ({children})=>{
    const [post,setPost]=useState([]);
    const [search,setSearch]=useState('');
    const [searchRes,setSearchRes]=useState([]);
  
    useEffect(()=>{
      const filterRes= post.filter(posts=>
        ((posts.body).toLowerCase()).includes(search.toLowerCase()) ||
          ((posts.title).toLowerCase()).includes(search.toLowerCase())
      );
      setSearchRes(filterRes.reverse())
    },[post,search])

      



    return <Datacontext.Provider value={{
          search,
          setSearch,
          searchRes,
          post,

          setPost
        }}>
        {children}
    </Datacontext.Provider>
}

export default Datacontext
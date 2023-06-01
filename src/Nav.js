import { Link } from 'react-router-dom'
import { useStoreActions,useStoreState } from 'easy-peasy';
import { useEffect } from 'react';

const Nav = () => {
  const post=useStoreState((state)=>state.posts);
  const search=useStoreState((state)=>state.search);
  const setSearch=useStoreActions((action)=>action.setSearch);
  const setSearchRes=useStoreActions((action)=>action.setsearchRes);
  useEffect(()=>{
    const filterRes= post.filter(posts=>
      ((posts.body).toLowerCase()).includes(search.toLowerCase()) ||
        ((posts.title).toLowerCase()).includes(search.toLowerCase())
    );
    setSearchRes(filterRes.reverse())
  },[post,search,setSearchRes])

  return (
    <nav className='Navbar'>
      <form className='SearchBar' onSubmit={(e)=>e.preventDefault()}>
          <label htmlFor="search">Search ...
          </label>
          <input type='text' placeholder='Search Posts' id='search' onChange={(e)=>setSearch(e.target.value)}>
          </input>
      </form>
      <ul className='NavEl'>
        <li> <Link to='/'>Home</Link></li>
        <li> <Link to='/post' >New</Link></li>
        <li> <Link to='/about' >About</Link></li>
      </ul>
    </nav>
  )
}

export default Nav
import React from 'react'
import Feed from './Feed'
import { useStoreState } from 'easy-peasy'

const Home = ({isLoad,fError}) => {
  const searchRes=useStoreState((state)=>state.searchRes)
  return (
    <main className='Home'>
      {isLoad && <h2 className='Status'style={{color:'green'}}>Loading ...</h2> } 
      {fError && <h2 className='Status'style={{color:'red'}}>{fError}</h2> }
      {!isLoad && !fError && (searchRes.length ? <Feed posts={searchRes} />: <p className='Status'style={{color:'maroon'}}>Nothing to display ...</p>)}     
    </main>
  )
}

export default Home;
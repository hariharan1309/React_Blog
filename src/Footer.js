import React from 'react'
import { useStoreState } from 'easy-peasy'
const Footer = () => {
  const pCount=useStoreState((state)=>state.postCount)
  return (
    <footer className='Footer'>
        <h2>Funny Project @hariharan {` with ${pCount}`}</h2>
    </footer>
  )
}

export default Footer
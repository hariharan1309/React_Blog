import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main>
        <h2 style={{color:'red'}}>Sorry </h2>
        <br></br>
        <h3>The Page/Post You are Looking for is not available !!!</h3>
        <h3><br></br>
          <Link to='/'>Home</Link>
        </h3>
    </main>
  )
}

export default Missing
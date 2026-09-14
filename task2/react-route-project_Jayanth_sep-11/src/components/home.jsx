import React from 'react'
import { UserContext } from './context'
import { useContext } from 'react'

const Home = () => {
    const {name} = useContext(UserContext)
  return (
    <div>
        <h1>Welcome Home, {name}</h1>
    </div>
  )
}

export default Home
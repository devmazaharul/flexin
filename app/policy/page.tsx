
import React from 'react'

export default  async function page() {

  const vari=await fetch('http://localhost:3000/api/debug')
  const data=await vari.json()
  console.log(data)

  return (
    <div>this is policy page </div>
  )
}

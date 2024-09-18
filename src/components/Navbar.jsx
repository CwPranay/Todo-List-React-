import React from 'react'

const Navbar = () => {
  return (
    
    <>
    <nav className='flex justify-between p-4 bg-slate-700 text-white'>
        <h3 className='ml-11 font-medium text-lg cursor-pointer'>My-Todo'S</h3>
        <ul className='flex gap-5 mr-11'>
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>FeedBack</li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar

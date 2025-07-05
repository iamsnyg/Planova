import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="flex justify-center pt-30">
      {children}
    </div>
  )
}

export default Layout
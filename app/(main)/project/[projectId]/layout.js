import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners';

const ProjectLayout = ({children}) => {
  return (
    <div className='mx-auto'>
        <Suspense fallback={<span className='flex justify-center items-center h-screen'>
            <BarLoader color="#4F46E5" width={100} />
        </span>}>
            {children}
        </Suspense>
    </div>
  )
}

export default ProjectLayout;
import React from 'react'

const Organization = ({ params }) => {
    const { orgid } = params
    return (
        <div>
            <h1>Organization: {orgid}</h1>
        </div>
    )
}

export default Organization
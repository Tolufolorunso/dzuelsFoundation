
import { useRouter } from 'next/router'
import React from 'react'

function Admin() {
    const router = useRouter()
    console.log(router)
    return (
        <div>[...admin]</div>
    )
}

export default Admin
import React from 'react'
import { PasportInfo } from '../components'
import { cookies } from 'next/headers'

async function page() {
    const token = (await cookies()).get("arvan_access")?.value
  return (
    <div>
        <PasportInfo token={token || ""}/>
    </div>
  )
}

export default page
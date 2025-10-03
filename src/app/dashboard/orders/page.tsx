import React from 'react'
import { Order } from '../components'
import { cookies } from 'next/headers'

async function page() {
  const token = (await cookies()).get("arvan_access")?.value;
  return (
    <div>
      <Order token={token || ""}/>
    </div>
  )
}

export default page
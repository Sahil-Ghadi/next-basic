'use client'
export default function Profile({params}: any) {
  return (
    <div className=''>
      <h1>Profile</h1>
      <hr />
      <h2>Profile page {params.id}</h2>
    </div>
  )
}


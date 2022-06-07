import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Author = ({ author }) => {
  return (
    <div className="relative mt-10 mb-9 rounded-lg bg-yellow-300 bg-opacity-30 p-5 pb-20 text-center">
      <div className="absolute left-0 right-2 -top-10">
        {<Image
          alt={author.name}
          unoptimized
          height="75px"
          width="75px"
          className="rounded-full align-middle"
          src={author.photo.url}
        />}
        <h3 className=" relative align-middle text-lg text-white hover:text-amber-700 ">
          <Link href={`/author/${author.name}`}>{author.name}</Link>
        </h3>
        <p className="text-lg text-black">{author.bio}</p>
      </div>
    </div>
  )
}

export default Author

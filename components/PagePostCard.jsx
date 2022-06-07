import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'

const PagePostCard = ({ post }) => {
  return (
    <div
      key={post}
      className="container mx-auto mb-7 bg-transparent px-5 opacity-90"
    >
      <div className="rounded-lg bg-amber-100 bg-opacity-80 p-0 shadow-lg sm:pb-1 lg:mt-5 lg:mb-5 lg:p-1 lg:pb-12 ">
        <div className="relative mb-5 overflow-hidden pb-80 shadow-md">
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            className="absolute h-full w-full rounded-t-lg object-cover object-top shadow-lg sm:object-cover lg:rounded-lg"
            layout="fill"
          />
        </div>

        {/** Page Posts Titles */}
        <h1
          className="transistion mb-8 transform cursor-pointer 
rounded-full text-center  transition duration-500  hover:-translate-y-1 border-amber-100	bg-gradient-to-r  from-orange-500 to-black bg-clip-text pb-3 text-4xl font-semibold	 text-transparent hover:text-emerald-700  "
        >
          <Link href={`/post/${post.slug}`} passHref>
            {post.title}
          </Link>
        </h1>
        {/** Page Posts Authors and Auhtor Photo */}
        <div className="mb-4 block w-full items-center justify-center text-center lg:flex">
          <div className="lg:w=auto mb-3 mr-8 flex w-full items-center justify-center lg:mb-0 ">
            <img
              height="75px"
              width="75px"
              className="rounded-full align-middle"
              src={post.author.photo.url}
            />
            <div>
              <p className="ml-10 inline align-middle text-lg text-black ">
                {/*<Link href={`author/${post.author.name}`}>
                
              </Link>*/}
                {post.author.name}
              </p>
              {/** Page Posts Date*/}
              <div className="font-medium text-gray-600">
                <span>{moment(post.createdAt).format('MMM,DD YYYY')}</span>
              </div>
            </div>
          </div>
        </div>

        {/** Continue Reading Button and animation aswell as link*/}
        <p className="lg:px:20 mb-8 px-4 text-center text-lg font-normal text-gray-700">
          {post.excerpt}
        </p>
        <div className="text-center">
          <Link passHref href={`post/${post.slug}`}>
            <span className="transistion transition-duration: 1s; inline-block transform   cursor-pointer rounded-full bg-amber-300 from-emerald-500 via-emerald-600 to-emerald-700 px-7 py-2 text-lg font-medium text-black duration-300 hover:-translate-y-1 hover:bg-gradient-to-l hover:text-white">
              Continue reading ?
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PagePostCard

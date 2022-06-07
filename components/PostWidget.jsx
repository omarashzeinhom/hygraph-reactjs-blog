import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentposts, getSimilarposts } from '../services'
import Image from 'next/image'

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect((categories) => {
    if (slug) {
      getSimilarposts(categories, slug).then((result) =>
        setRelatedPosts(result)
      )
    } else {
      getRecentposts().then((result) => setRelatedPosts(result))
    }
  }, [slug])

  return (
    <div className="mb-3 mt-4 rounded-lg bg-stone-400	bg-opacity-70 p-4 shadow-lg">
      <h3 className="mb-3 mt-4 border-b border-amber-100	bg-gradient-to-r  from-orange-500 to-black bg-clip-text pb-3 text-4xl font-semibold	 text-transparent">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {/*post ??? */}

      {relatedPosts.map((post) => (
        <div key={post.title} className="mb-4 flex w-full items-center hover:">
          <div className="w-10 flex-none">
            <Image
              alt={post.title}
              height="75px"
              width="75px"
              className="rounded-full align-middle"
              src={post.featuredImage.url}
            />
          </div>
          {/*Dates*/}
          <div className="ml-4 flex-grow">
            <p className="font-xs text-gray-600">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            {/*ArticleLink*/}
            <div className="hover:text-amber-700">
              <Link
                href={`/post/${post.slug}`}
                key={post.title}
                className="text-md"
              >
                {post.title}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget

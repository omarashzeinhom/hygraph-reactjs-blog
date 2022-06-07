import React from 'react'
import { useRouter } from 'next/router'
import { getPageCategories, getPageCategoryPost } from '../../services'
import { PagePostCard, Categories, Loader, NavBar } from '../../components'

const Categorypost = ({ posts }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <div>
      <NavBar />
      <nav className="w-full rounded-md">
        <ol className="list-reset flex">
          <li>
            <a href="https://dynamico-gaming.netlify.app/" className="text-orange-500 hover:text-orange-700">
              Home
            </a>
          </li>
          <li>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li className="text-gray-400">Category</li>
        </ol>
      </nav>
      <div className="container mx-auto mb-8 px-10">
        <h1 className="font-size-xl text-center font-extrabold">Category</h1>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-8">
            {posts.map((post, index) => (
              <PagePostCard key={index} post={post.node} />
            ))}
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative top-8 lg:sticky">
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const posts = await getPageCategoryPost(params.slug)
  return {
    props: { posts },
  }
}

export async function getStaticPaths() {
  const categories = await getPageCategories()
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  }
}

export default Categorypost

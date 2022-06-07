import React from 'react'
import { useRouter } from 'next/router'
import { getPostInfo, getPosts } from '../../services'
import {
  PostInfo,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Loader,
  NavBar,
} from '../../components'

const PostDetails = ({ post }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loader/>
   }
  return (
    <div className="">
      <div className="col-span-5 gap-5 lg:col-span-1">
        <div className="col-span-5 lg:col-span-1">
          <NavBar />
          <PostInfo post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-5">
          <div className="relative top-7 lg:sticky">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails

/**Slug post for post in postDetails */

export async function getStaticProps({ params }) {
  const data = await getPostInfo(params.slug)
  return {
    props: { post: data },
  }
}

// Dynamic Nextjs fucntion

export async function getStaticPaths() {
  const posts = await getPosts()
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  }
}

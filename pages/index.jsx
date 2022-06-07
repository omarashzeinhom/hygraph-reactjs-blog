import Head from 'next/head'
import { PagePostCard, PostWidget, Categories, NavBar } from '../components'
import { FeaturedPosts } from '../sections/index'
import { getPosts } from '../services'

export default function Home({ posts }) {
  return (
    <div key={posts}>
      <NavBar />
      <FeaturedPosts />
      <div className="container mx-auto mb-7 gap-3 bg-transparent px-10 opacity-90">
        <Head>
          <title>🕹️Blog!</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-8">
            {posts.map((post, _index) => (
              <PagePostCard post={post.node} key={post} />
            ))}
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative top-7 lg:sticky">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || []

  return {
    props: { posts },
  }
}

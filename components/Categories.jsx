import Link from 'next/link'
import NavBar from './NavBar'
import { getPageCategories } from '../services'
import React, { useState, useEffect } from 'react'


const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getPageCategories().then((newCategories) => setCategories(newCategories))
  }, [])

  return (
    <div>
      <div className="mb-5 mt-5 rounded-lg bg-stone-400	bg-opacity-70 p-7 shadow-lg">
        <h3 className="mb-5 border-b  transition duration-500  hover:-translate-y-1 border-amber-100	bg-gradient-to-r  from-orange-500 to-black bg-clip-text pb-3 text-4xl font-semibold	 text-transparent">
          Categories
        </h3>
        {categories.map((category) => (
          <Link passHref key={category.slug} href={`/category/${category.slug}`}>
            <span className="mb-3 block cursor-pointer pb-5 hover:text-orange-900">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories

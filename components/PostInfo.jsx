import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { GoCalendar } from 'react-icons/go'

const PostInfo = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text
    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>
      }
    }

    switch (type) {
      case 'heading-three':
        return (
          <h3 key={index} className="mb-4 text-xl font-semibold">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        )
      case 'paragraph':
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        )
      case 'heading-four':
        return (
          <h4 key={index} className="text-md mb-4 font-semibold">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        )
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        )
      default:
        return modifiedText
    }
  }

  return (
    <div className="container mx-auto mb-7 bg-transparent opacity-90 sm:px-3 md:px-5 lg:px-1">
      <div className=" mt-5 mb-4 rounded-lg bg-gray-800 bg-opacity-90 p-0 pb-5 shadow-lg md:w-full md:py-4 md:px-3">
        <div className="relative mb-5  overflow-hidden shadow-md">
          <Image
            src={post.featuredImage.url}
            alt={post.tilte}
            className="h-full w-full rounded-t-lg object-cover object-top"
            width={750}
            height={250}
            layout="responsive"
          />
        </div>
        <div className="px-1 lg:px-0">
          <div className="mb-4  w-full items-center">
            <div className="mb-4 block w-full items-center justify-center text-center lg:flex">
              <div>
                <h1 className="text-7x1 mb-5 font-extrabold text-white ">
                  {post.title}
                </h1>
                <p className=" text-left text-white ">
                  {post.content.raw.children.map((typeObj, index) => {
                    const children = typeObj.children.map((item, itemindex) =>
                      getContentFragment(itemindex, item.text, item)
                    )
                    return getContentFragment(
                      index,
                      children,
                      typeObj,
                      typeObj.type
                    )
                  })}
                </p>
              </div>
            </div>

            <div className="lg:w=auto mb-3 w-full items-center justify-center align-middle ">
             {/** <Image
                alt={post.author.name}
                height={55}
                width={55}
                className="rounded-full"
                src={post.author.photo.url}
              /> */}
              <div>
                <p className="ml-0 inline align-middle text-lg text-white hover:text-amber-700 ">
                  {/**<Link href={`/author/${post.author.name}`}>
                    {post.author.name}
                  </Link> */}
                </p>
                <div className="font-medium text-white">
                  <span>
                    <GoCalendar fontSize="1.5rem" className="calendar__icon" />
                    {moment(post.createdAt).format('MMM,DD YYYY')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostInfo

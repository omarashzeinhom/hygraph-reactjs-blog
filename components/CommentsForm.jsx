import React, { useState, useEffect, useRef } from 'react'
import { submitUserComment } from '../services'

const CommentsForm = ({ slug }) => {
  {
    /**Name of state */
  }
  const [error, setError] = useState(false)
  const [local, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  {
    /**Form Fields State*/
  }
  const commentElm = useRef()
  const nameElm = useRef()
  const emailElm = useRef()
  const storeDataElm = useRef()
  useEffect(() => {
    nameElm.current.value = window.localStorage.getItem('name')
    emailElm.current.value = window.localStorage.getItem('email')
  }, [])
  const handleUserCommentSubmission = () => {
    setError(false)
    const { value: comment } = commentElm.current
    const { value: name } = nameElm.current
    const { value: email } = emailElm.current
    const { checked: storeData } = storeDataElm.current

    if (!comment || !name || !email) {
      setError(true)
      return
    }
    const commentObj = { comment, email, name, slug }
    if (storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } else {
      window.localStorage.removeItem('name', name)
      window.localStorage.removeItem('email', email)
    }
    submitUserComment(commentObj).then((res) => {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 30000)
    })
  }
  return (
    <div className="mb-8 rounded-lg   bg-white bg-opacity-70 p-10 pb-12 shadow-lg">
      <h1 className="mb-10 border-b pb-5 text-xl font-semibold">
        Leave a Comment !
      </h1>
      <div className="mb-5 grid grid-cols-1 gap-5">
        <textarea
          ref={commentElm}
          className="w-full resize-none rounded-lg bg-gray-300 p-5 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Comment Here ☺️"
          name="Comment"
        />
      </div>
      <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <input
          ref={nameElm}
          type="text"
          className="w-full rounded-lg bg-gray-300 py-3 px-5 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Name"
          name="Name"
        />
      </div>
      <div className="mb-5 grid grid-cols-1 gap-5">
        <input
          ref={emailElm}
          type="text"
          className="w-full rounded-lg bg-gray-300 py-3 px-5 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Email"
          name="Email"
        />
      </div>
      <div className="mb-5 grid grid-cols-1 gap-5">
        <div>
          <input
            ref={storeDataElm}
            type="checkbox"
            id="storeData"
            name="storeDate"
            value="true"
          />
          <label
            className="ml-2 cursor-pointer text-gray-500"
            htmlFor="storeData"
          >
            Save my e-mail and Name for next time i comment
          </label>
        </div>
      </div>
      {error && (
        <div className="mx-auto flex w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
          <div className="flex w-12 items-center justify-center bg-red-500">
            <svg
              className="h-6 w-6 fill-current text-white"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
            </svg>
          </div>
          <div className="-mx-3 px-4 py-2">
            <div className="mx-3">
              <span className="font-semibold text-red-500 dark:text-red-400">
                Error
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-200">
                All Fields are Required!
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleUserCommentSubmission}
          className="transistion duration-400 ease float-right inline-block transform cursor-pointer rounded-full  bg-emerald-200 from-emerald-500 via-emerald-600 to-emerald-700 px-8 py-2 text-lg font-medium text-black duration-300 hover:-translate-y-1 hover:bg-gradient-to-l hover:text-white"
        >
          Add Comment
        </button>
      </div>
    </div>
  )
}

export default CommentsForm

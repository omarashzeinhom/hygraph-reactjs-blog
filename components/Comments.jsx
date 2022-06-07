import React, { useState, useEffect } from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import { getComments } from '../services'

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([])

  useEffect(({}) => {
    getComments(slug).then((result) => setComments(result))
  }, [])

  return (
    <>
      {comments.length > 0 && (
        <div className="mb-7 rounded-lg bg-white p-7 pb-11 shadow-lg">
          <h3 className="text-xl">
            {comments.length}
            <br/>Comments
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className="mb-5 border-b border-yellow-400 pb-5"
            >
              <p className="mb-4">
                <span className="font-semi-bold ">{comment.name}</span>
                <br/>
                on
                <br/>
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className="w-full whitespace-pre-line text-gray-600">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments

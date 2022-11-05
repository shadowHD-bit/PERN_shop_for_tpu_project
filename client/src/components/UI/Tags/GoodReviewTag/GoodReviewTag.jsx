import React from 'react'
import './GoodReviewTag.scss'

const GoodReviewTag = ({children}) => {
  return (
    <>
        <span class="tag tag-good tag-lg">{children}</span>
    </>
  )
}

export default GoodReviewTag
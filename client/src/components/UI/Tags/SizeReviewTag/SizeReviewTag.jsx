import React from 'react'
import './SizeReviewTag.scss'

const SizeReviewTag = ({children}) => {
  return (
    <>
        <span class="tag tag-size tag-lg">{children}</span>
    </>
  )
}

export default SizeReviewTag
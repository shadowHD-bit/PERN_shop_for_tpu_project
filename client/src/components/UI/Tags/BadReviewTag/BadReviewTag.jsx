import React from 'react'
import './BadReviewTag.scss'

const BadReviewTag = ({children}) => {
  return (
    <>
        <span class="tag tag-bad tag-lg">{children}</span>
    </>
  )
}

export default BadReviewTag
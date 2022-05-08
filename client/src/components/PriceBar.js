import React from 'react'
import { Form, ListGroup } from 'react-bootstrap'

export default function PriceBar() {
  return (
    <div className='mt-2'>
      <ListGroup className="mt-3">
        <ListGroup.Item variant="danger">Сортировать по цене</ListGroup.Item>
        <ListGroup.Item>
        <Form.Range />
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}

import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Form, ListGroup } from 'react-bootstrap'

const PriceBar = observer(({onChange, onChangeMin, inFirstPage}) => {

  const [minPrice, setMinPrice] = useState(1)
  const [maxPrice, setMaxPrice] = useState(999999)

  const handleChangeMaxPrice = (event) => {
    onChange(event.target.value)
    setMaxPrice(event.target.value)
    inFirstPage()
  }

  const handleChangeMinPrice = (event) => {
    onChangeMin(event.target.value)
    setMinPrice(event.target.value)
    inFirstPage()
  }

  return (
    <div className='mt-2'>
      <ListGroup className="mt-3">
        <ListGroup.Item variant="danger">Сортировать по цене</ListGroup.Item>
        <ListGroup.Item>
        От
        <Form.Control  className='mb-2' min={1} type="number" placeholder="Минимальная цена" value={minPrice} onChange={handleChangeMinPrice}/>
        До
        <Form.Control type="number" placeholder="Максимальная цена" value={maxPrice} onChange={handleChangeMaxPrice}/>
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
})
export default PriceBar
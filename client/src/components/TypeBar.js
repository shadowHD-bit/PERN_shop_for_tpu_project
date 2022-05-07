import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '..'
import { ListGroup } from 'react-bootstrap'

const TypeBar = observer(() => { 
    const {product} = useContext(Context)
  return (
    <ListGroup>
        <ListGroup.Item variant="danger">Тип товара</ListGroup.Item>
        <ListGroup.Item
        style={{ cursor: "pointer" }}
        active={'all' === product.selectedType}
        onClick={() => product.setSelectedType('all')}
        key={'all'}
      >
        Все типы
      </ListGroup.Item>
        {product.types.map(type => 
            <ListGroup.Item  
            style={{cursor: 'pointer'}}
            active={type.id === product.selectedType.id}
            onClick={() => product.setSelectedType(type)}
            key={type.id}
            >
                {type.name}
            </ListGroup.Item>
        )}
    </ListGroup>
  )
})

export default TypeBar
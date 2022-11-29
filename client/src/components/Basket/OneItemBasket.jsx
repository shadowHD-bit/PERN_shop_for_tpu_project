import React, {useContext, useEffect} from 'react';
import {Button} from "react-bootstrap";
import {Context} from "../../index";
import './BasketCard.scss'
import {GrClose} from 'react-icons/gr'
import { fetchSizes, getProductFromBasket } from '../../http/productAPI';
import { useState } from 'react';

const OneItemInBasket = ({product}) => {
    const {basket} = useContext(Context);

    const [sizes, setSizes] = useState([])

    useEffect(() => {
        fetchSizes().then(data => {
            setSizes(data.rows.find(item => item.id === product.sizeId).number_size)
        })
    }, [])


    return (
        <tr>
			<td className="product-thumbnail"><a href={`/product/${product.id}`}><img src={process.env.REACT_APP_API_URL + product.imgMain} alt="" style={{width: '100px'}}/></a></td>
			<td className="product-name"><a href={`/product/${product.id}`}>{product.name}</a></td>
			<td className="product-price"><span className="amount">{sizes}</span></td>
            <td className="product-price"><span className="amount">{product.price} РУБ</span></td>
			<td className="product-quantity"> 
                <Button variant="outline-dark" onClick={() => basket.setCountProduct(product.id, "+")}>+</Button>
                    <input className="ml-2 mr-2 pl-2 pr-2" style={{width: "20%"}} type="number" onChange={e =>basket.setCountProduct(Number(e.target.value))} value={product.count}/>
                <Button variant="outline-dark" onClick={() => basket.setCountProduct(product.id, "-")}>-</Button>
            </td>
			<td className="product-subtotal">{product.price * product.count} РУБ</td>
			<td className="product-remove"><a ><GrClose onClick={() => basket.setDeleteItemBasket(product, true)}/></a></td>
		</tr>
)};

export default OneItemInBasket;
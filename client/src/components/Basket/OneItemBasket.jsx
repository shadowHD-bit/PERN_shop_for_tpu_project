import React, {useContext, useEffect} from 'react';
import {Button} from "react-bootstrap";
import {Context} from "../../index";
import './BasketCard.scss'
import {GrClose} from 'react-icons/gr'
import { getProductFromBasket } from '../../http/productAPI';

const OneItemInBasket = ({product}) => {
    const {basket} = useContext(Context);

    
    return (
        <tr>
			<td class="product-thumbnail"><a href={`/product/${product.id}`}><img src={process.env.REACT_APP_API_URL + product.imgMain} alt="" style={{width: '100px'}}/></a></td>
			<td class="product-name"><a href={`/product/${product.id}`}>{product.name}</a></td>
			<td class="product-price"><span class="amount">{product.price} РУБ</span></td>
			<td class="product-quantity"> 
                <Button variant="outline-dark" onClick={() => basket.setCountProduct(product.id, "+")}>+</Button>
                    <input className="ml-2 mr-2 pl-2 pr-2" style={{width: "20%"}} type="number" onChange={e =>basket.setCountProduct(Number(e.target.value))} value={product.count}/>
                <Button variant="outline-dark" onClick={() => basket.setCountProduct(product.id, "-")}>-</Button>
            </td>
			<td class="product-subtotal">{product.price * product.count} РУБ</td>
			<td class="product-remove"><a ><GrClose onClick={() => basket.setDeleteItemBasket(product, true)}/></a></td>
		</tr>
)};

export default OneItemInBasket;
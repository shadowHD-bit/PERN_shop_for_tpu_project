import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Card, Row} from "react-bootstrap";
import { Context } from '..';

const BrandBar = observer(() => {
    const {product} = useContext(Context)

    return (
        <Row className="d-flex">
            {product.brands.map(brand =>
                <Card
                    style={{cursor:'pointer'}}
                    key={brand.id}
                    className="p-3 w-auto"
                    onClick={() => product.setSelectedBrand(brand)}
                    border={brand.id === product.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;
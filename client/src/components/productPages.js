import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Pagination} from "react-bootstrap";
import { Context } from '..';

const Pages = observer(({currentPage, paginate, productPerPage, totalProducts}) => {
    const pageNumber = []

    for(let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++){
        pageNumber.push(i)
    }

    return (
        <Pagination className="mt-3">
            {pageNumber.map(page =>
                <Pagination.Item
                    key={page}
                    active={currentPage === page}
                    onClick={() => paginate(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;
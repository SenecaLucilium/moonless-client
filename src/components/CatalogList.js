import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

import Post from "../components/Post"

import "../styles/pagination.css"

function Items({ currentItems }) {
    return (
        <div className="CurrentItems">
            {currentItems && currentItems.map((item) => (
                <Post meta={item} />
            ))}
        </div>
    );
}

function CatalogList (props) {
    const itemsPerPage = 10;
    const items = props.meta;

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;

    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="CatalogList">
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </div>
    );
}

export default CatalogList;
import React from 'react';
import ReactPaginate from "react-paginate";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange?: (selected: number) => void;
  marginPageCount?: number;
  range?: number;
}

const paginationStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
};

const Pagination = (props: PaginationProps) => {

  const onChange = (selectedItem: { selected: number }): void => {
    if (props.onPageChange === undefined) {
        return;
    }
    return props.onPageChange(selectedItem.selected);
  };

  return (
    <div style={paginationStyle}>
      <ReactPaginate
        initialPage={props.currentPage}
        pageCount={props.totalPage}
        pageRangeDisplayed={props.range ? props.range : 5}
        marginPagesDisplayed={props.marginPageCount ? props.marginPageCount : 2}
        onPageChange={onChange}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        previousLabel="‹"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        nextLabel="›"
        breakClassName="page-item disabled"
        breakLinkClassName="page-link disabled"
        activeClassName="active"
      />
    </div>
  );
};

export default Pagination;
// @flow
import React from 'react';
import range from 'lodash/range';
// import { connect } from 'react-redux';

// import * as selectors from '../reducers';
// import * as actions from '../actions';
// import { PAGE_SIZE } from '../settings';

type PaginationLinkType = {
  page: number,
  onPageFetch: Function,
  filters: Object,
  isCurrent: boolean
};
type PaginationType = {
  show: boolean,
  pages: number,
  currentPage: number,
  filters: Object,
  onPageFetch: Function
}

const PaginationLink = ({
  page,
  onPageFetch,
  filters,
  isCurrent }: PaginationLinkType) => (
  <a
    className={ 'button only-icon load-more in-clear-background page-link ' + (isCurrent ? 'button-primary': '')}
    onClick={ () => onPageFetch(page, filters) }>
    { page }
  </a>
);

export const Pagination = ({
  show = true,
  pages,
  currentPage,
  filters,
  onPageFetch }: PaginationType) => (
  <div className="pagination">
    {
      show &&
      range(1, pages + 1).map(page => <PaginationLink
        key={ page }
        page={ page }
        isCurrent={ page === currentPage }
        filters={ filters }
        onPageFetch={ onPageFetch } />)
    }
  </div>
);

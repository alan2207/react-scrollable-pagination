import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import ReactScrollablePagination from 'react-scrollable-pagination';
import api from '../api';

const Scroller = withRouter(ReactScrollablePagination);

const Fixed = () => (
  <div className="Fixed">
    <Scroller
      className=""
      style={{height: '70vh', border: '1px solid black'}}
      pageParam="page"
      fixed
      fetchData={api(50)}
      dataSelector={res => res}
      metaSelector={res => ({totalPages: 10})}
      loader={
        <div className="loader">
          <div />
          <div />
        </div>
      }
      beforeInitialLoad={() => console.log('Initi')}
      afterInitialLoad={() => console.log('Done')}
    >
      {data => (
        <div className="data-container">
          {data.map(item => (
            <div className="list-item" key={item}>
              <Link to={`/item/${item}`}>Item {item}</Link>
            </div>
          ))}
        </div>
      )}
    </Scroller>
  </div>
);

export default Fixed;

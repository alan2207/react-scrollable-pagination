import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const Nav = ({location: {pathname}}) => (
  <div className="Nav">
    <div
      style={{
        display: 'flex',

        justifyContent: 'space-around',
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/fixed">Fixed</Link>
      <Link to="/window-scrollable">Window Scrollable</Link>
    </div>
    <div>
      {pathname.includes('fixed') && (
        <React.Fragment>
          <h3>Fixed</h3>
          <p>
            If you want the div to be fixed and scrollable, you must give a
            fixed height to the component so it can become scrollable.
          </p>
        </React.Fragment>
      )}
      {pathname.includes('window-scrollable') && (
        <React.Fragment>
          <h3>Non Fixed - Window Scrollable</h3>
          <p>
            If you omit fixed prop, the whole page will become scrollable and
            the component will be controlled by window scroll.
          </p>
        </React.Fragment>
      )}
    </div>
  </div>
);

export default withRouter(Nav);

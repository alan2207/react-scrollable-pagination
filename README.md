# react-scrollable-pagination

> React component for paginating data by scrolling...

[![NPM](https://img.shields.io/npm/v/react-scrollable-pagination.svg)](https://www.npmjs.com/package/react-scrollable-pagination)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### [Demo](http://react-scrollable-pagination.surge.sh)

## Install

```bash
npm install --save react-scrollable-pagination

or:

yarn add react-scrollable-pagination
```

## Usage

```jsx
import React from 'react';
import ReactScrollablePagination from 'react-scrollable-pagination';
import {withrouter} from 'react-router-dom';

// inject history and location props
const Scroller = withRouter(ReactScrollablePagination);

const Component = () => (
  <div>
    <h3>Example</h3>
    <Scroller
      className="scroller"
      style={{height: '70vh', border: '1px solid black'}}
      pageParam="page"
      fixed
      fetchData={api}
      dataSelector={res => res}
      metaSelector={res => ({totalPages: 10})}
      loader={<div className="loader" />}
      beforeInitialLoad={() => console.log('Initi')}
      afterInitialLoad={() => console.log('Done')}
    >
      {data =>
        data.map(item => (
          <div key={item}>
            <Link to={`/item/${item}`}>{item}</Link>
          </div>
        ))
      }
    </Scroller>
  </div>
);
```

For more detailed example you can check out the `examples` folder.

### Props:

#### children | function | required

Render prop function that provides data that should be rendered.

#### history | object | required

History object that should be provided by the router. It will automatically be
provided by wrapping the component in `withRouter` HOC.

#### location | object | required

Location object that should be provided by the router It will automatically be
provided by wrapping the component in `withRouter` HOC.

#### fetchData | function | required

Function that will fetch the data. It's return value must be a promise.

#### dataSelector | function | required

Function that extracts the data from resolved promise returned by fetchData
function.

#### metaSelector | function | required

Function that extracts the meta data from resolved promise returned by fetchData
function. meta object must contain `totalPages` property.

#### className | string | default: ''

Style your component with classes.

#### style | object | default: {}

Custom styles for the component.

#### pageParam | string | default: 'page'

The query parameter that will control pagination.

#### fixed | boolean | default: false

Checks if the component should be scrollable or not.

#### loader | JSX element | default: `<div>Loading...</div>`

Custom loader to display on top or bottom of the component while loading more
data.

#### beforeInitialLoad | function | default: noop function

Function that gets triggered when the component is mounted and before fetching
the data. Convinient to show some loader spinner until the initial data is
loaded.

#### afterInitialLoad | function | default: noop function

Function that gets triggered when the result of fetchData has resolved.
Convinient to hide loader when the data has been loaded.

## License

MIT © [alan2207](https://github.com/alan2207)

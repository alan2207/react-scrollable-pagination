# react-scrollable-pagination

> React component for scrollable bidirectional data pagination...

[![NPM](https://img.shields.io/npm/v/react-scrollable-pagination.svg)](https://www.npmjs.com/package/react-scrollable-pagination)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### [Demo](http://react-scrollable-pagination.surge.sh)

![Demo](demo.gif?raw=true 'Demo')

## Why use it?

With normal infinite scroll, you would scroll the content couple of pages down,
navigate to different screen and when you want to return to your paginated list
of content, it would be restarted to the first page, and your loaded content
would be gone. You would have to scroll over again, which is very annoying.
Unless you somehow keep track of the state and which page you are currently on.
This is why you would use something like this component. It keeps track of state
changes internally and you don't have to worry about it. Just tell the component
how you want to fetch and display the content and you are good to go.

## How does it work?

The user starts scrolling. When bottom or top is reached, it reads the
`pageParam` query parameter from the URL, updates it depending on which page are
you trying to load, and then pushes the new URL via `history`. Then the updated
query parameter value is being passed to `fetchData` function and new data is
being fetched. The state of the component is replaced with the new state and the
data is being rerendered via render prop function.

## Installation

```bash
npm install --save react-scrollable-pagination
```

or

```bash
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
      fetchData={page => {
        return fetch(`${URL}?page=${page}`);
      }}
      dataSelector={res => res}
      metaSelector={res => res.meta || {totalPages: 10}}
      loader={<div className="loader" />}
      beforeInitialLoad={() => console.log('Init')}
      afterInitialLoad={() => console.log('Done')}
    >
      /* you will probably need to give minHeight of the div to be at least the
      same as the height of the component itself, to maintain scrollability even
      when there is not enough items to overflow. */
      <div style={{minHeight: '70vh'}}>
        {data =>
          data.map(item => (
            <div key={item}>
              <Link to={`/item/${item}`}>{item}</Link>
            </div>
          ))
        }
      </div>
    </Scroller>
  </div>
);
```

For more detailed example you can check out the `example` folder.

### Props

<table class="tg">
  <tr>
    <th class="tg-s6z2">Prop</th>
    <th class="tg-s268">type</th>
    <th class="tg-s268">isRequired</th>
    <th class="tg-s268">defaultValue</th>
    <th class="tg-s268">Description</th>
  </tr>
  <tr>
    <td class="tg-s268">children</td>
    <td class="tg-s268">function</td>
    <td class="tg-s268">true</td>
    <td class="tg-s268"></td>
    <td class="tg-s268">Render prop function that provides data that should be rendered.</td>
  </tr>
  <tr>
    <td class="tg-s268">history</td>
    <td class="tg-s268">object</td>
    <td class="tg-s268">true</td>
    <td class="tg-s268"></td>
    <td class="tg-s268">History object that should be provided by the router. It can be provided by wrapping the component in `withRouter` HOC.</td>
  </tr>
  <tr>
    <td class="tg-s268">location</td>
    <td class="tg-s268">object</td>
    <td class="tg-s268">true</td>
    <td class="tg-s268"></td>
    <td class="tg-s268">Location object that should be provided by the router It can be provided by wrapping the component in `withRouter` HOC.</td>
  </tr>
  <tr>
    <td class="tg-0lax">fetchData</td>
    <td class="tg-0lax">function</td>
    <td class="tg-0lax">true</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">Function that will fetch the data. It accepts 'page' parameter and It's return value must be a promise.</td>
  </tr>
  <tr>
    <td class="tg-0lax">dataSelector</td>
    <td class="tg-0lax">function</td>
    <td class="tg-0lax">true</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">Function that extracts the data from resolved promise that is being returned by 'fetchData' function. <br>This data will be provided as data inside render prop function</td>
  </tr>
  <tr>
    <td class="tg-0lax">metaSelector</td>
    <td class="tg-0lax">function</td>
    <td class="tg-0lax">true</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">Function that extracts the meta data from resolved promise that is being returned by fetchData function. The meta object must contain `totalPages` property.</td>
  </tr>
  <tr>
    <td class="tg-0lax">className</td>
    <td class="tg-0lax">string</td>
    <td class="tg-0lax">false</td>
    <td class="tg-0lax">""</td>
    <td class="tg-0lax">Style your component with classes.</td>
  </tr>
  <tr>
    <td class="tg-0lax">style</td>
    <td class="tg-0lax">object</td>
    <td class="tg-0lax">false</td>
    <td class="tg-0lax">{}</td>
    <td class="tg-0lax">Custom inline styles for the component.</td>
  </tr>
  <tr>
    <td class="tg-0lax">pageParam</td>
    <td class="tg-0lax">string</td>
    <td class="tg-0lax">false</td>
    <td class="tg-0lax">"page"</td>
    <td class="tg-0lax">The query parameter that will control pagination.</td>
  </tr>
  <tr>
    <td class="tg-0lax">fixed</td>
    <td class="tg-0lax">boolean</td>
    <td class="tg-0lax">false</td>
    <td class="tg-0lax">false</td>
    <td class="tg-0lax">Should be set if the component should become scrollable. In that case it must have fixed height. If false, window scroll will control pagination.</td>
  </tr>
  <tr>
    <td class="tg-0lax">loader</td>
    <td class="tg-0lax">JSX element</td>
    <td class="tg-0lax">false</td>
    <td class="tg-0lax">&lt;/div&gt;Loading...&lt;/div&gt;</td>
    <td class="tg-0lax">Custom loader to display on top or bottom of the component while loading more data.</td>
  </tr>
  <tr>
    <td class="tg-0lax">beforeInitialLoad</td>
    <td class="tg-0lax">function</td>
    <td class="tg-0lax">false</td>
    <td class="tg-0lax">noop func</td>
    <td class="tg-0lax">Function that is triggered when the component is mounted and before fetching the data. Convenient to display loading spinner until the initial data is loaded.</td>
  </tr>
  <tr>
    <td class="tg-0lax">afterInitialLoad</td>
    <td class="tg-0lax">function</td>
    <td class="tg-0lax">false</td>
    <td class="tg-0lax">noop func</td>
    <td class="tg-0lax">Function that is triggered when the result of fetchData is resolved. Convenient to hide loading spinner once the data has been loaded.</td>
  </tr>
</table>

### Todo

- Make it independent of react-router (At the moment, the user must wrap it
  inside `withRouter` to be able to use it properly )
- Add option to add top and bottom offset. (At the moment, it scrolls up and
  down when scroller reaches top and bottom.)

## License

MIT © [alan2207](https://github.com/alan2207)

import React from 'react';
import qs from 'query-string';
import {object, string, bool, func, node, shape} from 'prop-types';

import './styles.css';

class InfinitePage extends React.Component {
  static propTypes = {
    style: object,
    className: string,
    pageParam: string,
    fixed: bool,
    fetchData: func.isRequired,
    dataSelector: func.isRequired,
    metaSelector: func.isRequired,
    loader: node,
    beforeInitialLoad: func,
    afterInitialLoad: func,
    children: func.isRequired,
    history: shape({push: func, listen: func}).isRequired,
    location: shape({
      pathname: string,
      search: string,
    }).isRequired,
  };

  static defaultProps = {
    style: {},
    className: '',
    pageParam: 'page',
    fixed: false,
    loader: <div>Loading...</div>,
    beforeInitialLoad: () => {},
    afterInitialLoad: () => {},
  };

  state = {
    data: [],
    meta: null,
    isLoading: false,
    scrollingDirection: '',
  };

  currentPage =
    qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    })[this.props.pageParam] || 1;

  componentDidMount() {
    const {
      fixed,
      pageParam,
      fetchData,
      dataSelector,
      metaSelector,
      beforeInitialLoad,
      afterInitialLoad,
    } = this.props;

    if (fixed) {
      this.scroller.addEventListener('scroll', this.handleScroll);
    } else {
      window.addEventListener('scroll', this.handleScroll);
    }
    beforeInitialLoad();

    fetchData(this.currentPage).then(res => {
      this.setState({data: dataSelector(res), meta: metaSelector(res)});
      afterInitialLoad();
    });

    this.unlisten = this.props.history.listen(location => {
      const fromPage = Number(this.currentPage);

      const toPage = Number(
        qs.parse(location.search, {
          ignoreQueryPrefix: true,
        })[pageParam] || 1,
      );

      this.currentPage = toPage;

      this.setState({isLoading: true}, () => {
        fetchData(this.currentPage).then(res => {
          this.setState({
            data: dataSelector(res),
            meta: metaSelector(res),
            isLoading: false,
          });
          if (this.scroller) {
            if (fixed) {
              if (toPage > fromPage) {
                this.scroller.scrollTop = 10;
              } else {
                this.scroller.scrollTop =
                  this.scroller.scrollHeight - this.scroller.clientHeight - 10;
              }
            } else {
              if (toPage > fromPage) {
                this.scroller.scrollTop = 10; // TODO - make it controllable for non-fixed
              } else {
                this.scroller.scrollTop =
                  this.scroller.scrollHeight - window.innerHeight - 10;
              }
            }
          }
        });
      });
    });
  }

  componentWillUnmount() {
    this.unlisten();
    if (this.props.fixed) {
      this.scroller.removeEventListener('scroll', this.handleScroll);
    } else {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  get shouldScrollUp() {
    return this.scroller.scrollTop === 0 && this.currentPage > 1;
  }

  get shouldScrollDown() {
    if (this.props.fixed) {
      return (
        this.scroller.scrollTop + this.scroller.clientHeight >=
          this.scroller.scrollHeight &&
        this.currentPage < this.state.meta.totalPages
      );
    } else {
      return (
        this.scroller.scrollHeight <=
          this.scroller.scrollTop + window.innerHeight &&
        this.currentPage < this.state.meta.totalPages
      );
    }
  }

  handleScroll = () => {
    if (this.scroller) {
      if (this.shouldScrollUp) {
        this.setState({scrollingDirection: 'up'});
        this.scroll(-1);
      }
      if (this.shouldScrollDown) {
        this.setState({scrollingDirection: 'down'});
        this.scroll(1);
      }
    }
  };

  scroll = step => {
    const {pageParam} = this.props;

    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });

    if (!query[pageParam]) {
      query[pageParam] = 1;
    }
    query[pageParam] = Number(query[pageParam]) + step;

    const search = qs.stringify(query);
    const {pathname} = this.props.location;

    if (!this.state.isLoading) {
      this.props.history.push(`${pathname}?${search}`);
    }
  };

  render() {
    const {fixed, className, style, loader, children} = this.props;

    return (
      <div
        className={`${fixed ? 'scrollable' : ''} ${className}`}
        style={style}
        ref={scroller =>
          (this.scroller = fixed
            ? scroller
            : document.scrollingElement || document.documentElement)
        }
      >
        {this.state.isLoading && this.state.scrollingDirection === 'up' && (
          <div className="loader-container">{loader}</div>
        )}
        {children(this.state.data)}
        {this.state.isLoading && this.state.scrollingDirection === 'down' && (
          <div className="loader-container">{loader}</div>
        )}
      </div>
    );
  }
}

export default InfinitePage;

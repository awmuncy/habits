import React, { Component } from 'react';
import { Checkin } from '../store/ConnectedComponents.js';



class Checkins extends Component {

  constructor(props) {
    super(props);
    this.state = {
      render: 5
    };

    this.more = this.more.bind(this);
    this.myRef = React.createRef();

  }



  more() {
    let node = this.myRef.current;
    let isRelativelyEmpty = node.scrollWidth <= node.offsetWidth;
    let isScrolledToNearEnd = node.offsetWidth + node.scrollLeft > node.scrollWidth - 100;

    if ((isRelativelyEmpty || isScrolledToNearEnd) && this.props.checkins.length >= this.state.render) {
      this.setState({
        render: this.state.render + 1
      });
    }
  }

  componentDidMount() {
    this.more();
  }

  componentDidUpdate() {
    this.more();
  }


  render() {

    let checkins;
    checkins = this.props.checkins ? this.props.checkins : [];

    const portionToRender = checkins.slice(0 - this.state.render);

    const checkinList = portionToRender.map((checkin) =>
      <Checkin
        key={checkin.checkinFor}
        checkinFor={checkin.checkinFor}
        id={this.props.habit_id}
      />
    );



    return (
      // eslint-disable-next-line
      <div className='checkin-window' 
        onScroll={this.more} onClick={this.more} ref={this.myRef}>
        <ul className='checkins'>
          { checkinList }
        </ul>
      </div>
    );
  }
}


export {
  Checkins
};

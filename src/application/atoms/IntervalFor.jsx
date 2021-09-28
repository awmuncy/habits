import React, { Component } from 'react';
import moment from 'moment';

class IntervalFor extends Component {



  render() {
    let i = moment(this.props.checkinFor, 'YYYY-MM-DD');
    let output;
    let iend, sub, end;
    switch (this.props.frame) {
    case 'quarterly':

      return (
        <div className='title'>
          <span className='focus'>{i.format('Qo')} Quarter</span>
          <span className='sub'>{i.format('YYYY')}</span>
        </div>
      );

    case 'annually':

      return (
        <div className='title'>
          <span className='focus'>{i.format('YYYY')}</span>
        </div>
      );

    case 'monthly':

      return (
        <div className='title'>
          <span className='focus'>{i.format('MMMM')}</span>
          <span className='sub'>{i.format('YYYY')}</span>
        </div>
      );

    case 'bimonthly':

      return (
        <div className='title'>
          <span className='focus'>{i.format('MMM')} & {i.add('M', 1).format('MMM')}</span>
          <span className='sub'>{i.format('YYYY')}</span>
        </div>
      );

    case 'weekly':
      sub;
      iend = i.clone();
      iend.add(7, 'd');
      end = i.format('M') === iend.format('M') ? iend.format('D') : iend.format('MMM, D');

      return (
        <div className='title'>
          <span className='sub'>{i.format('YYYY')}</span>
          <span className='focus'>Week {i.format('W')}</span>
          <span className='sub'>{i.format('MMM, D')} - {end}</span>
        </div>
      );

    case 'biweekly':
      sub;
      iend = i.clone();
      iend.add(14, 'd');
      end = i.format('M') === iend.format('M') ? iend.format('D') : iend.format('MMM, D');

      return (
        <div className='title'>
          <span className='sub'>{i.format('YYYY')}</span>
          <span className='focus'>Week {i.format('W')} & {iend.format('W')}</span>
          <span className='sub'>{i.format('MMM, D')} - {end}</span>
        </div>
      );

    case 'twiceannually':
      return (
        <div className='title'>
          <span className='sub'>{i.format('YYYY')}</span>
          <span className='focus'>{i.format('Q') === '1' || i.format('Q') === '2' ? 'First half' : 'Second half'}</span>
        </div>
      );
    case 'twicemonthly':
      return (
        <div className='title'>
          <span className='focus'>{i.format('MMMM')}</span>
          <span className='sub'>{i.format('DD') >= 15 ? 'First half' : 'Second half'}</span>
        </div>
      );
    default:
      return (
        <div className='title'>
          <span className='focus'>{i.format('dddd')}</span>
          <span className='sub'>{i.format('MMM')} </span>
          <span className='sub'>{i.format('D')}, </span>
          <span className='sub'>{i.format('YYYY')}</span>
        </div>
      );
    }
  }
}


export {
  IntervalFor
};

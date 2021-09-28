import React, { Component } from 'react';


class IntervalSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeframe: 'daily',
      sunday   : false,
      monday   : true,
      tuesday  : true,
      wednesday: true,
      thursday : true,
      friday   : true,
      bonus    : true

    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    let subselect = null;
    if (this.state.timeframe === 'days') {
      subselect
                = <div className='select'>
          <ul className='weekdays-select'>
            <li>
              <input
                name='sunday'
                id='sunday'
                type='checkbox'
                defaultChecked={this.state.sunday}
                onChange={this.handleInputChange}
              />
              <label htmlFor='sunday'>
                                S<span>u</span>
              </label>
            </li>
            <li>
              <input
                type='checkbox'
                name='monday'
                id='monday'
                defaultChecked={this.state.monday}
                onChange={this.handleInputChange}
              />
              <label htmlFor='monday'>
                                M
              </label>
            </li>
            <li>
              <input
                type='checkbox'
                name='tuesday'
                id='tuesday'
                defaultChecked={this.state.tuesday}
                onChange={this.handleInputChange}
              />
              <label htmlFor='tuesday'>
                                T<span>u</span>
              </label>
            </li>
            <li>
              <input
                type='checkbox'
                name='wednesday'
                id='wednesday'
                defaultChecked={this.state.wednesday}
                onChange={this.handleInputChange}
              />
              <label htmlFor='wednesday'>
                                W
              </label>
            </li>
            <li>
              <input
                type='checkbox'
                name='thursday'
                id='thursday'
                defaultChecked={this.state.thursday}
                onChange={this.handleInputChange}
              />
              <label htmlFor='thursday'>
                                T<span>h</span>
              </label>
            </li>
            <li>
              <input
                type='checkbox'
                name='friday'
                id='friday'
                defaultChecked={this.state.friday}
                onChange={this.handleInputChange}
              />
              <label htmlFor='friday'>
                                F
              </label>
            </li>
            <li>
              <input
                type='checkbox'
                name='saturday'
                id='saturday'
                checked={this.state.saturday}
                onChange={this.handleInputChange}
              />
              <label htmlFor='saturday'>
                                S<span>a</span>
              </label>
            </li>
          </ul>
          <div>
            <label>Off days are bonus
              <input type='checkbox' name='bonus' checked={this.state.bonus} onChange={this.handleInputChange} />
            </label>
          </div>
        </div>

      ;
    } else if (this.state.timeframe === 'annually') {
      subselect
                = <ul className='yearly-select'>
          <li>
            <input type='checkbox' name='annually' checked={this.state.annually} />
                        Anually
          </li>
          <li>
            <input type='checkbox' name='twiceannually' checked={this.state.twiceannually} />
                        Twice Annually
          </li>
          <li>
            <input type='checkbox' name='quarterly' checked={this.state.quarterly} />
                        Quarterly
          </li>
        </ul>
      ;
    } else if (this.state.timeframe === 'monthly') {
      subselect
                = <ul className='monthly-select'>
          <li>
            <input type='checkbox' name='monthly' checked={this.state.annually} />
                        Once a month
          </li>
          <li>
            <input type='checkbox' name='twicemonthly' checked={this.state.annually} />
                        Twice a month
          </li>
          <li>
            <input type='checkbox' name='bimonthly' checked={this.state.annually} />
                        Every other month
          </li>
        </ul>
      ;
    } else if (this.state.timeframe === 'daily') {
      subselect
                = <div className='daily'>
                    Every. Single. Day.
        </div>
      ;
    } else {
      subselect
                = <div className='weekly'>
          <h3>Weekly</h3>
          <label>Biweekly
            <input type='checkbox' name='biweekly' checked={this.state.biweekly} />
          </label>

        </div>
      ;
    }


    let auto = false;
    if (this.state.timeframe === 'daily') {
      auto = true;
    }

    return (
      <div className='interval-select'>
        <div className='timeframe-select'>
          <input
            type='radio'
            name='timeframe'
            value='daily' id='daily'
            checked={auto}
            required
            onChange={this.handleInputChange}
          />
          <label htmlFor='daily'>Every Day</label>
          <input
            type='radio'
            name='timeframe'
            value='days' id='days'
            required
            onChange={this.handleInputChange}
          />
          <label htmlFor='days'>Days</label>
          <input
            type='radio'
            name='timeframe'
            value='weekly'
            id='weekly'
            onChange={this.handleInputChange}
          />
          <label htmlFor='weekly'>Weekly</label>
          <input
            type='radio'
            name='timeframe'
            value='monthly'
            id='monthly'
            onChange={this.handleInputChange}
          />
          <label htmlFor='monthly'>Monthly</label>
          <input
            type='radio'
            name='timeframe'
            value='annually'
            id='annually'
            onChange={this.handleInputChange}
          />
          <label htmlFor='annually'>Annually</label>
        </div>
        {subselect}
      </div>
    );
  }
}

export {
  IntervalSelect
};

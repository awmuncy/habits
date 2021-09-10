import React, { useState } from 'react';
import { connect } from 'react-redux';
import { S_EphemeralForm } from '../store/connectors.js';



function C_EphemeralForm(props) {


  let [title, setTitle] = useState(props.title);

  let [cron, setCron] = useState(props.cron);
  let [actions, setActions] = useState(props.actions);
  let [completions, setCompletions] = useState(props.completions);
  let [seconds, setSeconds] = useState('');
  let [minutes, setMinutes] = useState('');
  let [hours, setHours] = useState('');
  let [days, setDays] = useState('');
  let [weeks, setWeeks] = useState('');
  let [months, setMonths] = useState('');

  return (
    <form action='/reminder' method='POST' id='#add-reminder' className='ephemeral' onSubmit={e => {
      e.preventDefault();
      props.sendForm({
        title,
        actions,
        completions,
        cron,
        seconds,
        minutes,
        hours,
        days,
        weeks,
        months
      });
    }}>
      <label>Name:<input type='text' name='title' onChange={e=>setTitle(e.target.value)} value={title} /></label>

      {props.id && <input type='hidden' name='id' value='{{id}}'/>}

      <fieldset>
        <h2>Interval</h2>
        <h3>When this reminder has been marked complete, the next reminder will be added after this long:</h3>
        <span><em>Note: These intervals are cumulative</em></span>
        <label>Seconds:
          <input type='number' name='seconds' value={ seconds } onChange={e=>setSeconds(e.target.value)} /></label>
        <label>Minutes:
          <input type='number' name='minutes' value={ minutes } onChange={e=>setMinutes(e.target.value)} /></label>
        <label>Hours:
          <input type='number' name='hours' value={ hours } onChange={e=>setHours(e.target.value)} /></label>
        <label>Days:
          <input type='number' name='days' value={ days } onChange={e=>setDays(e.target.value)} /></label>
        <label>Weeks:
          <input type='number' name='weeks' value={ weeks } onChange={e=>setWeeks(e.target.value)} /></label>
        <label>Months:
          <input type='number' name='months' value={ months } onChange={e=>setMonths(e.target.value)} /></label>
      </fieldset>

      <fieldset>
        <h2>Pin to time</h2>
        <label>Cron:
          <input
            type='text'
            name='cron'
            // eslint-disable-next-line
            pattern='^((((\d+,)+\d+|(\d+(\/|-|#)\d+)|\d+L?|\*(\/\d+)?|L(-\d+)?|\?|[A-Z]{3}(-[A-Z]{3})?) ?){5,7})$|(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)' 
            value={cron}
            onChange={e=>setCron(e.target.value)}
          /></label>

      </fieldset>
      <fieldset>
        <h2>Reminder Actions</h2>
        <span><em>When it's time to reminder, perform these actions:</em></span>

        <div id='actions-list'>
          {actions.map((notifier, key) => {
            return (
              <>
                <fieldset>
                  <h3>Reminder Action</h3>
                  <label>
                                    Action title:
                    <input type='text' name='action-title' value={notifier.title} onChange={e => {
                      const returnedTarget = actions.slice();
                      returnedTarget[key].title = e.target.value;

                      setActions(returnedTarget);
                    }} />
                  </label>
                  <label>
                                    Action url:
                    <input type='text' name='action-url' value={notifier.action} onChange={e => {
                      const returnedTarget = actions.slice();
                      returnedTarget[key].action = e.target.value;

                      setActions(returnedTarget);
                    }} />
                  </label>
                </fieldset>
                <button class='remove-this-action'>Remove This Action</button>
              </>
            );
          })}
        </div>
        <button type='button' id='add-another-action' onClick={e => {
          setActions([...actions, {title: '', action: ''}]);
        }}>Add another action</button>

      </fieldset>
      <fieldset>
        <h2>Completion Actions</h2>
        <span><em>When the reminder has been marked complete, do this:</em></span>
        {completions.map((successItem, key) => {
          return (
            <fieldset id='completed-list'>
              <h2>Completion Action</h2>
              <label>
                                Action title:
                <input type='text' value={successItem.title} name='completion-action-title' onChange={(e) => {
                  const returnedTarget = completions.slice();
                  returnedTarget[key].title = e.target.value;

                  setCompletions(returnedTarget);
                }} />
              </label>
              <label>
                                Action url:
                <input type='text' value={successItem.action} name='completion-action-url' onChange={(e) => {
                  const returnedTarget = completions.slice();
                  returnedTarget[key].action = e.target.value;

                  setCompletions(returnedTarget);
                }}
                />
              </label>
            </fieldset>
          );
        })}

      </fieldset>
      <input type='submit' value='Submit' />

    </form>

  );

}

let EphemeralForm = connect(...S_EphemeralForm)(C_EphemeralForm);

export {
  EphemeralForm
};

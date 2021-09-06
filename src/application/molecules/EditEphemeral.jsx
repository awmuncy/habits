import React, { useState } from 'react';
import { connect } from 'react-redux';
import { S_EphemeralForm } from '../store/connectors';



function C_EphemeralForm(props) {

    
    var [title, setTitle] = useState(props.title);

    var [cron, useCron] = useState(props.cron);
    var [notifiers, setNotifiers] = useState(props.notifiers);
    var [successActions, setSuccessActions] = useState(props.successActions);

    return (
        <form action="/reminder" method="POST" id="#add-reminder" className="ephemeral" onSubmit={e => {
            e.preventDefault();
            props.sendForm({
                title,
                successActions,
                notifiers,
                cron
            });
        }}>
            <label>Name:<input type="text" name="title" onChange={e=>setTitle(e.target.value)} value={title} /></label>
            
            {props.id && <input type="hidden" name="id" value="{{id}}"/>}

            <fieldset>
                <h2>Interval</h2>
                <h3>When this reminder has been marked complete, the next reminder will be added after this long:</h3>
                <span><em>Note: These intervals are cumulative</em></span>
                <label>Seconds:  <input type="number" name="seconds" value={ props.interval.seconds } /></label>
                <label>Minutes:  <input type="number" name="minutes" value={ props.interval.minutes } /></label>
                <label>Hours:  <input type="number" name="hours" value={ props.interval.hours } /></label>
                <label>Days:  <input type="number" name="days" value={ props.interval.days } /></label>
                <label>Weeks:  <input type="number" name="weeks" value={ props.interval.weeks } /></label>
                <label>Months:  <input type="number" name="months" value={ props.interval.months } /></label>
            </fieldset>

            <fieldset>
                <h2>Pin to time</h2>
                <label>Cron:  <input type="text" name="cron" pattern="^((((\d+,)+\d+|(\d+(\/|-|#)\d+)|\d+L?|\*(\/\d+)?|L(-\d+)?|\?|[A-Z]{3}(-[A-Z]{3})?) ?){5,7})$|(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)" value={props.cron} /></label>

            </fieldset>
            <fieldset>
                <h2>Reminder Actions</h2>
                <span><em>When it's time to reminder, perform these actions:</em></span>
                
                <div id="actions-list">
                    {notifiers.map((notifier, key) => {
                        return (
                            <>
                            <fieldset>
                                <h3>Reminder Action</h3>
                                <label>
                                    Action title: 
                                    <input type="text" name="action-title" value={notifier.title} onChange={e => {
                                        const returnedTarget = notifiers.slice();
                                        returnedTarget[key].title = e.target.value;
                                        
                                        setNotifiers(returnedTarget);
                                    }} />
                                </label>
                                <label>
                                    Action url: 
                                    <input type="text" name="action-url" value={notifier.action} />
                                </label>
                            </fieldset>
                            <button class="remove-this-action">Remove This Action</button>
                            </>
                        );
                    })}
                </div>
                <button type="button" id="add-another-action" onClick={e => {
                    setNotifiers([...notifiers, {title: "", action: ""}]);
                }}>Add another action</button>

            </fieldset>
            <fieldset>
                <h2>Completion Actions</h2>
                <span><em>When the reminder has been marked complete, do this:</em></span>
                {successActions.map(successItem => {
                    return (
                        <fieldset id="completed-list">
                            <h2>Completion Action</h2>
                            <label>
                                Action title: 
                                <input type="text" value={successItem.title} name="completion-action-title" />
                            </label>
                            <label>
                                Action url: 
                                <input type="text"  value={successItem.action} name="completion-action-url" />
                            </label>
                        </fieldset>
                    );
                })}

            </fieldset>
            <input type="submit" value="Submit" />
                
        </form>

    );

}

var EphemeralForm = connect(...S_EphemeralForm)(C_EphemeralForm);

export {
    EphemeralForm
}
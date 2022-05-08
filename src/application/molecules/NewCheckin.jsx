import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { createCheckin, sleepHabit } from '../lib/requests.js';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';

function TimedCheckinButtons(props) {
  return (
    <div className='checkin-time-buttons'>
      <button onClick={() => {

        props.close();
      }}><i className='fa fa-close'></i></button>
      <button onClick={() => {
        props.close();
        createCheckin(props._id, props.value.getTime());
      }}><i className='fa fa-check'></i></button>
      <button onClick={() => {
        props.setShowDate(!props.showDate);
      }}>{props.showDate ? 'Hide' : 'Show'} <i className='fa fa-calendar'></i></button>
    </div>
  );
}

function TimedCheckin(props) {
  let [value, setValue] = useState(new Date());
  let [showDate, setShowDate] = useState(false);

  return ReactDOM.createPortal(

    <div className='checkin-time-picker'>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          showTodayButton
          todayText='now'
          openTo={showDate ? 'day' : 'hours'}
          hideTabs={true}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          leftArrowButtonText='Open previous month'
          rightArrowButtonText='Open next month'
          maxDateTime={new Date()}
          minDateTime={new Date(props.checkins[0])}
          renderInput={(params) => {

            return <TextField {...params} />;
          }

          }
        />
        <TimedCheckinButtons {...props} setShowDate={setShowDate} showDate={showDate} value={value} />
      </LocalizationProvider>
    </div>
    , document.getElementById('modal-portal')

  );

}


export default function NewCheckin(props) {
  let timePicker = null;
  const [pickerOpen, setPickerOpen] = useState(false);
  if (pickerOpen) {
    timePicker = <TimedCheckin close={()=>setPickerOpen(false)} {...props} />;
  }
  let mode = props.profile.mode;
  return (
    <li className={`checkin ${mode}`}>
      <h2 className='title'><span className='focus'>New Checkin</span></h2>
      <span className='score'>+</span>

      <button
        aria-label='Yes, I did check in'
        className='check-yes'
        onClick={async(e) => {
          let checkinResponse = await createCheckin(props._id);
        }}
      ></button>
      <button
        aria-label='No, I did not check in'
        className='check-time'
        onClick={() => {
          setPickerOpen(true);
        }}
      ></button>
      {timePicker}
    </li>
  );
}


export function breakItDown(mTime) {
  let day = 24 * 60 * 60 * 1000;
  let hour = 60 * 60 * 1000;
  let minute = 60 * 1000;
  let second = 1000;

  let days = Math.floor(mTime / day);
  let mHoursAndMinutes = mTime % day;
  let hours = Math.floor(mHoursAndMinutes / hour);
  let mMinutes = mHoursAndMinutes % hour;
  let minutes = Math.floor(mMinutes / minute);

  let mSeconds = mMinutes % minute;
  let seconds = mSeconds / second;


  return {
    days,
    hours,
    minutes,
    seconds
  };
};

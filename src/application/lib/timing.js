import { formatDistance, isBefore } from 'date-fns';
import { breakItDown } from './breakMilsToReadableTime.js';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const intervalCount = interval => {
  return interval;
  let mills = 0;

  mills += interval.days * DAY;
  mills += interval.hours * HOUR;
  mills += interval.minutes * MINUTE;
  mills += interval.seconds * SECOND;

  return mills;
};

export function distToUrgent(interval, targetWindow, checkin) {
  let totalMills = intervalCount(interval);
  let targetMills = intervalCount(targetWindow);
  checkin = checkin || 0;
  let timesUp = new Date(checkin + totalMills + targetMills);

  if (isBefore(timesUp, new Date())) {
    return 'Time is up';
  }

  return formatDistance(new Date(), timesUp);
};

export function inTargetWindow(interval, targetWindow, checkin) {


  let now = new Date().getTime();
  let distanceBetweenMoments = now - checkin;

  let abide = intervalCount(interval);
  let target = intervalCount(targetWindow) + abide;


  switch (true) {

  case distanceBetweenMoments < abide:
    return 'abide';
  case distanceBetweenMoments < target:
    return 'target';
  default:
    return 'urgent';

  }

};

export function intervalToString(interval, removeS = false) {
  interval = breakItDown(interval);
  let outputString = '';
  for (let timePeriod in interval) {
    let i = 0;
    if (interval[timePeriod] !== 0 && timePeriod !== '_id') {
      if (i > 0) { outputString += ', '; }
      outputString += interval[timePeriod] + ' ';
      outputString += removeS ? timePeriod.slice(0, -1) : timePeriod;
      i++;
    }
  }

  return outputString + ' ';
}

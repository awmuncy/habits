import moment from 'moment';

/*
    * @desc Compares checkin to date
    * @param string (MM-DD-YYYY) view_date - the date you're viewing in the application
    * @param string (MM-DD-YYYY) checkin_date - the stamped date from the checkin.
    * @param string (MM-DD-YYYY) checkin_comparison_date - If checkin can be completed after it's initial date
    * @return string - "past", "future", or "now"
*/
function compareToDueIn(view_date, checkin_date, checkin_comparison_date=null) {
    view_date = moment(view_date, "MM-DD-YYYY");
    checkin_date = moment(checkin_date, "MM-DD-YYYY");
    checkin_comparison_date = checkin_comparison_date===null ? '' : moment(view_date, "MM-DD-YYYY");

    
}

export default compareToDueIn;

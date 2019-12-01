import React from 'react';
import moment from 'moment';



var SetHabitDormancy = props => {

    

    return (
        <div className="set-habit-dormancy">
            Set habit to dormant with switch.
            If switch activated, set reactivation conditions
                - Date (via datapacker)
                - Habit Reaches Checkpoint

            (What do I do with checkins?
                - Array: dormany open, dormany close. Ugh.
            )
        </div>
    );
}

export default SetHabitDormancy; 
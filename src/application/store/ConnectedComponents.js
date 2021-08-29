import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import HabitTracker from '../page-templates/HabitTracker.jsx';
import GrandCentral from '../page-templates/GrandCentral.jsx';
import FloatingActionButton from '../molecules/FloatingActionButton.jsx';


import _NavSide from '../organisms/NavSide';
    import NavSideConnections from './connections/NavSide';
    var NavSide = connect(NavSideConnections.props, NavSideConnections.dispatches)(_NavSide);


import _ClosePane from '../molecules/NavTop/ClosePane.jsx';
    import ClosePaneConnections from './connections/ClosePane'
    var ClosePane = connect(ClosePaneConnections.props, ClosePaneConnections.dispatches)(_ClosePane);

import HeadBack from '../molecules/NavTop/HeadBack.jsx';
import _HeaderDefault from '../molecules/NavTop/HeaderDefault.jsx';
    import HeaderDefaultConnections from './connections/HeaderDefault';
    var HeaderDefault = connect(HeaderDefaultConnections.props, HeaderDefaultConnections.dispatches)(_HeaderDefault);





import _Habit from '../organisms/Habit.jsx';
    import HabitConnections from './connections/Habit';
    var Habit = connect(HabitConnections.props, HabitConnections.dispatches)(_Habit);

import _Habits from '../organisms/Habits.jsx';
    import HabitsConnections from './connections/Habits';
    var Habits = connect(HabitsConnections.props, HabitsConnections.dispatches)(_Habits);



import EssentialProgress from '../atoms/EssentialProgress.jsx';


import _Essentials from '../organisms/Essentials.jsx';
    import EssentialsConnections from './connections/Essentials';
    var Essentials = connect(EssentialsConnections.props, EssentialsConnections.dispatches)(_Essentials);

import IntervalSelect from '../molecules/IntervalSelect.jsx';


import _MomentumIndicator from '../atoms/MomentumIndicator.jsx';
    import MomentumIndicatorConncetions from './connections/MomentumIndicator';
    var MomentumIndicator = connect(MomentumIndicatorConncetions.props, MomentumIndicatorConncetions.dispatches)(_MomentumIndicator);


import _PinnedHabits from '../molecules/PinnedHabits.jsx';
    import PinnedHabitsConnections from './connections/PinnedHabits';
    var PinnedHabits = connect(PinnedHabitsConnections.props, PinnedHabitsConnections.dispatches)(_PinnedHabits);



/* Calendar */ 

import _HabitCalendar from '../molecules/calendars/HabitCalendar';
    import HabitCalendarConnections from './connections/HabitCalendar';
    var HabitCalendar = connect(HabitCalendarConnections.props, HabitCalendarConnections.dispatches)(_HabitCalendar);

import _HabitCalendarDaily from '../molecules/calendars/HabitCalendarDaily.jsx';
    import HabitCalendarDailyConnections from './connections/HabitCalendar';
    var HabitCalendarDaily = connect(HabitCalendarConnections.props, HabitCalendarConnections.dispatches)(_HabitCalendarDaily);


import _HabitCalendarMonthly from '../molecules/calendars/HabitCalendarMonthly.jsx';
    import HabitCalendarMonthlyConnections from './connections/HabitCalendar';
    var HabitCalendarMonthly = connect(HabitCalendarConnections.props, HabitCalendarConnections.dispatches)(_HabitCalendarMonthly);

import _ViewDate from '../molecules/ViewDate.jsx';
    import ViewDateConnections from './connections/ViewDate';
    var ViewDate = connect(ViewDateConnections.props, ViewDateConnections.dispatches)(_ViewDate);


import _Sorting from '../molecules/Sorting';
    import SortingConnections from './connections/Sorting';
    var Sorting = connect(SortingConnections.props, SortingConnections.dispatches)(_Sorting);

// Checkins
import Checkins from '../organisms/Checkins.jsx';
    

import _Checkin from '../molecules/Checkin.jsx';
    import CheckinConnections from './connections/Checkin';
    var Checkin = connect(CheckinConnections.props, CheckinConnections.dispatches)(_Checkin);

import IntervalFor from '../atoms/IntervalFor.jsx';


import _NewHabitGoal from '../molecules/NewHabitGoal';
    import NewHabitGoalConnections from './connections/NewHabitGoal';
    var NewHabitGoal = connect(NewHabitGoalConnections.props, NewHabitGoalConnections.dispatches)(_NewHabitGoal);

import _HabitGoals from '../organisms/HabitGoals';
    import HabitGoalsConnections from './connections/HabitGoals';
    var HabitGoals = connect(HabitGoalsConnections.props, HabitGoalsConnections.dispatches)(_HabitGoals);




import SortablePlanks from '../atoms/SortablePlanks.jsx';

export { Recalls } from '../organisms/Recalls.jsx';
export { RecallCard } from '../molecules/RecallCard.jsx';
export { default as BoolIcon } from '../atoms/BoolIcon.jsx';


export {
    HabitTracker,
    GrandCentral,
    FloatingActionButton,
    NavSide,
    ClosePane,
    HeadBack,
    HeaderDefault,
    Habit,
    Habits,
    EssentialProgress,
    Essentials,
    IntervalSelect,
    MomentumIndicator,
    PinnedHabits,
    HabitCalendar,
    HabitCalendarDaily,
    HabitCalendarMonthly,
    Sorting,
    ViewDate,
    Checkins,
    Checkin,
    IntervalFor,
    SortablePlanks,
    NewHabitGoal,
    HabitGoals
}
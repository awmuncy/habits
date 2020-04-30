import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import HabitTracker from '../components/navigation/HabitTracker.jsx';
import GrandCentral from '../components/navigation/GrandCentral.jsx';
import FloatingActionButton from '../components/navigation/FloatingActionButton.jsx';


import _NavTop from '../components/navigation/NavTop.jsx';
    import NavTopConnections from './connections/NavTop';
    var NavTop = withRouter(connect(NavTopConnections.props, NavTopConnections.dispatches)(_NavTop));

import _NavSide from '../components/navigation/NavSide.jsx';
    import NavSideConnections from './connections/NavSide';
    var NavSide = connect(NavSideConnections.props, NavSideConnections.dispatches)(_NavSide);

import NavBottom from '../components/navigation/NavBottom.jsx';
import Notifications from '../components/navigation/Notifications';

import _ClosePane from '../components/navigation/NavTop/ClosePane.jsx';
    import ClosePaneConnections from './connections/ClosePane'
    var ClosePane = connect(ClosePaneConnections.props, ClosePaneConnections.dispatches)(_ClosePane);

import HeadBack from '../components/navigation/NavTop/HeadBack.jsx';
import _HeaderDefault from '../components/navigation/NavTop/HeaderDefault.jsx';
    import HeaderDefaultConnections from './connections/HeaderDefault';
    var HeaderDefault = connect(HeaderDefaultConnections.props, HeaderDefaultConnections.dispatches)(_HeaderDefault);





import _Habit from '../components/main/habits/Habit.jsx';
    import HabitConnections from './connections/Habit';
    var Habit = connect(HabitConnections.props, HabitConnections.dispatches)(_Habit);

import _Habits from '../components/main/habits/Habits.jsx';
    import HabitsConnections from './connections/Habits';
    var Habits = connect(HabitsConnections.props, HabitsConnections.dispatches)(_Habits);



import EssentialProgress from '../components/main/habits/EssentialProgress.jsx';


import _Essentials from '../components/main/habits/Essentials.jsx';
    import EssentialsConnections from './connections/Essentials';
    var Essentials = connect(EssentialsConnections.props, EssentialsConnections.dispatches)(_Essentials);

import IntervalSelect from '../components/main/habits/IntervalSelect.jsx';


import _MomentumIndicator from '../components/main/habits/MomentumIndicator.jsx';
    import MomentumIndicatorConncetions from './connections/MomentumIndicator';
    var MomentumIndicator = connect(MomentumIndicatorConncetions.props, MomentumIndicatorConncetions.dispatches)(_MomentumIndicator);

import _NewHabit from '../components/main/habits/NewHabit.jsx';
    import NewHabitConnections from './connections/NewHabit';
    var NewHabit = connect(NewHabitConnections.props, NewHabitConnections.dispatches)(_NewHabit);

import _PinnedHabits from '../components/main/habits/PinnedHabits.jsx';
    import PinnedHabitsConnections from './connections/PinnedHabits';
    var PinnedHabits = connect(PinnedHabitsConnections.props, PinnedHabitsConnections.dispatches)(_PinnedHabits);

import _SingleHabit from '../components/main/habits/SingleHabit.jsx';
    import SingleHabitConnections from './connections/SingleHabit';
    var SingleHabit = connect(SingleHabitConnections.props, SingleHabitConnections.dispatches)(_SingleHabit);



/* Calendar */ 

import _HabitCalendar from '../components/main/habits/calendars/HabitCalendar.jsx';
    import HabitCalendarConnections from './connections/HabitCalendar';
    var HabitCalendar = connect(HabitCalendarConnections.props, HabitCalendarConnections.dispatches)(_HabitCalendar);

import _HabitCalendarDaily from '../components/main/habits/calendars/HabitCalendarDaily.jsx';
    import HabitCalendarDailyConnections from './connections/HabitCalendar';
    var HabitCalendarDaily = connect(HabitCalendarConnections.props, HabitCalendarConnections.dispatches)(_HabitCalendarDaily);


import _HabitCalendarMonthly from '../components/main/habits/calendars/HabitCalendarMonthly.jsx';
    import HabitCalendarMonthlyConnections from './connections/HabitCalendar';
    var HabitCalendarMonthly = connect(HabitCalendarConnections.props, HabitCalendarConnections.dispatches)(_HabitCalendarMonthly);

import _ViewDate from '../components/main/habits/ViewDate.jsx';
    import ViewDateConnections from './connections/ViewDate';
    var ViewDate = connect(ViewDateConnections.props, ViewDateConnections.dispatches)(_ViewDate);


import _Sorting from '../components/main/habits/Sorting.jsx';
    import SortingConnections from './connections/Sorting';
    var Sorting = connect(SortingConnections.props, SortingConnections.dispatches)(_Sorting);

// Checkins
import Checkins from '../components/main/checkins/Checkins.jsx';
    

import _Checkin from '../components/main/checkins/Checkin.jsx';
    import CheckinConnections from './connections/Checkin';
    var Checkin = connect(CheckinConnections.props, CheckinConnections.dispatches)(_Checkin);

import IntervalFor from '../components/main/checkins/IntervalFor.jsx';


import _NewHabitGoal from '../components/main/habits/HabitGoals/NewHabitGoal';
    import NewHabitGoalConnections from './connections/NewHabitGoal';
    var NewHabitGoal = connect(NewHabitGoalConnections.props, NewHabitGoalConnections.dispatches)(_NewHabitGoal);

import _HabitGoals from '../components/main/habits/HabitGoals/HabitGoals';
    import HabitGoalsConnections from './connections/HabitGoals';
    var HabitGoals = connect(HabitGoalsConnections.props, HabitGoalsConnections.dispatches)(_HabitGoals);


// Misc
import BoolIcon from '../components/main/BoolIcon.jsx';
import TimeLeft from '../components/main/TimeLeft.jsx';
    
import SortablePlanks from '../components/main/blocks/SortablePlanks.jsx';






export {
    HabitTracker,
    GrandCentral,
    FloatingActionButton,
    NavTop,
    NavSide,
    NavBottom,
    Notifications,
    ClosePane,
    HeadBack,
    HeaderDefault,
    Habit,
    Habits,
    EssentialProgress,
    Essentials,
    IntervalSelect,
    MomentumIndicator,
    NewHabit,
    PinnedHabits,
    SingleHabit,
    HabitCalendar,
    HabitCalendarDaily,
    HabitCalendarMonthly,
    Sorting,
    ViewDate,
    Checkins,
    Checkin,
    IntervalFor,
    BoolIcon,
    TimeLeft,
    SortablePlanks,
    NewHabitGoal,
    HabitGoals
}
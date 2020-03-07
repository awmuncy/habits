import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

// Components
import HabitTracker from '../components/navigation/HabitTracker.jsx';
import GrandCentral from '../components/navigation/GrandCentral.jsx';
import FAQ from '../components/navigation/FAQ.jsx';
import Feedback from '../components/navigation/Feedback.jsx';
import FloatingActionButton from '../components/navigation/FloatingActionButton.jsx';
import HomePage from '../components/navigation/HomePage.jsx';
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

import GoalHeader from '../components/navigation/NavTop/GoalHeader.jsx';
import HeadBack from '../components/navigation/NavTop/HeadBack.jsx';
import _HeaderDefault from '../components/navigation/NavTop/HeaderDefault.jsx';
    import HeaderDefaultConnections from './connections/HeaderDefault';
    var HeaderDefault = connect(HeaderDefaultConnections.props, HeaderDefaultConnections.dispatches)(_HeaderDefault);


// Core values
import CoreValuesPage from '../components/main/pages/CoreValuesPage.jsx';
import _CoreValues from '../components/main/values/CoreValues.jsx';
    import C_CoreValues from './connections/CoreValues';
    var CoreValues = connect(C_CoreValues.props, C_CoreValues.dispatches)(_CoreValues);

import _CoreValue from '../components/main/values/CoreValue.jsx';
    import C_CoreValue from './connections/CoreValue';
    var CoreValue = connect(C_CoreValue.props, C_CoreValue.dispatches)(_CoreValue);

import _DefineCoreValue from '../components/main/values/DefineCoreValue.jsx';
    import C_DefineCoreValue from './connections/DefineCoreValue';
    var DefineCoreValue = connect(C_DefineCoreValue.props, C_DefineCoreValue.dispatches)(_DefineCoreValue);

import _SingleCoreValue from '../components/main/values/SingleCoreValue.jsx';
    import C_SingleCoreValue from './connections/DefineCoreValue';
    var SingleCoreValue = connect(C_SingleCoreValue.props, C_SingleCoreValue.dispatches)(_SingleCoreValue);

import _RandomCoreValue from '../components/main/values/RandomCoreValue.jsx';
    import C_RandomCoreValue from './connections/RandomCoreValue';
    var RandomCoreValue = connect(C_RandomCoreValue.props, C_RandomCoreValue.dispatches)(_RandomCoreValue);

// Goals
import _SelectAssociated from '../components/main/goals/SelectAssociated.jsx';
    import C_SelectAssociated from './connections/SelectAssociated';
    var SelectAssociated = connect(C_SelectAssociated.props, C_SelectAssociated.dispatches)(_SelectAssociated);

import GoalsPage from '../components/main/pages/GoalsPage.jsx';
import _Goals from '../components/main/goals/Goals.jsx';
    import C_Goals from './connections/Goals';
    var Goals = connect(C_Goals.props, C_Goals.dispatches)(_Goals);

import _GoalEssential from '../components/main/goals/GoalEssential.jsx';
    import C_GoalEssential from './connections/GoalEssential';
    var GoalEssential = connect(C_GoalEssential.props, C_GoalEssential.dispatches)(_GoalEssential);

import GoalSingle from '../components/main/goals/GoalSingle.jsx';
import Measurable from '../components/main/goals/Measurable.jsx';

import _NewGoal from '../components/main/goals/NewGoal.jsx';
    import NewGoalConnections from './connections/NewGoal';
    var NewGoal = connect(NewGoalConnections.props, NewGoalConnections.dispatches)(_NewGoal);

// Habits
import HabitsPage from '../components/main/pages/HabitsPage.jsx';

import _Habit from '../components/main/habits/Habit.jsx';
    import HabitConnections from './connections/Habit';
    var Habit = connect(HabitConnections.props, HabitConnections.dispatches)(_Habit);

import _Habits from '../components/main/habits/Habits.jsx';
    import HabitsConnections from './connections/Habits';
    var Habits = connect(HabitsConnections.props, HabitsConnections.dispatches)(_Habits);


import _EditHabit from '../components/main/habits/EditHabit.jsx';
    import EditHabitConnections from './connections/EditHabit';
    var EditHabit = connect(EditHabitConnections.props, EditHabitConnections.dispatches)(_EditHabit);

import EssentialProgress from '../components/main/habits/EssentialProgress.jsx';


import _Essentials from '../components/main/habits/Essentials.jsx';
    import EssentialsConnections from './connections/Essentials';
    var Essentials = connect(EssentialsConnections.props, EssentialsConnections.dispatches)(_Essentials);

import IntervalSelect from '../components/main/habits/IntervalSelect.jsx';
import MomentumIndicator from '../components/main/habits/MomentumIndicator.jsx';
import _NewHabit from '../components/main/habits/NewHabit.jsx';
    import NewHabitConnections from './connections/NewHabit';
    var NewHabit = connect(NewHabitConnections.props, NewHabitConnections.dispatches)(_NewHabit);

import _PinnedHabits from '../components/main/habits/PinnedHabits.jsx';
    import PinnedHabitsConnections from './connections/PinnedHabits';
    var PinnedHabits = connect(PinnedHabitsConnections.props, PinnedHabitsConnections.dispatches)(_PinnedHabits);

import _SingleHabit from '../components/main/habits/SingleHabit.jsx';
    import SingleHabitConnections from './connections/SingleHabit';
    var SingleHabit = connect(SingleHabitConnections.props, SingleHabitConnections.dispatches)(_SingleHabit);

import _Sorting from '../components/main/habits/Sorting.jsx';
    import SortingConnections from './connections/Sorting';
    var Sorting = connect(SortingConnections.props, SortingConnections.dispatches)(_Sorting);


// Checkins
import Checkins from '../components/main/checkins/Checkins.jsx';
    

import CheckinNotes from '../components/main/checkins/CheckinNotes.jsx';
import _Checkin from '../components/main/checkins/Checkin.jsx';
    import CheckinConnections from './connections/Checkin';
    var Checkin = connect(CheckinConnections.props, CheckinConnections.dispatches)(_Checkin);

import IntervalFor from '../components/main/checkins/IntervalFor.jsx';


// Tics


// Misc
import BoolIcon from '../components/main/BoolIcon.jsx';
import TimeLeft from '../components/main/TimeLeft.jsx';
import _Login from '../components/navigation/Login.jsx';
    import LoginConnections from './connections/Login';
    var Login = connect(LoginConnections.props, LoginConnections.dispatches)(_Login);
    
import SortablePlanks from '../components/main/blocks/SortablePlanks.jsx';






export {
    HabitTracker,
    GrandCentral,
    FAQ,
    Feedback,
    FloatingActionButton,
    HomePage,
    NavTop,
    NavSide,
    NavBottom,
    Notifications,
    ClosePane,
    GoalHeader,
    HeadBack,
    HeaderDefault,
    CoreValuesPage,
    CoreValues,
    CoreValue,
    RandomCoreValue,
    DefineCoreValue,
    SelectAssociated,
    GoalsPage,
    Goals,
    GoalEssential,
    GoalSingle,
    Measurable,
    NewGoal,
    HabitsPage,
    Habit,
    Habits,
    EditHabit,
    EssentialProgress,
    Essentials,
    IntervalSelect,
    MomentumIndicator,
    NewHabit,
    PinnedHabits,
    SingleHabit,
    Sorting,
    Checkins,
    CheckinNotes,
    Checkin,
    IntervalFor,
    BoolIcon,
    TimeLeft,
    Login,
    SortablePlanks,
    SingleCoreValue
}
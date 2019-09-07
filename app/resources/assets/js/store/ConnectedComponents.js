import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

// Components
import HabitTracker from '../components/navigation/HabitTracker';
import GrandCentral from '../components/navigation/GrandCentral';
import FAQ from '../components/navigation/FAQ';
import Feedback from '../components/navigation/Feedback';
import FloatingActionButton from '../components/navigation/FloatingActionButton';
import HomePage from '../components/navigation/HomePage';
import _NavTop from '../components/navigation/NavTop';
    import NavTopConnections from './connections/NavTop';
    var NavTop = withRouter(connect(NavTopConnections.props, NavTopConnections.dispatches)(_NavTop));

import _NavSide from '../components/navigation/NavSide';
    import NavSideConnections from './connections/NavSide';
    var NavSide = connect(NavSideConnections.props, NavSideConnections.dispatches)(_NavSide);

import NavBottom from '../components/navigation/NavBottom';
import Notifications from '../components/navigation/Notifications';

import _ClosePane from '../components/navigation/NavTop/ClosePane';
    import ClosePaneConnections from './connections/ClosePane'
    var ClosePane = connect(ClosePaneConnections.props, ClosePaneConnections.dispatches)(_ClosePane);

import GoalHeader from '../components/navigation/NavTop/GoalHeader';
import HeadBack from '../components/navigation/NavTop/HeadBack';
import _HeaderDefault from '../components/navigation/NavTop/HeaderDefault';
    import HeaderDefaultConnections from './connections/HeaderDefault';
    var HeaderDefault = connect(HeaderDefaultConnections.props, HeaderDefaultConnections.dispatches)(_HeaderDefault);


// Core values
import CoreValuesPage from '../components/app/pages/CoreValuesPage';
import _CoreValues from '../components/app/values/CoreValues';
    import C_CoreValues from './connections/CoreValues';
    var CoreValues = connect(C_CoreValues.props, C_CoreValues.dispatches)(_CoreValues);

import CoreValue from '../components/app/values/CoreValue';
import _NewCoreValue from '../components/app/values/NewCoreValue';
    import C_NewCoreValue from './connections/NewCoreValue';
    var NewCoreValue = connect(C_NewCoreValue.props, C_NewCoreValue.dispatches)(_NewCoreValue);

// Goals
import _SelectAssociated from '../components/app/goals/SelectAssociated';
    import C_SelectAssociated from './connections/SelectAssociated';
    var SelectAssociated = connect(C_SelectAssociated.props, C_SelectAssociated.dispatches)(_SelectAssociated);

import GoalsPage from '../components/app/pages/GoalsPage';
import _Goals from '../components/app/goals/Goals';
    import C_Goals from './connections/Goals';
    var Goals = connect(C_Goals.props, C_Goals.dispatches)(_Goals);

import _GoalEssential from '../components/app/goals/GoalEssential';
    import C_GoalEssential from './connections/GoalEssential';
    var GoalEssential = connect(C_GoalEssential.props, C_GoalEssential.dispatches)(_GoalEssential);

import GoalSingle from '../components/app/goals/GoalSingle';
import Measurable from '../components/app/goals/Measurable';

import _NewGoal from '../components/app/goals/NewGoal';
    import NewGoalConnections from './connections/NewGoal';
    var NewGoal = connect(NewGoalConnections.props, NewGoalConnections.dispatches)(_NewGoal);

// Challenges
import HabitsPage from '../components/app/pages/HabitsPage';

import _Challenge from '../components/app/challenges/Challenge';
    import ChallengeConnections from './connections/Challenge';
    var Challenge = connect(ChallengeConnections.props, ChallengeConnections.dispatches)(_Challenge);

import _Challenges from '../components/app/challenges/Challenges';
    import ChallengesConnections from './connections/Challenges';
    var Challenges = connect(ChallengesConnections.props, ChallengesConnections.dispatches)(_Challenges);


import _EditChallenge from '../components/app/challenges/EditChallenge';
    import EditChallengeConnections from './connections/EditChallenge';
    var EditChallenge = connect(EditChallengeConnections.props, EditChallengeConnections.dispatches)(_EditChallenge);

import EssentialProgress from '../components/app/challenges/EssentialProgress';


import _Essentials from '../components/app/challenges/Essentials';
    import EssentialsConnections from './connections/Essentials';
    var Essentials = connect(EssentialsConnections.props, EssentialsConnections.dispatches)(_Essentials);

import IntervalSelect from '../components/app/challenges/IntervalSelect';
import MomentumIndicator from '../components/app/challenges/MomentumIndicator';
import _NewChallenge from '../components/app/challenges/NewChallenge';
    import NewChallengeConnections from './connections/NewChallenge';
    var NewChallenge = connect(NewChallengeConnections.props, NewChallengeConnections.dispatches)(_NewChallenge);

import _PinnedChallenges from '../components/app/challenges/PinnedChallenges';
    import PinnedChallengesConnections from './connections/PinnedChallenges';
    var PinnedChallenges = connect(PinnedChallengesConnections.props, PinnedChallengesConnections.dispatches)(_PinnedChallenges);

import _SingleHabit from '../components/app/challenges/SingleHabit';
    import SingleHabitConnections from './connections/SingleHabit';
    var SingleHabit = connect(SingleHabitConnections.props, SingleHabitConnections.dispatches)(_SingleHabit);

import _Sorting from '../components/app/challenges/Sorting';
    import SortingConnections from './connections/Sorting';
    var Sorting = connect(SortingConnections.props, SortingConnections.dispatches)(_Sorting);


// Checkins
import Checkins from '../components/app/checkins/Checkins';
    

import CheckinNotes from '../components/app/checkins/CheckinNotes';
import _Checkin from '../components/app/checkins/Checkin';
    import CheckinConnections from './connections/Checkin';
    var Checkin = connect(CheckinConnections.props, CheckinConnections.dispatches)(_Checkin);

import IntervalFor from '../components/app/checkins/IntervalFor';

// Misc
import BoolIcon from '../components/app/BoolIcon';
import TimeLeft from '../components/app/TimeLeft';
import Login from '../components/navigation/Login';
import SortablePlanks from '../components/app/blocks/SortablePlanks';

// Connectors




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
    NewCoreValue,
    SelectAssociated,
    GoalsPage,
    Goals,
    GoalEssential,
    GoalSingle,
    Measurable,
    NewGoal,
    HabitsPage,
    Challenge,
    Challenges,
    EditChallenge,
    EssentialProgress,
    Essentials,
    IntervalSelect,
    MomentumIndicator,
    NewChallenge,
    PinnedChallenges,
    SingleHabit,
    Sorting,
    Checkins,
    CheckinNotes,
    Checkin,
    IntervalFor,
    BoolIcon,
    TimeLeft,
    Login,
    SortablePlanks
}
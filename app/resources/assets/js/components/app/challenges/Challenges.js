import React, { Component } from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import { PinnedChallenges, Challenge } from '../../../store/ConnectedComponents';


const SortableChallenge = SortableElement(({challenge}) => 
    <Challenge id={challenge.id} />
);


const SortableChallenges = SortableContainer(({challenges}) => {

    if(!Array.isArray(challenges)) challenge = [];


    return (
        <div className="challenge-list">
            {challenges.map((challenge, index) => (
                <SortableChallenge key={challenge.id} index={index} challenge={challenge} />
            ))}
        </div>
    );
});


class Challenges extends Component {

    constructor(props) {
        super(props);
        this.onSortEnd = this.onSortEnd.bind(this);
        this.state = {
            challenges: props.challenges
        };
    }

    onSortEnd({oldIndex, newIndex}) { 
        var challengelist = arrayMove(this.props.challenges, oldIndex, newIndex); 

        challengelist.map(function(item, key){
            item.filtered_out = false;
        	item.position = key;
        	return item;
        });

        this.props.sortChallenges(challengelist);
    }

    static getDerivedStateFromProps(props, state) {
        
        props.view_date;

        state.challenges.map(function(item, key){
            item.filtered_out = false;
            item.position = key;
            return item;
        });

        function filterChallenges() {

            var challenges = props.challenges;

            if(props.filters.includes("outstanding")) {
                challenges = challenges.map(function(challenge){
                    if(challenge.checkinSlots[challenge.checkinSlots.length - 1].status!==null) {
                        challenge.filtered_out = true;                  
                    } 
                    return challenge;
                });
            }

            return challenges;
        }


        return {
            challenges: filterChallenges()
        }        
    }



	render () {     

        

		return (

			<div className="my-challenges">
                <PinnedChallenges />
                <SortableChallenges 
                challenges={this.state.challenges} 
                helperClass="SortableHelper" 
                lockAxis="y"
                useDragHandle={true}
                pressDelay={200}
                onSortEnd={this.onSortEnd.bind(this)}
                 />                
			</div>

		);
	}
}


export default Challenges;
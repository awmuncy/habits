import React, { Component } from 'react';
import { ViewDate } from '../store/ConnectedComponents';
import { S_Sorting } from '../store/connectors';
import { connect } from 'react-redux';

class C_Sorting extends Component {


    constructor(props) {
        super(props);

    }


    render() {
        var filters = this.props.filters;

        return (
            <div className="sorting">
                <ViewDate />
                <div className="select-habits-to-view">
                    <ul>

                        <li onClick={()=>this.props.toggle_outstanding(filters)} className={filters.includes('outstanding')?'active-sort':''}>
                            <i className="fa fa-eye" aria-hidden="true"></i>
                            Outstanding
                        </li>

                    </ul>
                </div>
            </div>

        );
    }
}


var Sorting = connect(...S_Sorting)(C_Sorting);

export {
    Sorting
};

        // View
            // Every day
            // Daily
            // Weekly
            // Monthly
            // Completed
            // Failed
            // Incomplete

        // Sort 
            // Status
                // Incomplete
                // Failed
                // Success
            // Score
                // Accending
                // Descending
            // Pace
                // Ascending
                // Descending
            // Time period

        // Add once we actually have multiple filters

        //     <li onClick={this.props.clear_filters}>
        //     <i className="fa fa-eye" aria-hidden="true"></i>
        //     Clear filters
        // </li>

    //     <li onClick={this.props.sort_by_status}>
    //     <i className="fa fa-list" aria-hidden="true"></i>
    //     Status
    // </li>
    // <li onClick={this.props.sort_by_score}>
    //     <i className="fa fa-list" aria-hidden="true"></i>
    //     Score
    // </li>
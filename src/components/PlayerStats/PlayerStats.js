import React, { Component } from 'react';
import { connect } from 'react-redux';


class PlayerStats extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'ADD_STATS',
            payload: {
                week: '1',
            }
        })
    }


    render() {
        if (this.props.stats.length > 0) {
            return (
                <>
                    <h1>Your Runningbacks</h1>

                    {this.props.stats.map((players, index) => (
                        <ul key={index}>
                            <li>Name: {players.name}</li>
                            <li>Touchdowns: {players.touchdowns}</li>
                            <li>Rushing Yards: {players.rushing}</li>
                        </ul>
                    ))}
                </>
            )
        }
        else {
            return (
                <h1>Loading Stats....</h1>
            )
        }
    }
}

const mapStateToProps = state => ({
    list: state.list,
    stats: state.stats
})

export default connect(mapStateToProps)(PlayerStats)
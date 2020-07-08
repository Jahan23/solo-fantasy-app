import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlayerStats.css'


class PlayerStats extends Component {
    state = {
        week: 1
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'ADD_STATS',
            payload: {
                week: this.state.week
            }
        })
    }

    calculateStatus(touchdowns, rushing) {
        if(rushing >= 100 && touchdowns >= 1) {
            //green
            return 'green'
        } else if(rushing >= 50 || touchdowns >= 1) {
            // yellow
            return 'yellow'
        } else {
            //red
            return 'red'
        }
    }

    getNextWeek() {
        const nextWeek = this.state.week + 1;

        if(nextWeek < 4) {

        this.props.dispatch({
            type: 'ADD_STATS',
            payload: {
                week: nextWeek
            }
        })

        this.setState({week: nextWeek})
    }

    return
    }

    getPreviousWeek() {
        const previousWeek = this.state.week - 1;

        if(previousWeek > 0) {

        this.props.dispatch({
            type: 'ADD_STATS',
            payload: {
                week: previousWeek
            }
        })

        this.setState({week: previousWeek})
    }

    return
    }



    render() {
        if (this.props.stats.length > 0) {
            return (
                <>
                    <h1>Your Runningbacks</h1>

                    {this.props.stats.map((players, index) => (
                        <ul key={index}>
                            <li>Status: <span className={`status-icon ${this.calculateStatus(players.touchdowns, players.rushing)}`}></span></li>
                            <li>Name: {players.name}</li>
                            <li>Touchdowns: {players.touchdowns}</li>
                            <li>Rushing Yards: {players.rushing}</li>
                        </ul>
                    ))}
                    <button onClick={() => {this.getNextWeek()}}>Next Week</button>
                    <button onClick={() => {this.getPreviousWeek()}}>Previous Week</button>
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
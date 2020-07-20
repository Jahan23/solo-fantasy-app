import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import './PlayerStats.css'


class PlayerStats extends Component {
    state = {
        week: 1
    }

    componentDidMount() {

        this.props.dispatch({
            type: 'ADD_STATS',
            payload: {
                week: this.state.week,
                team_id: this.props.match.params.team_id,
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
                week: nextWeek,
                team_id: this.props.match.params.team_id,
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

    handleClick = () => {
        this.props.history.push('/create')
      }


    render() {
        if (this.props.stats.length > 0) {
            return (
                <>
                    <h2>Your Runningbacks</h2>

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
                    <h2>Status Determination</h2>
                    <p className="box green"></p>
                    <p>Rushes for at least 100 yds and at least one touchdown</p>
                    <p className="box yellow"></p>
                    <p>Rushes for at least 50 yds and at least one touchdown</p>
                    <p className="box red"></p>
                    <p>Rushes under 50 yds and no touchdowns</p>
                    <button onClick={this.handleClick}>Return to Add Players</button>

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

export default withRouter(connect(mapStateToProps)(PlayerStats));
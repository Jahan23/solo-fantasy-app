import React, { Component } from 'react';
import {connect} from 'react-redux';
//import { Link } from 'react-router-dom';

//import { withRouter } from "react-router";

class CreateTeam extends Component {

    state = {
        team_name: '',
        new_name: '',
        players: []
    }

    componentDidMount() {
        this.props.dispatch({
          type: 'GET_PLAYER'
        })
        console.log('this.props', this.props)
      }
      

      componentDidUpdate(prevProps) {
        if(prevProps.players !== this.props.players) {
          this.setState({teams: this.props.players})
        }
      }

  handleNameChange = (event) => {
    this.setState({
      ...this.state,
      new_name: event.target.value
    })
  }

  addTeamInfo = () => {
    //event.preventDefault();
    
    this.setState({
      //state: {
        team_name: this.state.new_name
      //}
    })
    // this.setState({
    //     new_name: '',
    // })

    //debugger

    this.props.dispatch({
      type: 'ADD_TEAM',
      payload: {name: this.state.new_name, id: this.props.user.id}
    })
    // this.props.dispatch({
    //     type: 'GET_PLAYER',
    //     payload: {
    //         id: this.state.players
    //     }
    //})
    //this.props.history.push('/about')
  }

  addPlayers = (playersClicked) => {
    this.props.dispatch({type: 'GET_STATS', payload: playersClicked})
    this.props.history.push(`/home/${playersClicked}`)
  }

  render(){
    return(
        <>
      <div>
        <h1>Team Name</h1>
        <input value = {this.state.new_name} onChange = {this.handleNameChange} type = 'text' placeholder = 'Team Name'/>
        <button onClick = {this.addTeamInfo}>Add Team</button>
        {this.props.teams.length > 0 && 
          this.props.teams.map((team, index) => (
          <>
            <input type='radio' value={team.name} id={index} name="teams" />
            <label for={index}>{team.name}</label>
            <br></br>
          </>
          ))
        }
      </div>
      <div>
          <h2>Select your runningbacks</h2>
          {this.props.players.map((players, index) => (
          <li key={index}>{players.name}
          <button onClick={() => this.addPlayers(players.id)}></button>
          </li>
          
          
    ))}
      </div>
      </>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
  players: state.players,
  teams: state.teams
});

export default connect(mapStateToProps)(CreateTeam);


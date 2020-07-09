import React, { Component } from 'react';
import {connect} from 'react-redux';
import './CreateTeam.css'
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

        this.props.dispatch({
          type: 'FETCH_TEAMS',
          payload: {
            id: this.props.user.id,
          }
        })
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
    
    // this.setState({
    //     new_name: '',
    // })

    //debugger

    this.props.dispatch({
      type: 'ADD_TEAM',
      payload: {name: this.state.new_name, id: this.props.user.id}
    })
    this.setState({
      //state: {
        new_name: '',//this.state.new_name
      //}
    })
    // this.props.dispatch({
    //     type: 'GET_PLAYER',
    //     payload: {
    //         id: this.state.players
    //     }
    //})
    //this.props.history.push('/about')
  }

  deleteTeam = (team) => {
    this.setState({
      team_name: this.state.new_name
    })
    console.log('team', team)
    this.props.dispatch({type: 'DELETE_TEAM', payload: team})
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
          <div key={index}>
            <input type='radio' value={team.name} id={index} name="teams" />
            <label htmlFor={index}>{team.name}</label>
            <button onClick = {() => this.deleteTeam(team.id)}>Delete Team</button>
            <br></br>
          </div>
          ))
        }
      </div>
      <div>
          <h2>Select your runningbacks</h2>
          {this.props.players.map((players, index) => (
          
          <li key={index}>{players.name}
          <img src={players.images} class="center" width='200px' height='200px'></img>
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

//width='50px' height='50px'


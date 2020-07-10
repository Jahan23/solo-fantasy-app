import React, { Component } from 'react';
import {connect} from 'react-redux';
import './CreateTeam.css'
//import { Link } from 'react-router-dom';

//import { withRouter } from "react-router";

class CreateTeam extends Component {

    state = {
        team_name: '',
        new_name: '',
        edit_name: '',
        current_selected_team: '',
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

  editName = (event) => {
    this.setState({
      edit_name: event.target.value
    })
    console.log(this.state.edit_name)
    
  }

  submitChange = (id) => {
    this.props.dispatch({type: 'EDIT_TEAM', payload: {id: id, name: this.state.edit_name}})
  }

  addPlayers = (player_id) => {
    this.props.dispatch({type: 'ADD_PLAYER_TO_TEAM', payload: {player_id: player_id, team_id: this.state.current_selected_team}})
  }

  selectedTeam = (event) => {
    this.setState({
      current_selected_team: event.target.value
    })
    
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
            <input type='radio' value={team.id} id={index} name="teams" onChange={(event) => this.selectedTeam(event)} />
            <label htmlFor={index}>{team.name}</label>
            <input onChange = {(event) => this.editName(event)} type= 'text' placeholder = 'Team Name'></input>
            <button onClick = {() => this.submitChange(team.id)}>Submit Changes</button>
            <button onClick = {() => this.deleteTeam(team.id)}>Delete Team</button>
            <br></br>
          </div>
          ))
        }
      </div>
      <div>
          <h2 className="running-back-title">Select your runningbacks</h2>
          <div className="running-back-container">
            {this.props.players.map((players, index) => (
            
            <div key={index} className="running-back-item">
              <p className="running-back-name">{players.name}</p>
              <img className="running-back-image" src={players.images} width='200px' height='200px'></img>
              <button className="running-back-button" onClick={() => this.addPlayers(players.id)}>Add Player</button>
            </div>
            
            ))}
        </div>
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


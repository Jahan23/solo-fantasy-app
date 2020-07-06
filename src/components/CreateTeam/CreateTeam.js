import React, { Component } from 'react';
import {connect} from 'react-redux';

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
    this.setState({
        new_name: '',
    })
    this.props.dispatch({
      type: 'ADD_TEAM_NAME',
      payload: this.state.team_name
    })
    // this.props.dispatch({
    //     type: 'GET_PLAYER',
    //     payload: {
    //         id: this.state.players
    //     }
    //})
    //this.props.history.push('/about')
  }

  render(){
    return(
        <>
      <div>
        <h1>Team Name</h1>
        <input value = {this.state.new_name} onChange = {this.handleNameChange} type = 'text' placeholder = 'Team Name'/>
        <button onClick = {this.addTeamInfo}>Add Team</button>
        <li>{this.state.team_name}</li>
      </div>
      <div>
          {this.props.players.map((players, index) => (
          <li key={index}>{players.name}</li>
    ))}
      </div>
      </>
    )
  }
}


const mapStateToProps = state => ({
  errors: state.errors,
  players: state.players,
});

export default connect(mapStateToProps)(CreateTeam);
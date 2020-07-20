import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Link } from 'react-router-dom';
import './UserPage.css'
//import InfoPage from '../InfoPage/InfoPage';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class UserPage extends Component {

  state = {
    teams: []
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_TEAMS',
      payload: {
        id: this.props.user.id,
      }
    })

  }

  componentDidUpdate(prevProps) {
    if(prevProps.teams !== this.props.teams) {
      this.setState({teams: this.props.teams})
    }
  }

  handleClick = () => {
    this.props.history.push('/create')
  }
  render() {
    return (
      <>
        <div>
          <h1 id="welcome">
            Welcome, {this.props.user.username}!
      </h1>
          <p>
            Welcome to Save My Fantasy. 
            {/* You may begin by clicking your team name to manage your players.
            You may also create a team by selecting create new team. */}
          </p>  
          <p>
            Get started by creating your team
          </p>
          <p>
            Already have a team? Click your team name to view stats
          </p>

          {/* <p>Your ID is: {this.props.user.id}</p> */}
          <LogOutButton className="log-in" />
          <button className="create-team" onClick={this.handleClick}>Create Team</button>
        </div>
        
        
        <div>
          <h2>View Team Status</h2>
        {this.state.teams.length > 0 && 
          this.state.teams.map((team, index) => (
          <li key={index}><Link to={`/stats/${team.id}`}>{team.name}</Link></li>
          ))
        }
        </div>
      </>
    )
  }
};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  teams: state.teams
});


// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

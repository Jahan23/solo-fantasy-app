// import React, { Component } from 'react';
// import {connect} from 'react-redux';


// class PlayerStats extends Component {

//     state = {
//         stats: []
//     }

//     componentDidMount(){
//         this.props.dispatch({
//             type: 'FETCH_STATS'
//     })
// }

// render(){
//     return (
//         <div className="stats">
//             {this.props.list &&
//             this.props.list.map((item)=>
//             <li key={item.id}item={item}/>)}
//         </div>
//     )
// }
// }

// const mapStateToProps = state => ({
//     list: state.list
// })

// export default connect(mapStateToProps)(PlayerStats)
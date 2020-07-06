const nameReducer = (state = {}, action) => {
    switch (action.type) {
      case 'ADD_TEAM_NAME':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default nameReducer;
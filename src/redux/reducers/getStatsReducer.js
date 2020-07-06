const getStatsReducer = (state = [], action) => {
    console.log('in getStatsReducer', action.payload);
    console.log('heres this type', action.type);

    if (action.type === 'SET_STATS') {
        return action.payload;
    }
    return state;
};

export default getStatsReducer;

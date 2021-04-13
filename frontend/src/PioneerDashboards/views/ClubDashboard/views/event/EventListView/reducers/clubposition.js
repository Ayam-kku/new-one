const closeReducer = (state = "", action) => {
    if (action.type === "position") {
        return action.position;
      }
      return state;
};

export default closeReducer;
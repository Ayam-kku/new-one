const closeReducer = (state = "", action) => {
    if (action.type === "search") {
        return action.search;
      }
      return state;
};

export default closeReducer;
const usersReducers = [];
export default (state = usersReducers, action) => {
    switch (action.type) {
      case 'ADD CLUB':
        return action.club;
      default:
        return state;
    }
  };
const usersReducers = [];
export default (state = usersReducers, action) => {
    switch (action.type) {
      case 'ADD USERS':
        return [
          ...state,
          action.users
        ];
      default:
        return state;
    }
  };
const reducer = (state, action) => {
    switch (action.type) {
      case "LOAD_FILTER_USER":
          return {
            ...state,
            filter_users: [...action.payload],
            all_users: [...action.payload],
          };
    
      case "UPDATE_FILTER_USER":
        const { Name, value } = action.payload;
        let stringValue=value.toString();
        return {
          ...state,
          filters: {
            ...state.filters,
            [Name]: stringValue,
          },
        };
      case "FILTER_USER":
        let { all_users } = state;
        let tempFilterusers = [...all_users];
  
        const { name}= state.filters;
         
        if (name) {
          tempFilterusers = tempFilterusers.filter((curElem) => {
            return (
              curElem.name.toLowerCase().includes(name.toLowerCase()) ||
              curElem.email.toLowerCase().includes(name.toLowerCase()) ||
              curElem.role.toLowerCase().includes(name.toLowerCase())
            );
            });
        }
        return {
          ...state,
          filter_users: tempFilterusers,
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  
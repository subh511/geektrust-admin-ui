const reducer = (state, action) => {
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
          isLoading: true,
        };
  
      case "SET_API_DATA":
        const updatedData = action.payload.map((item) => ({
          ...item,
          selected: false,
        }));
        return {
          ...state,
          isLoading: false,
          users: updatedData,
        };
  
      case "SET_EDIT_VALUE":
        const tempUser = state.users.map((user) => {
          if (user.id === action.payload.id) {
            return {
              ...user,
              name: action.payload.editValue.name,
              email: action.payload.editValue.email,
              role: action.payload.editValue.role,
            };
          } else return user;
        });
        return {
          ...state,
          users: tempUser,
        };
  
      case "SET_DELETE_VALUE":
        const tempUsers = state.users.filter(
          (user) => user.id !== action.payload
        );
        return {
          ...state,
          users: tempUsers,
        };
      case "SET_DELETE_SELECTED":
        const tempNewUsers = state.users.filter(
          (user) => user.selected === false
        );
        return {
          ...state,
          users: tempNewUsers,
          selectedAll:false
        };
        case 'SET_CHECK_ALL_DISPLAYED_ROW':
          const tempdata=state.users.map((user)=>{ 
          if(action.payload.data.filter(item=>item.id===user.id).length===1){
            return { ...user, selected:!state.selectedAll };
          }
           else return user
              
          }
          );
           
        return{
          ...state,
          selectedAll:true,
          users: tempdata,
        }
          
  
      case "SET_CHECK_VALUE":
       const tempUserss = state.users.map((user) => {
          if (user.id === action.payload) {
            return { ...user, selected:!user.selected };
          } else return user;
        });
       return {
          ...state,
          users: tempUserss,
        };
      case "API_ERROR":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  
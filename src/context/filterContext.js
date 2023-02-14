import { createContext, useContext, useReducer, useEffect } from "react";
import { useDataContext } from "./datacontext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filter_users: [],
  all_users: [],
  filters: {
    name: "",
  },
};

export const FilterContextProvider = ({ children }) => {
  const { users } = useDataContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateFilterValue = (event) => {
    let Name = event.target.name;
    let value = event.target.value;
    return dispatch({
      type: "UPDATE_FILTER_USER",
      payload: { Name, value },
    });
  };
  
  useEffect(() => {
    dispatch({ type: "FILTER_USER" });
  }, [state.filters]);
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_USER", payload: users });
  }, [users]);
  return (
    <FilterContext.Provider
      value={{ ...state, updateFilterValue}}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};

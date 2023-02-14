
import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import Reducer from '../reducer/reducer.js'

const DataContext = createContext();
const API = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const initialState = {
  isLoading: false,
  users: [],
  selectedAll: false,
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const getusers = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const users = await res.data;
      dispatch({ type: "SET_API_DATA", payload: users });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
  const editRow =(id, editValue)=>{
    let payload ={ id, editValue }
    dispatch({type:'SET_EDIT_VALUE', payload:payload})

  }
  const deleteRow =(id) =>{
     dispatch({type: 'SET_DELETE_VALUE', payload:id})
  }
  const checkRow =(id)=>{
    dispatch({type: 'SET_CHECK_VALUE', payload:id})
  }
  const deleteSeleted =()=>{
    dispatch({type:'SET_DELETE_SELECTED'})
  }

  const checkAllDisplayRow =(data, isAllSeleced) =>{
   let payload ={data,isAllSeleced }
    dispatch({type:'SET_CHECK_ALL_DISPLAYED_ROW',payload: payload })
  }
  useEffect(() => {
    getusers(API);
  }, []);

  return (
    <DataContext.Provider value={{ ...state, editRow, deleteRow, checkRow, deleteSeleted, checkAllDisplayRow}}>
      {children}
    </DataContext.Provider>
  );
};

// custom hooks
const useDataContext = () => {
  return useContext(DataContext);
};

export { DataProvider, DataContext, useDataContext };

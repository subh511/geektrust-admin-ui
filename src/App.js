import React, {useState} from 'react';
import './App.css';
import Filter from './components/filter/filter';
import Pagination from './components/pagination/pagination'
import DataTable from './components/table/table';
import { useDataContext } from './context/datacontext';
import { useFilterContext } from './context/filterContext';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const {deleteSeleted}=useDataContext();
  const { filter_users } = useFilterContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }
 const handlerDeleteSelected =() =>{
  deleteSeleted()

 }
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const data = filter_users.slice(startIndex, endIndex);


  return (
    <div className=" m-4">
      <Filter></Filter>
      <DataTable data={data}></DataTable>
     <div className='d-flex justify-content-between'>
     <div><button type="button" className="btn btn-danger" onClick={handlerDeleteSelected}>Delete selected</button></div>
     <Pagination   totalItems={filter_users.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}></Pagination></div> 
    </div>
  );
}

export default App;

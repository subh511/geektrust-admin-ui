import React from 'react'
import {useFilterContext} from '../../context/filterContext'

const Filter = () => {
  const { filters: { name},
  updateFilterValue } = useFilterContext();

  return (
    <div className="form-floating mb-3">
    <input type="text" id="floatingInputName" name='name' value={name}  className="form-control" onChange={updateFilterValue} placeholder="search by email " aria-label="Username" aria-describedby="basic-addon1"/>
  <label htmlFor="floatingInputName">Search by name, email or role </label>
</div>
  )
}

export default Filter
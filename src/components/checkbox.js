import React from 'react'

const Checkbox = (props) => {
  return (
    <input className="form-check-input" type="checkbox" checked={props.value} onChange={props.onCheck} id="flexCheckDefault"/>
  )
}

export default Checkbox

import React, { useState } from "react";
import Checkbox from "../checkbox";
import Action from "../action";
import { useDataContext } from "../../context/datacontext";
import EditAction from "../EditAction";

const Table = (props) => {
  const { editRow, deleteRow, checkRow, selectedAll, checkAllDisplayRow} = useDataContext();
  const [isEdit, setEdit] = useState(false);
  const [currRow, setCurrRow] = useState(null);
  const [editValue, setEditValue] = useState({
    name: "",
    email: "",
    role: "",
  });
  const handlerEdit = (id) => {
    setEditValue({
      ...editValue,
      name: props.data[id - 1].name,
      email: props.data[id - 1].email,
      role: props.data[id - 1].role,
    });
    setCurrRow(id);
    setEdit(!isEdit);
  };
  const handlerDelete = (id) => {
    deleteRow(id);
  };
  const handleEditValue = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value });
  };

  const handlerSaveEdit = (id) => {
    editRow(id, editValue);
    setEdit(!isEdit);
  };

   const handlerAllCheckbox = () => {
    checkAllDisplayRow(props.data)
  };
 return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              {" "}
              <Checkbox
                onCheck={handlerAllCheckbox}
                value={selectedAll}
              ></Checkbox>{" "}
            </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((user) => (
            <tr key={user.id}>
              {isEdit === true && currRow === user.id ? (
                <>
                  <th scope="row">
                    <Checkbox
                      onCheck={()=>checkRow(user.id)}
                      value={user.selected}
                    ></Checkbox>{" "}
                  </th>
                  <td>
                    <input
                      type="text"
                      value={editValue.name}
                      name="name"
                      onChange={handleEditValue}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={editValue.email}
                      name="email"
                      onChange={handleEditValue}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editValue.role}
                      name="role"
                      onChange={handleEditValue}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <EditAction
                      onSave={() => handlerSaveEdit(user.id)}
                      onClose={() => setEdit(!isEdit)}
                    ></EditAction>
                  </td>
                </>
              ) : (
                <>
                      <th scope="row">
                    <Checkbox
                      onCheck={()=>checkRow(user.id)}
                      value={user.selected}
                    ></Checkbox>{" "}
                  </th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Action
                      onEdit={() => handlerEdit(user.id)}
                      onDelete={() => handlerDelete(user.id)}
                    ></Action>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

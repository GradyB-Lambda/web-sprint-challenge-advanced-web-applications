import React, { useState } from "react";

import { axiosWithAuth  } from '../helpers/axiosWithAuth'
import EditMenu from './EditMenu';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(
          colors.map(color => {
            if (color.id === colorToEdit.id) {
              return colorToEdit;
            } else {
              return color;
            }
          })
        );
      })
      .catch(err => {
        console.log(err);
      });
  };




  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`, color)
      .then(res => {
        console.log(res.data);
        updateColors(colors.filter(color => color.id !== res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };




  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.
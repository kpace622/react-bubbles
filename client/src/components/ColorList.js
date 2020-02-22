import React, { useState, useImperativeHandle } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from 'react-router-dom';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newcolorName, setNewColorName] = useState('')
  const [newcolorHex, setNewColorHex] = useState('')
  let history = useHistory();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors([
          ...colors.filter(color => color.id !== colorToEdit.id),
          res.data
        ])
        setEditing(false)
      })
      .catch(err => console.error(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/colors/${color.id}`)
    .then(() => {
      updateColors(colors.filter(deletedColor => colors.id !== deletedColor.id));
      history.push('/')
    })
    .catch(err => console.log(err));
  };

  const handleAddColor = () => {
    axiosWithAuth()
      .post('/colors', {color: newcolorName, code: newcolorHex})
      .then(res => {
        updateColors({
          ...colors
        })
      })
  }

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
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={handleAddColor}>
        <input
          className='add-form'
          type='text'
          name='newColor'
          value={newcolorName}
          onChange={e => setNewColorName(e.target.value)}
          placeholder='Color Name'
        />
        <input
          className='add-form'
          type='text'
          name='newHex'
          value={newcolorHex}
          onChange={e => setNewColorHex(e.target.value)}
          placeholder='Hex Code'
        />
        <button>Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;

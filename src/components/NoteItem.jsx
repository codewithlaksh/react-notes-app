import React, { useContext } from 'react'
import NotesContext from '../context/notes/notesContext';
import ThemeContext from '../context/theme/themeContext'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function NoteItem(props) {
  const { deleteNote } = useContext(NotesContext);
  const { theme } = useContext(ThemeContext);
  const { note, updateNote } = props;

  const confirmDelete = () => {
    if (window.confirm('Are you sure, you want to delete this note ?')) {
      deleteNote(note.id);
    }
  }

  return (
    <div className="col-md-4">
      <div className={`card ${theme === 'dark' && 'border border-white'}`} style={{ "width": "18rem", "background": theme === 'light' ? '#f8f9fa' : '#343a40' }}>
        <div className="card-body">
          <h5 className={`card-title ${theme === 'light' ? 'text-dark' : 'text-white'}`}>{note.title}</h5>
          <p className={`card-text ${theme === 'light' ? 'text-dark' : 'text-white'}`}>{note.body}</p>
          <button className="btn btn-sm btn-success" onClick={() => updateNote(note)}><AiFillEdit /></button>
          <button className="btn btn-sm btn-danger mx-2" onClick={confirmDelete}><AiFillDelete /></button>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
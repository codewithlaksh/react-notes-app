import React, { useContext, useState, useRef } from 'react'
import NotesContext from '../context/notes/notesContext'
import ThemeContext from '../context/theme/themeContext'
import AddNote from '../components/AddNote';
import NoteItem from '../components/NoteItem';

export default function Home() {
  const { notes, editNote } = useContext(NotesContext);
  const { theme } = useContext(ThemeContext);
  const [note, setNote] = useState({ id: "", title: "", body: "" });
  const ref = useRef();

  const updateNote = (noteItem) => {
    setNote({id: noteItem.id, title: noteItem.title, body: noteItem.body})
    ref.current.click();
  }

  const handleChange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  }

  const handleSubmit = () => {
    editNote(note.id, note.title, note.body);
    ref.current.click();
    setNote({ title: "", body: "" });
  }

  return (
    <div className="container my-3">
      <AddNote />

      <hr className="my-3" />

      <h2 className={theme === 'light' ? 'text-dark' : 'text-white'}>Your Notes</h2>
      {notes.length != 0 && <div className='row px-0'>
        {notes.map((note) => {
          return <NoteItem key={note.id} note={note} updateNote={updateNote} />
        })}
      </div>}
      {notes.length === 0 && <p className={theme === 'light' ? 'text-dark' : 'text-white'}>No notes available! Please add your first note...</p>}

      <button type="button" ref={ref} className="btn btn-primary" data-toggle="modal" data-target="#editModal" hidden>
        Edit Modal
      </button>

      <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="title" aria-describedby="emailHelp" value={note.title} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="body">Body</label>
                  <input type="text" className="form-control" id="body" value={note.body} onChange={handleChange} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

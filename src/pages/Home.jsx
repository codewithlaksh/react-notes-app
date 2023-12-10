import React, { useContext, useState, useRef } from 'react'
import NotesContext from '../context/notes/notesContext'
import ThemeContext from '../context/theme/themeContext'
import AddNote from '../components/AddNote';
import NoteItem from '../components/NoteItem';

export default function Home() {
  const { notes, editNote, filterNotes } = useContext(NotesContext);
  const { theme } = useContext(ThemeContext);
  const [note, setNote] = useState({ id: "", title: "", body: "" });
  const [filteredNotes, setFilteredNotes] = useState([]);
  const ref = useRef();

  const updateNote = (noteItem) => {
    setNote({ id: noteItem.id, title: noteItem.title, body: noteItem.body })
    ref.current.click();
  }

  const handleChange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  }

  const handleSearch = (e) => {
    const res = filterNotes(e.target.value);
    if (res.length != 0) {
      setFilteredNotes(res);
    } else {
      setFilteredNotes(notes);
    }
  }

  const handleSubmit = () => {
    editNote(note.id, note.title, note.body);
    ref.current.click();
    setNote({ title: "", body: "" });
  }

  return (
    <div className="container my-3">
      <AddNote />

      <hr className={`my-3 ${theme === 'dark' && 'bg-white'}`} />

      <h2 className={theme === 'light' ? 'text-dark' : 'text-white'}>Your Notes</h2>

      <form className="d-flex my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder="Filter notes..." aria-label="Search" onChange={handleSearch} />
        {/* <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button> */}
      </form>
      <hr className={`my-3 ${theme === 'dark' && 'bg-white'}`} />

      {filteredNotes.length != 0 && notes.length != 0 && <div className='row px-0'>
        {filteredNotes.map((note) => {
          return <NoteItem key={note.id} note={note} updateNote={updateNote} />
        })}
      </div>}
      {filteredNotes.length === 0 && notes.length != 0 && <div className='row px-0'>
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

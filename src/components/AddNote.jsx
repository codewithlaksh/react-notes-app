import React, { useContext, useState } from 'react'
import NotesContext from '../context/notes/notesContext';
import ThemeContext from '../context/theme/themeContext';

function AddNote() {
    const { addNote } = useContext(NotesContext);
    const { theme } = useContext(ThemeContext);
    const [note, setNote] = useState({ title: "", body: "" });

    const handleChange = (e) => {
        setNote({ ...note, [e.target.id]: e.target.value });
    }

    const handleSubmit = () => {
        addNote(note.title, note.body);
        setNote({ title: "", body: "" });
    }

    return (
        <>
            <h2 className={theme === 'light' ? 'text-dark' : 'text-white'}>Add Your Note</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title" className={theme === 'light' ? 'text-dark' : 'text-white'}>Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" value={note.title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="body" className={theme === 'light' ? 'text-dark' : 'text-white'}>Body</label>
                    <input type="text" className="form-control" id="body" value={note.body} onChange={handleChange} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </>
    )
}

export default AddNote
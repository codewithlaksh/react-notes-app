import { useState, useEffect } from "react";
import NotesContext from "./notesContext";
import { v4 } from "uuid";

const NotesState = ({ children }) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        const u = localStorage.getItem('inotebook-cwl');

        if (u) {
            const parsed = JSON.parse(u);
            setNotes(parsed['notes']);
        } else {
            setNotes([]);
        }
    }

    const addNote = (title, body) => {
        const u = localStorage.getItem('inotebook-cwl');
        const newNote = {
            id: v4(),
            title: title,
            body: body,
            timestamp: new Date().toLocaleString()
        }

        if (u) {
            const parsed = JSON.parse(u);
            
            if (parsed['notes']) {
                parsed['notes'].push(newNote);
                localStorage.setItem('inotebook-cwl', JSON.stringify(parsed));
            } else {
                parsed['notes'] = newNote;
                localStorage.setItem('inotebook-cwl', JSON.stringify(parsed));
            }
        } else {
            notes.push(newNote);
            const data = { notes: notes }
            localStorage.setItem('inotebook-cwl', JSON.stringify(data));
        }
        getNotes();
    }

    const editNote = (id, title, body) => {
        const u = localStorage.getItem('inotebook-cwl');
        
        if (u) {
            const parsed = JSON.parse(u);
            let note = parsed['notes'].filter(e => {
                return e.id == id
            })
            note[0]['title'] = title;
            note[0]['body'] = body;
            localStorage.setItem('inotebook-cwl', JSON.stringify(parsed));
        }
        getNotes();
    }

    const deleteNote = (id) => {
        const u = localStorage.getItem('inotebook-cwl');
        
        if (u) {
            const parsed = JSON.parse(u);
            parsed['notes'] = parsed['notes'].filter(e => {
                return e.id != id
            })
            localStorage.setItem('inotebook-cwl', JSON.stringify(parsed));
        }
        getNotes();
    }

    return (
        <NotesContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
            {children}
        </NotesContext.Provider>
    )
}

export default NotesState;

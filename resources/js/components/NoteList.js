import {React, useState, useEffect}  from 'react';
import {getNoteList, addNote, deleteNote} from '../services/notes.js'

/**
 * NoteList - show notes
 */
const NoteList = (noteList) => {
    /**
     * customers, setCustomers - customers collection from db
     */
    const [notes, setNotes] = useState([]);
    const [model, setModel] = useState({id: '', text: '', customer_id: ''});
    const handleSubmit = e => 
    { 
        e.preventDefault();
        let n = Object.assign({}, model); 
        n['id'] = '';
        n['text'] = e.target.value;
        n['customer_id'] = customerId;
        addNote(n) 
    }
    const handleDelete = noteId => { deleteNote(noteId) }

    /**
     * fetch notes
     */
     useEffect(() => {
        let todo = true;
        setNotes(noteList)
        return () => todo = false;
    }, [noteList])

    return (
        ''
    );
}

export default NoteList;
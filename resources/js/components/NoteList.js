import {React, useState, useEffect}  from 'react';
import {getNoteList, addNote, deleteNote} from '../services/notes.js'

/**
 * NoteList - show notes
 */
const NoteList = (customerId) => {
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
        getNoteList(customerId)
            .then(notes => {
                if(todo) {
                    setNotes(notes);
                }
            })
        return () => todo = false;
    }, [])

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h5>Note</h5>
                </div>
            </div>

        {
        notes.length > 0 ?
        <table className="table">
            <tbody>
            {notes.map( n => ( 
                <tr key={n.id}>
                    <td>{n.text}</td>
                    <td><button onClick={(e) => handleDelete(n.id)}>Elimina</button></td>
                </tr>
            ))}      
               <tr>
                    <form onSubmit={(e) => handleSubmit(e)}>
                    <td><input type="text" name="note" className="form-control" placeholder="Nuova nota..." /></td>
                    <td><button>Aggiungi</button></td>
                    </form>
                </tr>
            </tbody>
        </table>

        :   <div className="card">
                <div className="card-body">
                    <p>Nessuna nota per questo cliente.</p>

                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input type="text" name="note" className="form-control" placeholder="Nuova nota..." />
                        <button>Aggiungi</button>
                    </form>
                </div>
            </div>
        }
        </div>
    );
}

export default NoteList;
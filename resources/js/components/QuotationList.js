import {React, useState, useEffect}  from 'react';
import {getQuotationList, addQuotation, deleteQuotation} from '../services/quotations.js'

/**
 * QuotationList - show quotations
 */
const QuotationList = (customerId) => {
    /**
     * customers, setCustomers - customers collection from db
     */
    const [quotations, setQuotations] = useState([]);
    const [model, setModel] = useState({id: '', text: '', customer_id: ''});
    const handleSubmit = e => 
    { 
        e.preventDefault();
        let q = Object.assign({}, model); 
        q['id'] = '';
        q['text'] = e.target.value;
        q['customer_id'] = customerId;
        addNote(q) 
    }
    const handleDelete = quotationId => { deleteNote(quotationId) }

    /**
     * fetch quotations
     */
     useEffect(() => {
        let todo = true;
        getQuotationList(customerId)
            .then(quotations => {
                if(todo) {
                    setQuotations(quotations);
                }
            })
        return () => todo = false;
    }, [])

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h5>Preventivi</h5>
                </div>
            </div>

        {
        quotations.length > 0 ?
        <table className="table">
            <tbody>
            {quotations.map( q => ( 
                <tr key={q.id}>
                    <td>{q.text}</td>
                    <td><button onClick={(e) => handleDelete(q.id)}>Elimina</button></td>
                </tr>
            ))}      
               <tr>
                    <form onSubmit={(e) => handleSubmit(e)}>
                    <td><input type="text" name="quotation" className="form-control" placeholder="Nuovo preventivo..." /></td>
                    <td><button>Aggiungi</button></td>
                    </form>
                </tr>
            </tbody>
        </table>

        :   <div className="card">
                <div className="card-body">
                    <p>Nessun preventivo per questo cliente.</p>

                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input type="text" name="note" className="form-control" placeholder="Nuovo preventivo..." />
                        <button>Aggiungi</button>
                    </form>
                </div>
            </div>
        }
        </div>
    );
}

export default QuotationList;
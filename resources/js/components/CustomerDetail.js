import {useState, useEffect} from 'react';
import {getCustomerDetail, deleteCustomer} from '../services/customers.js'
import {getNoteList} from '../services/notes.js'
import {getOfferList} from '../services/offers.js'
import {getQuotationList} from '../services/quotations.js'
import CustomerForm from './CustomerForm';

/**
 * CustomerDetail
 */
const CustomerDetail = ({idDetail, backToTable}) => {
    /**
     * customer, setCustomer - customer detail from db
     * modFlag, setModFlag - plain presentation of the data or modification form
     * handleCloseForm - clean flag and return to plain customer presentation
     */
     const [customer, setCustomer] = useState([]);
     const [notes, setNotes] = useState([]);
     const [offers, setOffers] = useState([]);
     const [quotations, setQuotations] = useState([]);
     const [modFlag, setModFlag] = useState(false);
     const showModForm = () => { setModFlag(!modFlag) }
     const handleDelete = customerId => { deleteCustomer(customerId) }

     /**
      * fetch customer
      */
      useEffect(() => {
         let todo = true;
         getCustomerDetail(idDetail)
             .then(customer => {
                 if(todo) {
                     setCustomer(customer)
                 }
             })
         return () => todo = false;
     }, [idDetail])

     /**
     * fetch notes
     */
      useEffect(() => {
        let todo = true;
        getNoteList(idDetail)
            .then(notes => {
                if(todo) {
                    setNotes(notes);
                }
            })
        return () => todo = false;
    }, [idDetail])

    /**
     * fetch offers
     */
     useEffect(() => {
        let todo = true;
        getOfferList(idDetail)
            .then(offers => {
                if(todo) {
                    setOffers(offers);
                }
            })
        return () => todo = false;
    }, [idDetail])

    /**
     * fetch quotations
     */
     useEffect(() => {
        let todo = true;
        getQuotationList(idDetail)
            .then(quotations => {
                if(todo) {
                    setQuotations(quotations);
                }
            })
        return () => todo = false;
    }, [idDetail])

    /**
     * render
     */
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h2>Dettagli Cliente</h2>
                    <span className="mr-1"><button onClick={backToTable}>Indietro</button></span>
                    <span className="mr-1"><button onClick={showModForm}>Modifca</button></span>
                    <span className="mr-1"><button onClick={(e) => handleDelete(idDetail)}>Elimina</button></span>
                </div>
            
                <div className="card-body">
                    <div className="row">
                    <div className="col-sm">
                    {
                    !modFlag ?
                        <div>
                        <div className="row">
                            <div className="col-sm">
                            <p>Codice Cliente: {customer.id}</p>
                            </div>
                            <div className="col-sm">
                            <p>Nome: {customer.name}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                            <p>Indirizzo: {customer.address}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                            <p>Telefono: {customer.phone}</p>
                            </div>
                            <div className="col-sm">
                            <p>E-mail: {customer.email}</p>
                            </div>
                        </div>
                        </div>
                        
                    : 
                        <CustomerForm customer={customer} showForm={showModForm} />
                    }
                    </div>

                    <div className="col-sm">
                        <div id="NoteList">
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
                                <td>
                                    <form onSubmit={(e) => handleSubmit(e)}>
                                    <input type="text" name="note" className="form-control" placeholder="Nuova nota..." />
                                    <button>Aggiungi</button>
                                    </form>
                                </td>
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
                    </div>
                    </div>

                    <div className="row">
                        <div className="col-sm">
                        <div id="OfferList">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Offerte</h5>
                                </div>
                            </div>

                            {
                            offers.length > 0 ?
                            <table className="table">
                                <tbody>
                                {offers.map( o => ( 
                                    <tr key={o.id}>
                                        <td>{o.text}</td>
                                        <td><button onClick={(e) => handleDelete(o.id)}>Elimina</button></td>
                                    </tr>
                                ))}      
                                <tr>
                                    <td>
                                        <form onSubmit={(e) => handleSubmit(e)}>
                                        <input type="text" name="offer" className="form-control" placeholder="Nuova offerta..." />
                                        <button>Aggiungi</button>
                                        </form>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            :   <div className="card">
                                    <div className="card-body">
                                        <p>Nessuna offerta per questo cliente.</p>

                                        <form onSubmit={(e) => handleSubmit(e)}>
                                            <input type="text" name="note" className="form-control" placeholder="Nuova offerta..." />
                                            <button>Aggiungi</button>
                                        </form>
                                    </div>
                                </div>
                            }
                            </div>
                        </div>

                        <div className="col-sm">
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
                                    <td>
                                        <form onSubmit={(e) => handleSubmit(e)}>
                                        <input type="text" name="quotation" className="form-control" placeholder="Nuovo preventivo..." />
                                        <button>Aggiungi</button>
                                        </form>
                                    </td>
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
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CustomerDetail;
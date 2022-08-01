import {useState, useEffect} from 'react';
import {getCustomerDetail, deleteCustomer} from '../services/customers.js'
import {getNoteList} from '../services/notes.js'
import {getOfferList} from '../services/offers.js'
import {getQuotationList} from '../services/quotations.js'

/**
 * CustomerDetail
 */
const CustomerDetail = ({idDetail}) => {
    /**
     * @section MISC
     */
    const token = document.querySelector('meta[name="token"]').getAttribute('value');
    const [modFlag, setModFlag] = useState(false);
    const showModForm = () => { setModFlag(!modFlag) }

    /**
     * @section CUSTOMER detail and mod form
     * customer, setCustomer - customer detail from db
     * name
     * address
     * phone
     * email
     * handledelete
     * handleSubmit - mod customer
     */
    const [customer, setCustomer] = useState([]);
    const [model, setModel] = useState({id: '', name: '', address: '', phone: '', email: ''});
    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const handleDelete = customerId => { deleteCustomer(customerId) }
    const handleSubmit = (e) => 
    {
        e.preventDefault(); 

        let c = Object.assign({}, model);
        c['id'] = customer.id;
        c['name'] = name;
        c['address'] = address;
        c['phone'] = phone;
        c['email'] = email;
  
        fetch( `/api/customers/${customer.id}`, 
        {
            method: 'put',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-CSRF-TOKEN": token
            },
            body: JSON.stringify(c)
        })
        .then(response => 
        {
            return response.json();
        })
    }

    /**
     * @section NOTES
     */
    const [notes, setNotes] = useState([]);

    /**
     * @section OFFERS
     */
    const [offers, setOffers] = useState([]);

    /**
     * @section QUOTATIONS
     */
    const [quotations, setQuotations] = useState([]);

    //#############################################################

    /**
     * @section FETCH DATA
     */

    //customers
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

    //notes
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

    //offers
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

    //quotations
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

    //##############################################################

    /**
     * @section RENDER
     */
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h2>Dettagli Cliente</h2>
                    <span className="mr-1"><button>Indietro</button></span>
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
                        <div>
                        <h2>Modifica</h2>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="row">
                            <div className="col-sm">
                            <div className="form-group">
                                <label>Nome:</label>
                                <input type="text" name="name" defaultValue={customer.name} 
                                onChange={(e) => setName(e.target.value)} className="form-control" />
                            </div>
            
                            <div className="form-group">
                                <label>Indirizzo:</label>
                                <input type="text" name="address" defaultValue={customer.address} 
                                onChange={(e) => setAddress(e.target.value)} className="form-control" />
                            </div>
                            </div>
                            <div className="col-sm">
                            <div className="form-group">
                                <label>Telefono:</label>
                                <input type="text" name="phone" defaultValue={customer.phone} 
                                onChange={(e) => setPhone(e.target.value)} className="form-control" />
                            </div>
            
                            <div className="form-group">
                                <label>E-mail:</label>
                                <input type="text" name="email" defaultValue={customer.email} 
                                onChange={(e) => setEmail(e.target.value)} className="form-control" />
                            </div>
                            </div>
                            </div>
                            <div>
                                <button onClick={showModForm}>Annulla</button>
                                <button className="btn btn-primary">Invia</button>
                            </div>
                        </form>
                        </div>
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
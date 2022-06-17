import {React, useState, useEffect}  from 'react';
import {getOfferList, addOffer, deleteOffer} from '../services/offers.js'

/**
 * OffersList - show offers
 */
const OfferList = (customerId) => {
    /**
     * 
     */
    const [offers, setOffers] = useState([]);
    const [model, setModel] = useState({id: '', text: '', customer_id: ''});
    const handleSubmit = e => 
    { 
        e.preventDefault();
        let o = Object.assign({}, model); 
        o['id'] = '';
        o['text'] = e.target.value;
        o['customer_id'] = customerId;
        addNote(o) 
    }
    const handleDelete = offerId => { deleteOffer(offerId) }

    /**
     * fetch offers
     */
     useEffect(() => {
        let todo = true;
        getOfferList(customerId)
            .then(offers => {
                if(todo) {
                    setOffers(offers);
                }
            })
        return () => todo = false;
    }, [])

    return (
        <div>
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
                    <form onSubmit={(e) => handleSubmit(e)}>
                    <td><input type="text" name="offer" className="form-control" placeholder="Nuova offerta..." /></td>
                    <td><button>Aggiungi</button></td>
                    </form>
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
    );
}

export default OfferList;
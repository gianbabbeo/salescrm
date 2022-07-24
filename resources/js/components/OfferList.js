import {React, useState, useEffect}  from 'react';
import {addOffer, deleteOffer} from '../services/offers.js'

/**
 * OffersList - show offers
 */
const OfferList = (customerId) => {
    /**
     * 
     */
    
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

    

    return (
        ''
    );
}

export default OfferList;
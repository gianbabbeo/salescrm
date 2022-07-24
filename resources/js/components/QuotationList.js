import {React, useState, useEffect}  from 'react';


/**
 * QuotationList - show quotations
 */
const QuotationList = (customerId) => {
    /**
     * customers, setCustomers - customers collection from db
     */
    
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

    return (
''
    );
}

export default QuotationList;
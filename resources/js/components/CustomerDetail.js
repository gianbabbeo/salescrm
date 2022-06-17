import {useState, useEffect} from 'react';
import {getCustomerDetail, deleteCustomer} from '../services/customers.js'
import CustomerForm from './CustomerForm';
import NoteList from './NoteList';
import OfferList from './OfferList';
import QuotationList from './QuotationList';

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
                    <NoteList customerId={idDetail} />
                    </div>
                    </div>

                    <div className="row">
                        <div className="col-sm">
                            <OfferList customerId={idDetail} />
                        </div>
                        <div className="col-sm">
                            <QuotationList customerId={idDetail} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CustomerDetail;
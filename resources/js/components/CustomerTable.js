import {React, useState, useEffect}  from 'react';
import {getCustomerList} from '../services/customers.js'

/**
 * CustomerTable - show customers
 */
const CustomerTable = ({handleDetail}) => {
    /**
     * customers, setCustomers - customers collection from db
     */
    const [customers, setCustomers] = useState([]);

    /**
     * fetch customers
     */
     useEffect(() => {
        let todo = true;
        getCustomerList()
            .then(customers => {
                if(todo) {
                    setCustomers(customers)
                }
            })
        return () => todo = false;
    }, [])

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h2>Lista Clienti</h2>
                </div>
            </div>

        {
        customers.length > 0 ?
        <table className="table">
            <thead className="thead-dark">
                <tr>
                <th scope="col">Nome</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
            {customers.map( c => ( 
                <tr key={c.id}>
                    <td>{c.name}</td>
                    <td><button onClick={(e) => handleDetail(c.id)}>Dettaglio</button></td>
                </tr>
            ))}         
            </tbody>
        </table>

        :   <div className="card">
                <div className="card-body">
                    <p>Nessun Cliente nel database.</p>
                </div>
            </div>
        }
        </div>
    );
}

export default CustomerTable;
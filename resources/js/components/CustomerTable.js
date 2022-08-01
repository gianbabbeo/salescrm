import {React, useState, useEffect}  from 'react';

/**
 * CustomerTable - show customers
 * @param
 * handleDetail - fallback function for parent: it sets a selected Customer Id
 */
const CustomerTable = ({handleDetail}) => {
    /**
     * @section CUSTOMERS TABLE
     * customers, setCustomers - customers collection from db
     */
    const [customers, setCustomers] = useState([]);

    /**
     * @section ADD CUSTOMER
     * model- empty customer model - @togliere ?
     * name, setName
     * address, setAddress
     * phone, setPhone
     * email, setEmail
     * token - csfr token from meta tags
     * handleSubmit - new customer
     */
    const [model, setModel] = useState({name: '', address: '', phone: '', email: ''});
    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const token = document.querySelector('meta[name="token"]').getAttribute('value');
    const handleSubmit = (e) => 
    {
        e.preventDefault(); 

        let c = Object.assign({}, model);
        c['name'] = name;
        c['address'] = address;
        c['phone'] = phone;
        c['email'] = email;
 
        fetch( '/api/customers/', 
        {
            method:'post',
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

    //###########################################################################

    /**
     * @section FETCH DATA
     * customers
     */
    useEffect(() => {
        let todo = true;
        fetch('/api/customers').then(data => data.json())
            .then(customers => {
                if(todo) {
                    setCustomers(customers)
                }
            })
        return () => todo = false;
    }, [])

    //################################################################
    
    /**
     * @section RENDER
     */
    return (
    <div>
        <div className="col-sm">
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

        <div className="col-sm">
        <div id="NewCustomer">
            <h2>Aggiungi Cliente</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                    <div className="col-sm">
                        <div className="form-group">
                            <label>Nome:</label>
                            <input type="text" name="name"
                            onChange={(e) => setName(e.target.value)} className="form-control" />
                        </div>

                        <div className="form-group">
                            <label>Indirizzo:</label>
                            <input type="text" name="address"
                            onChange={(e) => setAddress(e.target.value)} className="form-control" />
                        </div>
                    </div>

                    <div className="col-sm">
                        <div className="form-group">
                            <label>Telefono:</label>
                            <input type="text" name="phone"
                            onChange={(e) => setPhone(e.target.value)} className="form-control" />
                        </div>

                        <div className="form-group">
                            <label>E-mail:</label>
                            <input type="text" name="email"
                            onChange={(e) => setEmail(e.target.value)} className="form-control" />
                        </div>
                    </div>
                </div>

                <div>
                    <button className="btn btn-primary">Invia</button>
                </div>
            </form>
        </div>
        </div>
    </div>
    );
}

export default CustomerTable;
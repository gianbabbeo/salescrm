import {useState} from 'react';
import { addCustomer, modCustomer } from '../services/customers';

/**
 * CustomerForm - handles customer create and modify
 * if customer is populated we are i modify mode
 * else we are in create mode
 */
const CustomerForm = ({customer, showForm}) => {
    /**
     * model, setModel - empty customer model
     */
    const [model, setModel] = useState({name: '', address: '', phone: '', email: ''});
    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const handleSubmit = (e) => 
    {
        e.preventDefault(); 
        let id = document.getElementsByName('id').value;
        let c = Object.assign({}, model);
        c['id'] = id || '';
        c['name'] = name;
        c['address'] = address;
        c['phone'] = phone;
        c['email'] = email;
        console.log(c);
        if (customer != null) 
            { 
            modCustomer(model)
            .then(i => { }, 
                error => 
                    {
                    console.log(error.message)})
            .catch(e => console.log(e)
            ); 
            }
        else 
            { 
            addCustomer(model)
            .then(i => { console.log(response) }, 
                error => 
                    {
                    console.log(error.message)
                    console.log(response)
                    })
            .catch(e => 
                {
                console.log(e)
                console.log(response.body)
                }
            ); 
            }
    }

    /**
     * render
     */
    return (
        <div>
            <h2>Modulo Cliente {customer != null ? customer.name : null}</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                <div className="col-sm">
                <div className="form-group">
                    <label>Nome:</label>
                    {
                    customer != null ?
                    <input type="text" name="name" value={customer.name} 
                    onChange={(e) => setName(e.target.value)} className="form-control" />
                    :
                    <input type="text" name="name"
                    onChange={(e) => setName(e.target.value)} className="form-control" />
                    }
                </div>

                <div className="form-group">
                    <label>Indirizzo:</label>
                    {
                    customer != null ?
                    <input type="text" name="address" value={customer.address} 
                    onChange={(e) => setAddress(e.target.value)} className="form-control" />
                    :
                    <input type="text" name="address"
                    onChange={(e) => setAddress(e.target.value)} className="form-control" />
                    }
                </div>
                </div>
                <div className="col-sm">
                <div className="form-group">
                    <label>Telefono:</label>
                    {
                    customer != null ?
                    <input type="text" name="phone" value={customer.phone} 
                    onChange={(e) => setPhone(e.target.value)} className="form-control" />
                    :
                    <input type="text" name="phone"
                    onChange={(e) => setPhone(e.target.value)} className="form-control" />
                    }
                </div>

                <div className="form-group">
                    <label>E-mail:</label>
                    {
                    customer != null ?
                    <input type="text" name="email" value={customer.email} 
                    onChange={(e) => setEmail(e.target.value)} className="form-control" />
                    :
                    <input type="text" name="email"
                    onChange={(e) => setEmail(e.target.value)} className="form-control" />
                    }
                </div>
                </div>
                </div>
                <input type="hidden" name="id" value={customer != null ? customer.id : ''} />

                <div>
                    {showForm != null ? <button onClick={showForm}>Annulla</button> : null}
                    <button className="btn btn-primary">Invia</button>
                </div>
            </form>
        </div>
    );
}

export default CustomerForm;
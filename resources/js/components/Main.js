import {React, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import CustomerTable from './CustomerTable';
import CustomerDetail from './CustomerDetail';

const Main = () => {
    /**
     * inDetail, setInDetail - single customer detail section flag
     * handleDetail - fallback function from CustomerTable: it sets a Customer Id for CustomerDetail component
     */
    const [idDetail, setIdDetail] = useState(null);
    const handleDetail = id => { setIdDetail(id) }
    
    /**
     * render
     */
    return (
        <div className="container">
            <div className="row">
                {
                idDetail &&
                <CustomerDetail idDetail={idDetail} />
                }  
            </div>     
            <div className="row">
                <CustomerTable handleDetail={handleDetail} />     
            </div>
        </div>
    );
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}

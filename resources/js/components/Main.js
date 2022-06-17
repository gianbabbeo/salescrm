import {React, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import CustomerForm from './CustomerForm';
import CustomerTable from './CustomerTable';
import CustomerDetail from './CustomerDetail';

const Main = () => {
    /**
     * isShowing, toggle - handle new customer form show in modal, using custom hook useModal
     * inDetail, setInDetail - single customer detail section flag
     * handleDetail - fallback function form customertable
     * handleExit - clean flags and return to customertable (exit from form and detail)
     */
    const [idDetail, setIdDetail] = useState(null);
    const handleDetail = id => { setIdDetail(id) }
    const backToTable = () => { setIdDetail(null) }
    
    /**
     * render
     */
    return (
        <div className="container">
            <div className="row">
                
                {
                idDetail == null ? 
                <div>
                    <div className="col-sm">
                        <CustomerForm customer={null} showForm={null} />
                    </div>
                    <div className="col-sm">
                        <CustomerTable handleDetail={handleDetail} />
                    </div>
                </div>
                :
                <CustomerDetail idDetail={idDetail} backToTable={backToTable} />
                }                

            </div>
        </div>
    );
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}

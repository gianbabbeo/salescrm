/**
 * customers service functions
 * get whole list, get single in detail, 
 * delete one, insert one, modify one
 */

/**
 * getCustomerList
 */
export async function getCustomerList() 
{
  return fetch('/api/customers').then(data => data.json());
}

/**
 * getCustomerDetail
 */
 export async function getCustomerDetail(id) 
 {
   return fetch('/api/customers/' + id).then(data => data.json());
 }

 /**
  * addCustomer
  */
  export async function addCustomer(customer) 
  {
    fetch( '/api/customers/', 
    {
      method:'post',
      headers: 
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(response => 
    {
      console.log(response.status);
      if (!response.status >= 400) throw new Error("Errore server: caricamento dati");
      return response.json();
    })
    .catch(e=>console.log(e))
  }

/**
  * modCustomer
  */
    export async function modCustomer(customer) 
    {
      return fetch(`/api/customers/${customer.id}`, 
      {
         method:'put',
         headers: 
         {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(customer)
     })
     .then(data => data.json());
    }
 
  /**
  * deleteCustomer
  */
 export async function deleteCustomer(customerId) 
 {
   return fetch( `/api/customers/${customerId}`, 
   {
     method: 'delete', 
     headers: 
     {
       'Accept': 'application/json', 
       'Content-Type': 'application/json'
     }
   })
   .then(data => data.json());
 }
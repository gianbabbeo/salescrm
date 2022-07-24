/**
 * quotation service functions
 * get whole list 
 * delete one, insert one, modify one
 */

/**
 * getQuotationList
 */
 export async function getQuotationList(customerId) 
 {
   return fetch(`/api/quotations/${customerId}`).then(data => data.json());
 }
 
 /**
  * addQuotation
  */
  export async function addQuotation(quotation) 
  {
    return fetch('/api/quotations/', 
    {
       method:'post',
       headers: 
       {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(quotation)
   })
   .then(data => data.json());
  }
 
  /**
  * deleteQuotation
  */
 export async function deleteQuotation(quotationId) 
 {
   return fetch( `/api/notes/${quotationId}`, 
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
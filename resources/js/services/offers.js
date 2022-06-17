/**
 * offers service functions
 * get whole list 
 * delete one, insert one, modify one
 */

/**
 * getOfferList
 */
 export async function getOfferList(customerId) 
 {
   return fetch('/api/offers/' + customerId).then(data => data.json());
 }
 
 /**
  * addOffer
  */
  export async function addOffer(offer) 
  {
    return fetch('/api/offers/', 
    {
       method:'post',
       headers: 
       {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(offer)
   })
   .then(data => data.json());
  }
 
  /**
  * deleteOffer
  */
 export async function deleteOffer(offerId) 
 {
   return fetch( `/api/offers/${offerId}`, 
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
/**
 * notes service functions
 * get whole list 
 * delete one, insert one, modify one
 */

/**
 * getNoteList
 */
 export async function getNoteList(customerId) 
 {
   return fetch(`/api/notes/${customerId}`).then(data => data.json());
 }
 
 /**
  * addNote
  */
  export async function addNote(note) 
  {
    return fetch('/api/notes/', 
    {
       method:'post',
       headers: 
       {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(note)
   })
   .then(data => data.json());
  }
 
  /**
  * deleteNote
  */
 export async function deleteNote(noteId) 
 {
   return fetch( `/api/notes/${noteId}`, 
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
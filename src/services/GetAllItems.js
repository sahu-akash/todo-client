// THIS METHOD GET ALL ELEMENTS FROM THE TODOLIST
// CAN BE USED FOR TESTING
export default async function getAllItems(url) {
  const response = await fetch(url);
  return await response.json();

   
}

// do whatever you want with the data

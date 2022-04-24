// THIS METHOD DELETES ALL ELEMENTS FROM THE TODOLIST
// CAN BE USED FOR TESTING

export default async function deleteAllItem() {
  const url = "http://localhost:3005/";
  const response = await fetch("http://localhost:3005/");
  const data = await response.json();


  data.forEach((element) => {
    fetch(`${url}delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: element.id }),
    }).catch((err) => console.log(err));
   
  });
}

import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const url = "http://localhost:3005/";
  const [newItem, setnewItem] = useState("");
  const [list, setList] = useState([]);

  function updateInput(event) {
    event.preventDefault();
    setnewItem(event.target.value);
  }

  const updateStatus = (e, id, itemStatus) => {
    fetch(`${url}modify/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: itemStatus === "Pending" ? "Done" : "Pending",
      }),
    })
      .then(() => getItems())
      .catch((err) => console.log(err));
  };

  const deleteItem = (id) => {
    fetch(`${url}delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then(() => getItems())
      .catch((err) => console.log(err));
  };

  const addItem = (data) => {
    fetch(`${url}store-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: data }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((res) => {
        if (res.success === true) setnewItem("");
        getItems();
      })
      .catch((err) => console.log(err));
  };
  function getItems() {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((myJson) => setList(myJson))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div data-testid="todoapp">
      <h1 className="app-title">MY TODO LIST</h1>

      <div className="container">
        <div className="wrapper">
          <h2>Add an Item...</h2>
          <br />
          <input
            data-testid="input"
            className="InputBox"
            type="text"
            placeholder="Type item here"
            value={newItem}
            onChange={(e) => updateInput(e)}
          />
          <button
            className="btn-add"
            onClick={(e) => addItem(newItem)}
            disabled={!newItem.length}
            data-testid="addButton"
          >
            ADD
          </button>
        </div>

        <br />

        <ul data-testid="TodoList">
        <div className='wrapper' >
            {list.map((item) => (
              <li key={item.id} className="Partcontainer" data-testid="todo">
              
                <h3
                  className="List-Item"
                  style={{
                    textDecoration:
                      item.status === "Done" ? "line-through" : "none",
                  }}
                  onClick={(e) => updateStatus(e, item.id, item.status)}
                >
                  {item.item}
                </h3>
                <button
                  data-testid="deleteButton"
                  className="btn"
                  onClick={() => deleteItem(item.id)}
                >
                  <i>x</i>
                </button>
              </li>
            ))}</div>
          
        </ul>
      </div>
    </div>
  );
}

export default App;

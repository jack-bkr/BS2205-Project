const n1 = document.querySelector('#n1'); // get element by id
const h1 = document.querySelector('#h1');
const URL = window.location.origin; // get current url

function getItem() {
    document.querySelectorAll(".itemstable").forEach(e => e.remove());
    console.log(URL + "/api/item")
    try {
        const promise = fetch(URL + "/api/item").then((response) => { // fetch data as promise from api
            return response.json().then((data) => { // get data from promise and convert to json
                const dFrag = document.createDocumentFragment(); // create document fragment
                for (var i = 0; i < data.items.length; i++) {
                    const row = document.createElement('tr'); // create row element
                    const num = document.createElement('td'); // create element
                    const name = document.createElement('td'); // create element
                    const handle = document.createElement('td'); // create element
                    num.textContent = i + 1; // set text content of element to retrieved data
                    name.textContent = data.items[i].name; // set text content of element to retrieved data
                    handle.textContent = data.items[i].handle; // set text content of element to retrieved data
                    row.appendChild(num); // append element to fragment
                    row.appendChild(name); // append element to fragment
                    row.appendChild(handle); // append element to fragment
                    row.className = "itemstable";
                    dFrag.appendChild(row); // append row fragment to table fragment
                }

                document.getElementById("table1").appendChild(dFrag); // append table fragment to table element

            })
        })
    } catch (error) {
        console.log(error);
    }
}

function addItem() {
    var name = prompt("Please enter name:", "name");
    var handle = prompt("Please enter handle:", "handle");
    console.log(URL + "/api/item")
    try {
        const promise = fetch(URL + "/api/item", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                handle: handle
            })
        }).then((response) => {
            return response.json().then((data) => {
                console.log(data);
            })
        }) 
    } catch (error) {
        console.log(error);
    }
}

function delItem() {
    var name = prompt("Please enter name:", "name");
    try {
        const promise = fetch(URL + "/api/item", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        }).then((response) => {
            return response.json().then((data) => {
                console.log(data);
            })
        })
    } catch (error) {
        console.log(error);
    }
}





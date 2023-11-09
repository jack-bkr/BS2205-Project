const n1 = document.querySelector('#n1'); // get element by id
const h1 = document.querySelector('#h1');

function getData() {
    const promise = fetch("http://localhost:4000/api").then((response) => { // fetch data as promise from api
        return response.json().then((data) => { // get data from promise and convert to json
            console.log(data.items[0].name); // log data to console
            n1.textContent = data.items[0].name; // set text content of element to retrieved data
            console.log(data.items[0].handle);
            h1.textContent = data.items[0].handle;
        })
    })
}





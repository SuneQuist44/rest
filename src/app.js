const container = document.getElementById('container');
const basket = document.getElementById('basket');
createFromData();

async function itemsToAdd() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const res = await fetch(url);
    const data = await res.json();
    return data;
};

async function fetchBasket() {
    const url = 'http://localhost:1600/basket/get';
    const res = await fetch(url);
    const data = await res.json();
    return data;
};

async function createFromData() {
    const itemsRef = await itemsToAdd();
    itemsRef.forEach(el => {
        container.innerHTML += `<div>${el.title}</div>
        <button onclick="add(${el.id}, '${el.title}')">Add To Cart</button>`
        // <button onClick="deleteBtn(this)" data-id="${el._id}">Delete</button>
    });

    const basketRef = await fetchBasket();
    basketRef.forEach(el => {
        basket.innerHTML += `<div>${el.item}</div>
        <div>${el.qty}</div>
        <button onClick="deleteBtn(this)" data-id="${el._id}">Delete</button>`
    });
};

let qty = 0;
async function add(id, title) {

    const basketRef = await fetchBasket();
    let idFilter = basketRef.filter(index => index.id === id)

    if (qty > 1) {
        qty++
    }
    const url = 'http://localhost:1600/basket/post';
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            itemId: title,
            id: id,
            qty: qty
        })
    }).then(data => console.log(data))
}

async function deleteBtn(btn) {
    const id = btn.dataset.id
    const url = `http://localhost:1600/basket/get/${id}`;
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            qty: 2
        })
    })
        .then(res => res.json())
        .then(data => console.log(data))
};
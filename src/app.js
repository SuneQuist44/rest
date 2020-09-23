const container = document.getElementById('container');
createFromData();

async function fetchData() {
    const url = 'http://localhost:1600/users';
    const res = await fetch(url);
    const data = await res.json();
    return data;
};

async function createFromData() {
    const ref = await fetchData();
    ref.forEach(el => {
        container.innerHTML += `<div>${el.name}</div>
        <button onClick="deleteBtn(${el.id})">Delete</button>`
    });
};

async function deleteBtn(id) {
    const url = `http://localhost:1600/users/${id}`;
    fetch(url, { method: 'DELETE' })
};
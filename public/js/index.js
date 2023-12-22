//variable con los productos

let products = [];

const getProducts = async () => {
    const response = await fetch("/api/productos/");
    const data = await response.json();
    products = data;
}

const updateProduct = async (id) => {
    const response = await fetch(`/api/productos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: "Nuevo producto",
            precio: 100,
            imagen: "http://",
            descripcion: "Nuevo producto",
            stock: 10,
        }),
    });
    const data = await response.json();
    console.log(data);
}


const deleteProduct = async (id) => {
    const response = await fetch(`/api/productos/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
}


//imprimo card de producto en pantalla en <div id="productos"></div>


const printProduct = (products) => {
    const container = document.getElementById("productos");
    container.innerHTML = "";
    products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("col");
        card.innerHTML = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <img src="${product.foto}" class="card-img-top" alt="...">
              <h5 class="card-title">${product.nombre}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${product.precio}</h6>
                <p class="card-text">${product.descripcion}</p>
                <div class="btn-group" role="group" aria-label="Basic example">
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="updateProduct(${product.id})">
                    Update
                </button>
                <button type="button" class="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
        `;
        container.appendChild(card);
    });
};

//hago el fetch de los productos y los imprimo en pantalla

getProducts().then(() => printProduct(products));



//imprimo card de producto en pantalla


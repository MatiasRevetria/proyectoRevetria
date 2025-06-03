const url_api = "https://fakestoreapi.com/";
const [,, method, resource, ...args] = process.argv;


const getProducts = async () => {
    const response = await fetch(`${url_api}products`);
    const data = await response.json();
    console.log(data)
}

const getProductsByID = async (id) => {
    const response = await fetch(`${url_api}products/${id}`);
    const data = await response.json();
    console.log(data);
}

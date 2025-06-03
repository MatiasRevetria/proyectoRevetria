const url_api = "https://fakestoreapi.com/";
const [,, method, resource, ...args] = process.argv;


const getAllProducts = async () => {
    const response = await fetch(`${url_api}products`);
    const data = await response.json();
    console.log(data)
}

const getProductsByID = async (id) => {
    const response = await fetch(`${url_api}products/${id}`);
    const data = await response.json();
    console.log(data);
}

const createProduct = async (title, price, category) => {
    const body = {
        title,
        price: parseFloat(price),
        description: "Producto Nuevo",
        image: "https://i.pravatar.cc",
        category,
    };

    const response = await fetch(`${url_api}products`,{
        method: "POST",
        body: JSON.parse(body),
        headers: {'Content-Type' : 'application/json'}
    });

    const data = await response.json();
    console.log(data);
}

const deleteProduct = async (id) => {

    const response = await fetch(`${url_api}products/${id}`, {method:"DELETE"});
    const data = await response.json();
    console.log(data); 
}

const main = async () => {
  try {
    if (method === 'GET' && resource === 'products') {
      const [id] = args;
      if (id) await getProductsByID(id);
      else await getAllProducts();
    } else if (method === 'POST' && resource === 'products') {
      const [title, price, category] = args;
      if (title && price && category) {
        await createProduct(title, price, category);
      } else {
        console.error('Faltan argumentos para crear un producto.');
      }
    } else if (method === 'DELETE' && resource.startsWith('products/')) {
      const id = resource.split('/')[1];
      await deleteProduct(id);
    } else {
      console.error('Comando no reconocido.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

main();
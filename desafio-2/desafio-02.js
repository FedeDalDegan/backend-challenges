// Renombramos las promesas para mejor lectura
import {promises as fs} from "fs"
import crypto from "crypto"

class ProductManager{
    constructor(){
        this.products = []
        this.productCode = 1
        this.path = "./productos.json"
    }

    // Añadir un producto requiriendo estos campos.
    addProduct = async (product) => {
        if(!product.title || !product.desc || !product.price || !product.thumbnail || !product.code || !product.stock){
            console.error("No dejar campos vacios.")
            return
        }

        // Verificacion de codigo existente.
        if(this.products.some(existingProduct => existingProduct.code === product.code)){
            console.error("Codigo ya existente.")
            return
        }

        product.code = this.productCode++; // Codigo autoincrementable
        this.products.push(product); // Añadir producto al ARRAY
    
        await fs.writeFile(this.path, JSON.stringify(this.products));
    
        console.log(`Producto agregado: ${product.title}`);
    }

    // Mostrar el ARRAY de productos.
    getProducts(){
        return this.products
    }

    // Buscamos un producto que coincida con el ID
    getProductById(id){
        const Product = this.products.find(existingProduct => existingProduct.id === id) 

        if(!Product){
            return "Producto no encontrado"
        }else{
            return Product
        }
    }

    // Sobreescribimos la informacion (stock y precio) de un producto existente
    updateProduct = async (producto) => {
        let productos = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const i = await productos.findIndex((prod) => prod.id === producto.id);
        if (i !== -1) {
            productos[i].stock += producto.stock; // SUMAMOS AL STOCK ( += )
            productos[i].price = producto.price; // ACTUALIZAMOS NUEVO PRECIO ( = )
        }
    
        await fs.writeFile(this.path, JSON.stringify(productos));
    }
    

    // Eliminamos X producto
    deleteProduct = async (id) => {
    }
    
}

// Uso.
const ProductManagerInstance = new ProductManager()

// Cargamos productos.
// Si se modifica STOCk o PRICE, se sobreescribira en el archivo "productos.json"
const prod1 = {
    id: "6ecb0c19061da3665066", // crypto.randomBytes(10).toString("hex"),
    title: "Producto 1",
    desc: "Descripcion de producto 1",
    price: 30,
    thumbnail: "./ruta/img1.jpg",
    code: 1,
    stock: 20
}

const prod2 = {
    id: "194c5227d8acd83db884", // crypto.randomBytes(10).toString("hex"),
    title: "Producto 2",
    desc: "Descripcion de producto 2",
    price: 150,
    thumbnail: "./ruta/img2.jpg",
    code: 2,
    stock: 5
}


// Añadimos productos al JSON
ProductManagerInstance.addProduct(prod1)
ProductManagerInstance.addProduct(prod2)

// Actualizamos producto (STOCK y/o PRICE)
ProductManagerInstance.updateProduct(prod1)
ProductManagerInstance.updateProduct(prod2)

// Lista de todos los productos añadidos
console.log("Todos los productos: ", ProductManagerInstance.getProducts()) // Mostrara el array de productos

// Encontrar producto por ID
const FindProductId = "6ecb0c19061da3665066" // Id producto 1
const FoundProduct = ProductManagerInstance.getProductById(FindProductId)
console.log(`Producto con ID: ${FindProductId}`, FoundProduct) // Mostrara por consola el {prod1}

// Eliminar producto

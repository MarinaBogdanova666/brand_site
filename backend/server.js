const fs = require('fs');
const express = require("express");

// Создаём приложение Express.
const app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Функция для получения списка всех продутов.
const getProducts = () => {
    let fileData = fs.readFileSync('./data/products.json', {encoding: 'utf-8'});
    return JSON.parse(fileData);
};
// Функция для получения списка всех продутов из корзины.
const getCart = () => {
    let fileData = fs.readFileSync('./data/cart.json', {encoding: 'utf-8'});
    return JSON.parse(fileData);
};


const addToCart = (id) =>{
    let cartData = getCart();
    let productsData = getProducts();
    let obj = productsData.find( product => id == product.id_product);
    if(obj){
        let cartObjIndex = cartData.findIndex(product => obj.id_product == product.id_product);
        if(cartObjIndex >= 0){
            cartData[cartObjIndex].quantity++
        } else {
            cartData.push({...obj, quantity: 1});
        }
    } 
    updateCartData(cartData);
};

const decCart = (id) =>{
    let cartData = getCart();
    let cartObjIndex = cartData.findIndex(product => id == product.id_product);
    if(cartObjIndex >= 0){
        if(cartData[cartObjIndex].quantity > 1){
            cartData[cartObjIndex].quantity--
        } else {
            cartData.splice(cartObjIndex, 1);
        }
    }
    updateCartData(cartData);
};

const delFromCart = (id) =>{
    let cartData = getCart();
    let cartObjIndex = cartData.findIndex(product => id == product.id_product);
    if(cartObjIndex >= 0){
        cartData.splice(cartObjIndex, 1);
    }
    updateCartData(cartData);
};

// Перезапись файла корзины
const updateCartData = (cartData) => {
    fs.writeFileSync('./data/cart.json', JSON.stringify(cartData, null, 4));
};


// определяем обработчик маршрута "/get-products"
app.get("/get-products", function(request, response){
    // отправляем ответ
    response.send(getProducts());
});

// определяем обработчик маршрута "/cart"
app.get("/cart", function(request, response){
    // отправляем ответ
    response.send(getCart());
});

app.get("/cart/:id", function(request, response){
    addToCart(request.params.id);
    // отправляем ответ
    response.send(getCart());
});

app.get("/cart-dec/:id", function(request, response){
    decCart(request.params.id);
    // отправляем ответ
    response.send(getCart());
});

app.get("/cart-del/:id", function(request, response){
    delFromCart(request.params.id);
    // отправляем ответ
    response.send(getCart());
});

// начинаем прослушивать подключения на 3000 порту
app.listen(3000, () => {
    console.log("Сервер запущен на потру 3000");
});

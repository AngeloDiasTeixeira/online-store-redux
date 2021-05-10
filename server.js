const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3001;

const app = express();

let products = [
    {id: 1, name: "par of shoes 1", category: "shoes", price: 100, imageUrl: "https://cdn.britannica.com/04/123704-050-023DC490/Pair-leather-shoes.jpg"},
    {id: 2, name: "par of shoes 2", category: "shoes", price: 200, imageUrl: "https://www.rei.com/media/5bbcbee2-1b95-4b9a-9347-065a3937152c?size=784x588"},
    {id: 3, name: "hat 1", category: "hats", price: 300, imageUrl: "https://assets.adidas.com/images/w_600,f_auto,q_auto/7aac39a2a0eb4cb4915ba887014c43b8_9366/Superlite_Hat_Black_CJ0445_01_standard.jpg"},
    {id: 4, name: "hat 2", category: "hats", price: 400, imageUrl: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/dfad6b12-71f9-4709-9851-7999516e11f1/legacy91-golf-hat-MRRW3Q.jpg"},
    {id: 5, name: "backpack 1", category: "backpacks", price: 500, imageUrl: "https://www.helikon-tex.com/media/catalog/product/cache/4/image/500x/17f82f742ffe127f42dca9de82fb58b1/p/l/pl-dtn-nl-1919.jpg"},
    {id: 6, name: "backpack 2", category: "backpacks", price: 600, imageUrl: "https://www.worten.pt/i/1364b3fc7d902892717af9c8642fa4965471f4fd.jpg"},
    {id: 7, name: "coat 1", category: "coats", price: 700, imageUrl: "https://racepro.pt/media/multimedia/ImagensMobile/ARTIGOS/apico-coat-bu.jpg"},
    {id: 8, name: "coat 2", category: "coats", price: 800, imageUrl: "https://cdn.luxe.digital/media/2020/10/01123242/best-winter-coats-men-budget-amazon-essentials-puffer-review-luxe-digital.jpg"}
];

let shoppingCart = [];

let orders = [];

app.use(cors());
app.use(express.json());

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.get("/api/shoppingCart", (req, res) => {
    res.json(shoppingCart);
});

app.post("/.{0,}\/api\/shoppingCart$/", (req, res) => {
    shoppingCart = req.body;
    res.json(shoppingCart);
})

app.get("/api/orders", (req, res) => {
    res.json(orders);
});

app.post("/api/orders", (req, res) => {
    orders = orders.concat(req.body);
    res.json(orders);
});

// Serve static assets if in production
if(process.env.NODE_ENV === "production") {
    //Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(port, () => {
    console.log("SERVER IS RUNNING");
})
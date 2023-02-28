// Require Dependencies
const express = require("express");
const cors = require("cors");
const config = require("./config.json");
const ordersController = require("./controllers/orders-controller");
const productsController = require("./controllers/products-controller");
const usersController = require("./controllers/users-controller");
const categoriesController = require("./controllers/categories-controller");
const cartsController = require("./controllers/carts-controller");
const itemsController = require("./controllers/items-controller");


const server = express();

server.use(cors());
server.use(express.json());

//Controllers
server.use("/api/orders", ordersController);
server.use("/api/products", productsController);
server.use("/api/users", usersController);
server.use("/api/categories", categoriesController);
server.use("/api/carts", cartsController);
server.use("/api/items", itemsController);

// Handle invalid route
server.use("*", (request, response) => {
  response.status(404).json({message: `Route not found ${request.originalUrl}`})
});


// Open Server on configurated Port
server.listen(config.PORT, () => console.info(`Server listening on port ${config.PORT}`))
    .on("error", (err)=>{
        err.code === "EADDRINUSE"
            ?console.info("Error: Adress in use")
            :console.info("Error: Unknown error")
    })

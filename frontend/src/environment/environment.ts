const PORT= 5000;

export const environment = {
    // production: false,
    ordersBaseUrl:`http://localhost:${PORT}/api/orders`,
    productsBaseUrl: `http://localhost:${PORT}/api/products`,
    usersBaseUrl: `http://localhost:${PORT}/api/users`,
    categoriesBaseUrl: `http://localhost:${PORT}/api/categories`,
    cartsBaseUrl: `http://localhost:${PORT}/api/carts`,
    itemsBaseUrl: `http://localhost:${PORT}/api/items`,
    cities: ["Tel-Aviv", "Jerusalem", "Haifa", "Eilat", "Beer-Sheva", "Roshon-LeTzion", "Petah-Tiqwa", "Ashdod", "Netanya", "Bnei-Brak"]
};

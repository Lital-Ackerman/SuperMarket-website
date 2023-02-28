//Different parameters that I use in the components and services


const PORT= 5000;

export const environment = {
    ordersBaseUrl:`http://localhost:${PORT}/api/orders`,
    productsBaseUrl: `http://localhost:${PORT}/api/products`,
    usersBaseUrl: `http://localhost:${PORT}/api/users`,
    categoriesBaseUrl: `http://localhost:${PORT}/api/categories`,
    cartsBaseUrl: `http://localhost:${PORT}/api/carts`,
    itemsBaseUrl: `http://localhost:${PORT}/api/items`,
    cities: ["Tel-Aviv", "Jerusalem", "Haifa", "Eilat", "Beer-Sheva", "Rishon-LeTzion", "Petah-Tiqwa", "Ashdod", "Netanya", "Bnei-Brak"],
    patterns:{
      email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
      userId: /^\d{9}$/,
      password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      creditAllTypes: /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/
    }
};

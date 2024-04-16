const totalItems = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
};

const addItem = (item, cb) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    cb();
  }
};

const updateCart = (itemIndex, quantity) => {
  console.log(itemIndex, quantity);
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart[itemIndex].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const getCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  return [];
};

const removeItem = (itemIndex) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.splice(itemIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

const emptyCart = (cb) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    cb();
  }
};

export { totalItems, addItem, updateCart, getCart, removeItem, emptyCart };

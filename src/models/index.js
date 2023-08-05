const Category = require("./Category");
const Product = require("./Product");
const Image = require("./Image");
const User = require("./User");
const Cart = require("./Cart");
const Purchase = require("./Purchase");

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Image);
Image.belongsTo(Product);

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

User.hasMany(Purchase);
Purchase.belongsTo(User);

Product.hasMany(Purchase);
Purchase.belongsTo(Product);

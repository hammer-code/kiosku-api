const Sequelize = require('sequelize');

const dbName = 'ganti_dengan_nama_databasemu';
const dbUser = 'ganti_dengan_user_databasemu';
const dbPassword = 'ganti_dengan_password_databasemu';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  operatorsAliases: false
});

const Product = sequelize.define('product', {
  name: Sequelize.STRING,
  price: Sequelize.INTEGER,
  description: Sequelize.TEXT,
}, {
  timestamps: false
})

const Cart = sequelize.define('cart', {
  code: Sequelize.STRING,
}, {
  tableName: 'carts',
  timestamps: false,
});

const CartItem = sequelize.define('cartItems', {
  cart_id: Sequelize.INTEGER,
  productId: Sequelize.INTEGER,
  qty: Sequelize.INTEGER,
}, {
  tableName: 'cart_items',
  timestamps: false
});

Cart.hasMany(CartItem, { foreignKey: 'cart_id' })

CartItem.belongsTo(Cart, { foreignKey: 'cart_id' })

CartItem.belongsTo(Product, { foreignKey: 'productId' })

Product.hasMany(CartItem)

module.exports = {
  Product,
  Cart,
  CartItem,
}

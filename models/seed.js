// Seed data
const users = [
  {name: 'Bruce Wayne', password: 'batman', email: 'batMail@gotham.com', isAdmin: true},
  {name: 'Harry Potter', password: 'wizard', email: 'LightningScar@hogwarts.com', isAdmin: false},
    {name: 'Testie Testerson', password: '123', email: 'test@test.com', isAdmin: false}
];
const products = [
  {name: 'utility Belt', price: 9999.99, image: 'https://vignette.wikia.nocookie.net/thedarkknighttrilogy/images/9/92/UtilityBelt.jpg/revision/latest?cb=20131210034132', weight: 5.10},
  {name: 'Invisibility Cloak', price: 95000.00, image: 'https://vignette.wikia.nocookie.net/harrypotter/images/6/67/Cloak_of_Invisibility_PM.png/revision/latest/scale-to-width-down/350?cb=20161124181645', weight: 0.00},
];
const categories = [
  {name: "Magical Item"},
  {name: "Crime Fighting Object"}
];

//Export
module.exports = (Product, Category, User) => {
  //We'll need to add the other models to the parameters
  //as we open this up
  let magicalItem, crimeFighting;
    return Promise.all(
      users.map((user) => User.create(user))
    )
  .then(([bruce, harry]) => {
    return Promise.all(
      categories.map((category) => Category.create(category))
    )})
  .then(([_magicalItem, _crimeFighting]) => {
    magicalItem=_magicalItem;
    crimeFighting=_crimeFighting;
    return Promise.all(
      products.map((product) => Product.create(product))
    )})
  .then(([belt, cloak]) => {
    return Promise.all([
      belt.setCategory(crimeFighting),
      cloak.setCategory(magicalItem)
    ])
  .then(() => console.log('DB is synced and seeded'));
  });
};

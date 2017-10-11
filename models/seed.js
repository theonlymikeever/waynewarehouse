// Seed data
const users = [
  {name: 'Bruce Wayne', password: 'batman', email: 'batMail@gotham.com', isAdmin: true},
  {name: 'Harry Potter', password: 'wizard', email: 'LightningScar@hogwarts.com', isAdmin: false},
    {name: 'Testie Testerson', password: '123', email: 'test@test.com', isAdmin: false}
];
const products = [
  {name: 'Utility Belt', price: 9999.99, image: 'https://vignette.wikia.nocookie.net/thedarkknighttrilogy/images/9/92/UtilityBelt.jpg/revision/latest?cb=20131210034132', weight: 5.10, description: 'Although seemingly unremarkable in appearance, the utility belt is one of Batman\'s most important tools in fighting crime. Consisting primarily of a strap and buckle, the utility belt houses ten pouches or cylindrical cartridges that are attached to the outside of the belt. The buckle itself typically contains a miniature camera and a tape recorder. A secondary compartment behind the length of the belt houses Batman\'s supply of batarangs.  Each of the ten pouches or cylinders contains various tools integral to Batman\'s war on crime, with the cylinders being interchangeable with each other. Through the years, Batman has modified the contents of his belt to accommodate various crime-fighting scenarios. Most versions of the belt contain security features to prevent anyone other than Batman from opening it. The belt is shown to be able to electrocute any villain who even touches it. It can also release stun gas to prevent tampering. The belt\'s compartments are locked and only Batman knows how to open them.'},
  {name: 'Invisibility Cloak', price: 95000.00, image: 'https://vignette.wikia.nocookie.net/harrypotter/images/6/67/Cloak_of_Invisibility_PM.png/revision/latest/scale-to-width-down/350?cb=20161124181645', weight: 0.00, description: 'The Cloak of Invisibility is a magical artefact used to render the wearer invisible, and one of the fabled Deathly Hallows. In "The Tale of the Three Brothers" it was the third and final Hallow created, bestowed to Ignotus Peverell, supposedly by Death himself (whom had the cloak in his possession at that time). The wizard requested, as his bounty, for something with the power to hide him if he were to go place to place without being followed by Death. According to legend, whoever united it with the other two Hallows, the Elder Wand and the Resurrection Stone, would become the Master of Death. It was the only known invisibility cloak that would not fade with age and would provide everlasting protection to the wearer, something no normal invisibility cloak could provide. As such, it was the only Hallow known to have been successfully passed down from generation to generation since Ignotus\' time. In 1991, it passed to the possession of Harry Potter who used it to great success in the Second Wizarding War and resolved to pass it down to his own children.'},
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

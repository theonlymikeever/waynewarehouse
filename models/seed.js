// Seed data
const users = [
  {name: 'Bruce Wayne', password: 'batman', email: 'batMail@gotham.com', isAdmin: true},
  {name: 'Harry Potter', password: 'wizard', email: 'LightningScar@hogwarts.com', isAdmin: false},
    {name: 'Testie Testerson', password: '123', email: 'test@test.com', isAdmin: false}
];
const products = [
  {name: 'Utility Belt', price: 9999.99, image: 'https://vignette.wikia.nocookie.net/thedarkknighttrilogy/images/9/92/UtilityBelt.jpg/revision/latest?cb=20131210034132', weight: 5.10, description: 'Although seemingly unremarkable in appearance, the utility belt is one of Batman\'s most important tools in fighting crime. Consisting primarily of a strap and buckle, the utility belt houses ten pouches or cylindrical cartridges that are attached to the outside of the belt. The buckle itself typically contains a miniature camera and a tape recorder. A secondary compartment behind the length of the belt houses Batman\'s supply of batarangs.  Each of the ten pouches or cylinders contains various tools integral to Batman\'s war on crime, with the cylinders being interchangeable with each other. Through the years, Batman has modified the contents of his belt to accommodate various crime-fighting scenarios. Most versions of the belt contain security features to prevent anyone other than Batman from opening it. The belt is shown to be able to electrocute any villain who even touches it. It can also release stun gas to prevent tampering. The belt\'s compartments are locked and only Batman knows how to open them.'},
  {name: 'Invisibility Cloak', price: 95000.00, image: 'https://vignette.wikia.nocookie.net/harrypotter/images/6/67/Cloak_of_Invisibility_PM.png/revision/latest/scale-to-width-down/350?cb=20161124181645', weight: 0.00, description: 'The Cloak of Invisibility is a magical artefact used to render the wearer invisible, and one of the fabled Deathly Hallows. In "The Tale of the Three Brothers" it was the third and final Hallow created, bestowed to Ignotus Peverell, supposedly by Death himself (whom had the cloak in his possession at that time). The wizard requested, as his bounty, for something with the power to hide him if he were to go place to place without being followed by Death. According to legend, whoever united it with the other two Hallows, the Elder Wand and the Resurrection Stone, would become the Master of Death. It was the only known invisibility cloak that would not fade with age and would provide everlasting protection to the wearer, something no normal invisibility cloak could provide. As such, it was the only Hallow known to have been successfully passed down from generation to generation since Ignotus\' time. In 1991, it passed to the possession of Harry Potter who used it to great success in the Second Wizarding War and resolved to pass it down to his own children.'},
  {name: 'Captain Jack\'s Compass', price: 21995.00, image: 'https://vignette.wikia.nocookie.net/pirates/images/7/70/AWEJackCompassFountainSearch.jpg/revision/latest?cb=20120104091713', weight: .75, description: 'Jack Sparrow\'s compass was an unusual navigational instrument most notably used by Captain Jack Sparrow, which he bartered from the voodoo mystic Tia Dalma and later inherited from his captain. The compass was the key to everything, for those who knew how to use it. Unlike an ordinary compass, Jack\'s compass proved most valuable, as it pointed to what the owner wanted most, rather than mere magnetic north.'},
  {name: 'Bag End', price: 255000.00, image: "https://lotro-wiki.com/images/6/6c/Bag_End_Inside_02.jpg", weight: 100000.00, description: 'Bag End is a point of interest within the area of the Hill in the Shire. [29.4S, 71.3W] Above the lane known as Bagshot Row in Hobbiton proper, and directly above the Party Tree, adventurers will find the former dwelling of Bilbo and Frodo Baggins, known as Bag End. An unassuming Hobbit hole, if slightly better appointed than most, Bag End is a series of rooms and corridors built into the Hill by Bungo Baggins, and entered through a simple, circular wooden door. However, it is not so much the dwelling itself that is of such great interest, but the tales and lore it holds.'},
  {name: 'Bane\'s Mask',  price: 44995.00, image: '../Images/BaneMask.jpg', weight: 2.35, description: 'Bane is known for the usage of the chemical drug venom for physical enhancement and other adaptations. A type of anesthetic relieves him of any pain and is directly administered into Bane\'s airways through his mask. *Venom NOT included. ' }
];
const categories = [
  {name: "Magical Item"},
  {name: "Crime Fighting Object"},
  {name: 'Pirate paraphernalia'}
];

const reviews = [
  { stars: 4, title: "Best on Amazon... for the money", content: "I love this mask ... It looks great as it is & fits well on my large head . Although it does kind of rub or touches the skin rough in certain places . I got soft foam tape & installed it around the inside spots & that made it fit even better . This mask does change your voice a bit also .. Not A Voice Changing Device ! But because of how it's built , it has a cool effect on your voice with the plastic built out from the mouth on the inside of the mask .... Great mask , I mean I wear a '7 3/4' fitted hat & it fits me great .. I loved Tom Hardy,s Bane & when I found this mask , I knew who I was gonna be for Halloween !!!!", userId: 3, productId: 5},
  { stars: 1, title: "Might not be worth it....", content: "In reviewing the sizing I thought this mask would fit. However I believe if the seller used the same sizing standards that are used for hats it would let prospective buyers get a better idea of how the mask fit. The rubber was not the best material and one side snapped as we tried to put the mask on my roommate. The look of the mask was designed nicely and that is why I'm giving it two stars. Not sure I'll purchase a mask from them again. For $50 it was a little over priced for it to break before we could wear it.", userId: 2, productId: 5},
  { stars: 5, title: "So Awesome !! Can't wait for Halloween & it is a collectors type mask ! It's Great !", content: "This mask is very cool. there is only one problem. the edges of the mask are very sharp, especially on the eye holes. not enough to cut you, but it hurts and leaves a mark. if you just take a razor blade and trim those spots, it is perfect. It is also very easy to impersonate his voice behind the mask. just talk with a thick British/Australian voice, and the mask will do the rest.", userId: 1, productId: 5},
]

//Export
module.exports = (Product, Category, User, Review) => {
  //We'll need to add the other models to the parameters
  //as we open this up
  let magicalItem, crimeFighting;
    return Promise.all(
      users.map((user) => User.create(user))
    )
  .then(() => {
    return Promise.all(
      categories.map((category) => Category.create(category))
    )})
  .then(([_magicalItem, _crimeFighting]) => {
    magicalItem = _magicalItem;
    crimeFighting = _crimeFighting;
    return Promise.all(
      products.map((product) => Product.create(product))
    )})
  .then(([belt, cloak]) => {
    return Promise.all([
      belt.setCategory(crimeFighting),
      cloak.setCategory(magicalItem)
    ])
  .then(() => {
    return Promise.all(
     reviews.map(review => Review.create(review)))
  })
  .then(() => console.log('DB is synced and seeded'));
  });
};

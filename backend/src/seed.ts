import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Shop from './models/Shop';
import Product from './models/Product';
dotenv.config();

// ── Images ─────────────────────────────────────

const burgerImgs = [
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
  'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400',
  'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400',
  'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400',
  'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400',
  'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400',
  'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400',
];

const chickenImgs = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
  'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400',
  'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
  'https://images.unsplash.com/photo-1562967914-608f82629710?w=400',
  'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400',
  'https://images.unsplash.com/photo-1562967914-608f82629710?w=400',
  'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400',
  'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400',
];

const pizzaImgs = [
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
  'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400',
  'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400',
  'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400',
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
  'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=400',
  'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=400',
];

const sushiImgs = [
  'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
  'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400',
  'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400',
  'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=400',
  'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=400',
  'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400',
  'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=400',
  'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400',
];

const friesImgs = [
  'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400',
  'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400',
  'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
];

// Drinks
const drinkCola         = 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400';
const drinkLemonade     = 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400';
const drinkMilkshake    = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400';
const drinkCoffee       = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400';
const drinkGreenTea     = 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400';
const drinkOrangeJuice  = 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400';
const drinkIcedTea      = 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400';
const drinkWater        = 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400';

// Desserts
const dessertIceCream   = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400';
const dessertBrownie    = 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400';
const dessertApplePie   = 'https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=400';
const dessertTiramisu   = 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400';
const dessertPannaCotta = 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400';
const dessertCheesecake = 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400';
const dessertCake       = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400';
const dessertWaffles    = 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400';
const dessertMochi      = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400';
const dessertDonut      = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400';

// Sides
const sideColeslaw      = 'https://images.unsplash.com/photo-1537784969314-05a37106f68e?w=400';
const sideCorn          = 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400';
const sideEdamame       = 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400';
const sideGyoza         = 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400';
const sideSeaweed       = 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=400';
const sideGarlicBread   = 'https://images.unsplash.com/photo-1537784969314-05a37106f68e?w=400';
const sideNachos        = 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400';
const sideSpringRolls   = 'https://images.unsplash.com/photo-1548340748-6d2b7d7da280?w=400';

// Salads
const saladCaesar       = 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400';
const saladGreek        = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400';
const saladVeggie       = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400';

// Pasta
const pastaCarbo        = 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400';
const pastaPenne        = 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400';
const pastaFettuccine   = 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400';
const pastaLasagne      = 'https://images.unsplash.com/photo-1619895092538-128341789043?w=400';

// Ramen & Soup
const ramenTonkotsu     = 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400';
const ramenMiso         = 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400';
const ramenShoyu        = 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400';
const soupMiso          = 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400';

// ── Seed ──────────────────────────────────────────────────────────────────────

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || '');
  await Shop.deleteMany({});
  await Product.deleteMany({});

  const shops = await Shop.insertMany([
    { name: 'Mc Drive',   description: 'Classic American burgers',   imageUrl: burgerImgs[0],  category: 'Fast Food', rating: 4.7 },
    { name: 'CFK Fried',  description: 'Crispy fried chicken',    imageUrl: chickenImgs[0], category: 'Fast Food', rating: 4.2 },
    { name: 'Pizza Palace',  description: 'Authentic Italian pizza', imageUrl: pizzaImgs[1],   category: 'Pizza',     rating: 3.8 },
    { name: 'Sushi Wave',   description: 'Fresh Japanese sushi',     imageUrl: sushiImgs[0],   category: 'Japanese',  rating: 2.9 },
    { name: 'Burger Bros',  description: 'Craft smash burgers',      imageUrl: burgerImgs[4],  category: 'Burgers',   rating: 4.5 },
  ]);

  const [mc, cfk, pz, sw, bb] = shops.map(s => s._id);

  const products = [

    // ── Mc Donny's ─────────────────────────────────────────────────────────────
    { shopId: mc, name: 'Big Mac',             description: 'Two beef patties, special sauce, lettuce, cheese',      price: 149, imageUrl: burgerImgs[0], category: 'Burgers'  },
    { shopId: mc, name: 'Quarter Pounder',     description: 'Quarter pound beef patty with cheese',                  price: 159, imageUrl: burgerImgs[1], category: 'Burgers'  },
    { shopId: mc, name: 'Double Cheese',       description: 'Two beef patties with melted cheese',                   price: 129, imageUrl: burgerImgs[2], category: 'Burgers'  },
    { shopId: mc, name: 'McChicken',           description: 'Crispy chicken patty with mayo and lettuce',            price: 119, imageUrl: burgerImgs[3], category: 'Burgers'  },
    { shopId: mc, name: 'Filet-O-Fish',        description: 'Fish filet with tartar sauce and cheese',               price: 109, imageUrl: burgerImgs[4], category: 'Burgers'  },
    { shopId: mc, name: 'BBQ Burger',          description: 'Beef patty with BBQ sauce and crispy onions',           price: 169, imageUrl: burgerImgs[5], category: 'Burgers'  },
    { shopId: mc, name: 'Spicy McDeluxe',      description: 'Spicy chicken with pepper jack cheese',                 price: 139, imageUrl: burgerImgs[6], category: 'Burgers'  },
    { shopId: mc, name: 'Triple Burger',       description: 'Three beef patties loaded with cheese',                 price: 189, imageUrl: burgerImgs[7], category: 'Burgers'  },
    { shopId: mc, name: 'Large Fries',         description: 'Golden crispy french fries',                            price: 59,  imageUrl: friesImgs[0],  category: 'Sides'    },
    { shopId: mc, name: 'Medium Fries',        description: 'Crispy golden fries',                                   price: 45,  imageUrl: friesImgs[1],  category: 'Sides'    },
    { shopId: mc, name: 'Onion Rings',         description: 'Battered and deep-fried onion rings',                   price: 55,  imageUrl: friesImgs[2],  category: 'Sides'    },
    { shopId: mc, name: 'Nuggets x6',          description: '6 crispy chicken nuggets',                              price: 79,  imageUrl: chickenImgs[2], category: 'Sides'   },
    { shopId: mc, name: 'Nuggets x12',         description: '12 crispy chicken nuggets',                             price: 139, imageUrl: chickenImgs[3], category: 'Sides'   },
    { shopId: mc, name: 'Nuggets x20',         description: '20 crispy chicken nuggets, sharing box',                price: 219, imageUrl: chickenImgs[4], category: 'Sides'   },
    { shopId: mc, name: 'McFlurry Oreo',       description: 'Soft serve with crushed Oreo cookies',                  price: 79,  imageUrl: dessertIceCream, category: 'Desserts' },
    { shopId: mc, name: 'McFlurry Caramel',    description: 'Soft serve with caramel drizzle',                       price: 79,  imageUrl: dessertIceCream, category: 'Desserts' },
    { shopId: mc, name: 'Apple Pie',           description: 'Warm apple pie with cinnamon',                          price: 49,  imageUrl: dessertApplePie, category: 'Desserts' },
    { shopId: mc, name: 'Donut',               description: 'Classic glazed donut',                                  price: 39,  imageUrl: dessertDonut,   category: 'Desserts' },
    { shopId: mc, name: 'Coca Cola',           description: 'Refreshing cola drink',                                 price: 45,  imageUrl: drinkCola,      category: 'Drinks'   },
    { shopId: mc, name: 'Sprite',              description: 'Lemon-lime soda',                                       price: 45,  imageUrl: drinkLemonade,  category: 'Drinks'   },
    { shopId: mc, name: 'Orange Juice',        description: 'Fresh pressed orange juice',                            price: 55,  imageUrl: drinkOrangeJuice, category: 'Drinks' },
    { shopId: mc, name: 'Vanilla Milkshake',   description: 'Thick and creamy vanilla shake',                        price: 89,  imageUrl: drinkMilkshake, category: 'Drinks'   },
    { shopId: mc, name: 'Coffee',              description: 'Classic hot Americano',                                 price: 55,  imageUrl: drinkCoffee,    category: 'Drinks'   },
    { shopId: mc, name: 'Donut',               description: 'Classic glazed donut',                                  price: 39,  imageUrl: dessertDonut,   category: 'Desserts' },
    { shopId: mc, name: 'Coca Cola',           description: 'Refreshing cola drink',                                 price: 45,  imageUrl: drinkCola,      category: 'Drinks'   },
    { shopId: mc, name: 'Sprite',              description: 'Lemon-lime soda',                                       price: 45,  imageUrl: drinkLemonade,  category: 'Drinks'   },
    { shopId: mc, name: 'Donut',               description: 'Classic glazed donut',                                  price: 39,  imageUrl: dessertDonut,   category: 'Desserts' },
    { shopId: mc, name: 'Coca Cola',           description: 'Refreshing cola drink',                                 price: 45,  imageUrl: drinkCola,      category: 'Drinks'   },
    { shopId: mc, name: 'Sprite',              description: 'Lemon-lime soda',                                       price: 45,  imageUrl: drinkLemonade,  category: 'Drinks'   },
    { shopId: mc, name: 'Spicy McDeluxe',      description: 'Spicy chicken with pepper jack cheese',                 price: 139, imageUrl: burgerImgs[6], category: 'Burgers'  },
    { shopId: mc, name: 'Triple Burger',       description: 'Three beef patties loaded with cheese',                 price: 189, imageUrl: burgerImgs[7], category: 'Burgers'  },
    { shopId: mc, name: 'Large Fries',         description: 'Golden crispy french fries',                            price: 59,  imageUrl: friesImgs[0],  category: 'Sides'    },
    { shopId: mc, name: 'Medium Fries',        description: 'Crispy golden fries',                                   price: 45,  imageUrl: friesImgs[1],  category: 'Sides'    },
    { shopId: mc, name: 'Onion Rings',         description: 'Battered and deep-fried onion rings',                   price: 55,  imageUrl: friesImgs[2],  category: 'Sides'    },
   

    // ── CFK Kitchen ────────────────────────────────────────────────────────────
    { shopId: cfk, name: 'Original Box x3',   description: '3 pieces of crispy fried chicken',                      price: 199, imageUrl: chickenImgs[0], category: 'Chicken'  },
    { shopId: cfk, name: 'Original Box x6',   description: '6 pieces of crispy fried chicken, family size',         price: 349, imageUrl: chickenImgs[1], category: 'Chicken'  },
    { shopId: cfk, name: 'Spicy Wings x6',    description: '6 spicy crispy wings',                                  price: 159, imageUrl: chickenImgs[2], category: 'Chicken'  },
    { shopId: cfk, name: 'Spicy Wings x12',   description: '12 spicy crispy wings, party bucket',                   price: 289, imageUrl: chickenImgs[7], category: 'Chicken'  },
    { shopId: cfk, name: 'Crispy Strips x4',  description: '4 crispy chicken strips',                               price: 149, imageUrl: chickenImgs[3], category: 'Chicken'  },
    { shopId: cfk, name: 'Chicken Sandwich',  description: 'Crispy chicken in a brioche bun',                       price: 129, imageUrl: chickenImgs[6], category: 'Chicken'  },
    { shopId: cfk, name: 'Popcorn Chicken',   description: 'Bite-sized crispy chicken pieces',                      price: 99,  imageUrl: chickenImgs[4], category: 'Chicken'  },
    { shopId: cfk, name: 'Zinger Burger',     description: 'Spicy chicken burger with hot sauce',                   price: 139, imageUrl: chickenImgs[5], category: 'Chicken'  },
    { shopId: cfk, name: 'Grilled Chicken',   description: 'Herb-marinated grilled breast',                         price: 149, imageUrl: chickenImgs[5], category: 'Chicken'  },
    { shopId: cfk, name: 'Honey Glazed',      description: 'Sweet honey glazed chicken thighs',                     price: 159, imageUrl: chickenImgs[0], category: 'Chicken'  },
    { shopId: cfk, name: 'Nashville Hot',     description: 'Extra hot Nashville-style chicken strips',              price: 169, imageUrl: chickenImgs[2], category: 'Chicken'  },
    { shopId: cfk, name: 'Coleslaw',          description: 'Creamy cabbage slaw',                                   price: 49,  imageUrl: sideColeslaw,   category: 'Sides'    },
    { shopId: cfk, name: 'Mashed Potato',     description: 'Creamy mashed potatoes with gravy',                     price: 59,  imageUrl: friesImgs[0],   category: 'Sides'    },
    { shopId: cfk, name: 'Corn on the Cob',   description: 'Butter corn on the cob',                                price: 45,  imageUrl: sideCorn,       category: 'Sides'    },
    { shopId: cfk, name: 'Fries',             description: 'Crispy salted fries',                                   price: 55,  imageUrl: friesImgs[1],   category: 'Sides'    },
    { shopId: cfk, name: 'Nachos',            description: 'Tortilla chips with cheese dip',                        price: 79,  imageUrl: sideNachos,     category: 'Sides'    },
    { shopId: cfk, name: 'Cheesecake',        description: 'Creamy New York cheesecake',                            price: 89,  imageUrl: dessertCheesecake, category: 'Desserts' },
    { shopId: cfk, name: 'Brownie',           description: 'Rich chocolate brownie',                                price: 69,  imageUrl: dessertBrownie,  category: 'Desserts' },
    { shopId: cfk, name: 'Apple Pie',         description: 'Warm crispy apple pie',                                 price: 59,  imageUrl: dessertApplePie, category: 'Desserts' },
    { shopId: cfk, name: 'Waffles',           description: 'Belgian waffles with maple syrup',                      price: 99,  imageUrl: dessertWaffles,  category: 'Desserts' },
    { shopId: cfk, name: 'Lemonade',          description: 'Fresh squeezed lemonade',                               price: 69,  imageUrl: drinkLemonade,  category: 'Drinks'   },
    { shopId: cfk, name: 'Iced Tea',          description: 'Refreshing iced tea',                                   price: 59,  imageUrl: drinkIcedTea,   category: 'Drinks'   },
    { shopId: cfk, name: 'Pepsi',             description: 'Classic cola drink',                                    price: 45,  imageUrl: drinkCola,      category: 'Drinks'   },
    { shopId: cfk, name: 'Orange Juice',      description: 'Fresh squeezed orange juice',                           price: 65,  imageUrl: drinkOrangeJuice, category: 'Drinks' },
    { shopId: cfk, name: 'Milkshake',         description: 'Rich creamy chocolate shake',                           price: 89,  imageUrl: drinkMilkshake, category: 'Drinks'   },

    // ── Pizza Palace ───────────────────────────────────────────────────────────
    { shopId: pz, name: 'Margherita',         description: 'Tomato, mozzarella, fresh basil',                       price: 229, imageUrl: pizzaImgs[0],   category: 'Pizza'    },
    { shopId: pz, name: 'Pepperoni',          description: 'Classic pepperoni with mozzarella',                     price: 259, imageUrl: pizzaImgs[1],   category: 'Pizza'    },
    { shopId: pz, name: 'BBQ Chicken',        description: 'BBQ sauce, chicken, red onions',                        price: 279, imageUrl: pizzaImgs[2],   category: 'Pizza'    },
    { shopId: pz, name: '4 Cheese',           description: 'Mozzarella, parmesan, gorgonzola, ricotta',             price: 289, imageUrl: pizzaImgs[3],   category: 'Pizza'    },
    { shopId: pz, name: 'Veggie Pizza',       description: 'Fresh vegetables on tomato sauce',                      price: 249, imageUrl: pizzaImgs[4],   category: 'Pizza'    },
    { shopId: pz, name: 'Diavola',            description: 'Spicy salami and chili peppers',                        price: 269, imageUrl: pizzaImgs[5],   category: 'Pizza'    },
    { shopId: pz, name: 'Hawaiian',           description: 'Ham and pineapple on tomato base',                      price: 259, imageUrl: pizzaImgs[6],   category: 'Pizza'    },
    { shopId: pz, name: 'Meat Lovers',        description: 'Pepperoni, sausage, bacon, ham',                        price: 299, imageUrl: pizzaImgs[7],   category: 'Pizza'    },
    { shopId: pz, name: 'Truffle Mushroom',   description: 'Truffle oil, wild mushrooms, mozzarella',               price: 319, imageUrl: pizzaImgs[0],   category: 'Pizza'    },
    { shopId: pz, name: 'Prosciutto e Rucola',description: 'Prosciutto, rocket, parmesan, cherry tomatoes',         price: 279, imageUrl: pizzaImgs[1],   category: 'Pizza'    },
    { shopId: pz, name: 'Spaghetti Carbonara',description: 'Egg, guanciale, pecorino, black pepper',                price: 179, imageUrl: pastaCarbo,     category: 'Pasta'    },
    { shopId: pz, name: 'Penne Arrabbiata',   description: 'Spicy tomato sauce, garlic, chili',                     price: 159, imageUrl: pastaPenne,     category: 'Pasta'    },
    { shopId: pz, name: 'Fettuccine Alfredo', description: 'Rich cream sauce, parmesan, butter',                    price: 169, imageUrl: pastaFettuccine, category: 'Pasta'   },
    { shopId: pz, name: 'Lasagne',            description: 'Layers of beef ragù, béchamel, pasta',                  price: 199, imageUrl: pastaLasagne,   category: 'Pasta'    },
    { shopId: pz, name: 'Caesar Salad',       description: 'Romaine, croutons, parmesan, Caesar dressing',          price: 119, imageUrl: saladCaesar,    category: 'Salads'   },
    { shopId: pz, name: 'Greek Salad',        description: 'Feta, olives, cucumber, tomatoes',                      price: 109, imageUrl: saladGreek,     category: 'Salads'   },
    { shopId: pz, name: 'Caprese',            description: 'Buffalo mozzarella, tomato, basil, olive oil',          price: 129, imageUrl: saladVeggie,    category: 'Salads'   },
    { shopId: pz, name: 'Garlic Bread',       description: 'Crusty bread with garlic butter',                       price: 69,  imageUrl: sideGarlicBread, category: 'Sides'   },
    { shopId: pz, name: 'Cheesy Bread',       description: 'Bread with melted mozzarella and herbs',                price: 79,  imageUrl: sideGarlicBread, category: 'Sides'   },
    { shopId: pz, name: 'Tiramisu',           description: 'Classic Italian coffee dessert',                        price: 99,  imageUrl: dessertTiramisu, category: 'Desserts' },
    { shopId: pz, name: 'Panna Cotta',        description: 'Italian cream dessert with berry sauce',                price: 89,  imageUrl: dessertPannaCotta, category: 'Desserts' },
    { shopId: pz, name: 'Gelato',             description: 'Artisan Italian ice cream',                             price: 69,  imageUrl: dessertIceCream, category: 'Desserts' },
    { shopId: pz, name: 'Chocolate Cake',     description: 'Dense rich Italian chocolate cake',                     price: 99,  imageUrl: dessertCake,    category: 'Desserts' },
    { shopId: pz, name: 'Sparkling Water',    description: 'San Pellegrino sparkling water',                        price: 45,  imageUrl: drinkWater,     category: 'Drinks'   },
    { shopId: pz, name: 'Espresso',           description: 'Strong Italian double espresso',                        price: 49,  imageUrl: drinkCoffee,    category: 'Drinks'   },
    { shopId: pz, name: 'Cappuccino',         description: 'Espresso with steamed milk foam',                       price: 59,  imageUrl: drinkCoffee,    category: 'Drinks'   },
    { shopId: pz, name: 'Italian Soda',       description: 'Fruit flavored soda',                                   price: 55,  imageUrl: drinkLemonade,  category: 'Drinks'   },

    // ── Sushi Wave ─────────────────────────────────────────────────────────────
    { shopId: sw, name: 'Philadelphia Roll',  description: 'Salmon, cream cheese, cucumber',                        price: 189, imageUrl: sushiImgs[0],   category: 'Rolls'    },
    { shopId: sw, name: 'Dragon Roll',        description: 'Eel, cucumber, avocado on top',                         price: 219, imageUrl: sushiImgs[1],   category: 'Rolls'    },
    { shopId: sw, name: 'Rainbow Roll',       description: 'Various fish on California roll',                       price: 239, imageUrl: sushiImgs[2],   category: 'Rolls'    },
    { shopId: sw, name: 'Spicy Tuna Roll',    description: 'Spicy tuna with sriracha mayo',                         price: 199, imageUrl: sushiImgs[3],   category: 'Rolls'    },
    { shopId: sw, name: 'California Roll',    description: 'Imitation crab, avocado, cucumber',                     price: 169, imageUrl: sushiImgs[4],   category: 'Rolls'    },
    { shopId: sw, name: 'Cucumber Roll',      description: 'Fresh cucumber, sesame seeds',                          price: 99,  imageUrl: sushiImgs[5],   category: 'Rolls'    },
    { shopId: sw, name: 'Avocado Roll',       description: 'Creamy fresh avocado roll',                             price: 109, imageUrl: sushiImgs[6],   category: 'Rolls'    },
    { shopId: sw, name: 'Tiger Roll',         description: 'Shrimp tempura, avocado, spicy mayo',                   price: 229, imageUrl: sushiImgs[7],   category: 'Rolls'    },
    { shopId: sw, name: 'Volcano Roll',       description: 'Baked scallop on top with spicy sauce',                 price: 249, imageUrl: sushiImgs[0],   category: 'Rolls'    },
    { shopId: sw, name: 'Caterpillar Roll',   description: 'Eel, cucumber, avocado wrapped outside',                price: 229, imageUrl: sushiImgs[1],   category: 'Rolls'    },
    { shopId: sw, name: 'Salmon Nigiri x4',   description: '4 pieces of fresh salmon nigiri',                       price: 149, imageUrl: sushiImgs[6],   category: 'Nigiri'   },
    { shopId: sw, name: 'Tuna Nigiri x4',     description: '4 pieces of premium tuna nigiri',                       price: 159, imageUrl: sushiImgs[7],   category: 'Nigiri'   },
    { shopId: sw, name: 'Shrimp Nigiri x4',   description: '4 pieces of sweet shrimp nigiri',                       price: 139, imageUrl: sushiImgs[5],   category: 'Nigiri'   },
    { shopId: sw, name: 'Eel Nigiri x4',      description: '4 pieces of glazed eel nigiri',                         price: 169, imageUrl: sushiImgs[4],   category: 'Nigiri'   },
    { shopId: sw, name: 'Sashimi Mix x8',     description: '8 assorted slices of premium fish',                     price: 229, imageUrl: sushiImgs[2],   category: 'Nigiri'   },
    { shopId: sw, name: 'Tonkotsu Ramen',     description: 'Rich pork broth, chashu pork, soft egg',                price: 189, imageUrl: ramenTonkotsu,  category: 'Ramen'    },
    { shopId: sw, name: 'Spicy Miso Ramen',   description: 'Miso broth with chili, corn, bamboo',                   price: 179, imageUrl: ramenMiso,      category: 'Ramen'    },
    { shopId: sw, name: 'Shoyu Ramen',        description: 'Soy sauce broth, chicken, nori',                        price: 169, imageUrl: ramenShoyu,     category: 'Ramen'    },
    { shopId: sw, name: 'Miso Soup',          description: 'Traditional miso with tofu and wakame',                 price: 59,  imageUrl: soupMiso,       category: 'Soups'    },
    { shopId: sw, name: 'Edamame',            description: 'Steamed salted soybeans',                               price: 49,  imageUrl: sideEdamame,    category: 'Sides'    },
    { shopId: sw, name: 'Gyoza x6',           description: '6 pan-fried pork dumplings',                            price: 99,  imageUrl: sideGyoza,      category: 'Sides'    },
    { shopId: sw, name: 'Seaweed Salad',      description: 'Wakame seaweed with sesame dressing',                   price: 69,  imageUrl: sideSeaweed,    category: 'Sides'    },
    { shopId: sw, name: 'Spring Rolls x4',    description: '4 crispy vegetable spring rolls',                       price: 89,  imageUrl: sideSpringRolls, category: 'Sides'   },
    { shopId: sw, name: 'Mochi Ice Cream x3', description: '3 pieces of mochi with ice cream',                      price: 89,  imageUrl: dessertMochi,   category: 'Desserts' },
    { shopId: sw, name: 'Dorayaki',           description: 'Japanese pancake with red bean paste',                  price: 69,  imageUrl: dessertDonut,   category: 'Desserts' },
    { shopId: sw, name: 'Green Tea',          description: 'Traditional Japanese matcha green tea',                  price: 55,  imageUrl: drinkGreenTea,  category: 'Drinks'   },
    { shopId: sw, name: 'Matcha Latte',       description: 'Creamy matcha latte with oat milk',                     price: 85,  imageUrl: drinkGreenTea,  category: 'Drinks'   },
    { shopId: sw, name: 'Ramune Soda',        description: 'Japanese marble bottle soda',                           price: 65,  imageUrl: drinkLemonade,  category: 'Drinks'   },
    { shopId: sw, name: 'Mango Tea',          description: 'Sweet mango iced tea',                                  price: 75,  imageUrl: drinkIcedTea,   category: 'Drinks'   },
    { shopId: sw, name: 'Sake',               description: 'Traditional Japanese rice wine, 100ml',                 price: 99,  imageUrl: drinkWater,     category: 'Drinks'   },

    // ── Burger Bros ────────────────────────────────────────────────────────────
    { shopId: bb, name: 'Smash Classic',      description: 'Double smashed patty, American cheese, pickles',        price: 179, imageUrl: burgerImgs[0],  category: 'Burgers'  },
    { shopId: bb, name: 'Double Smash',       description: 'Two smashed patties, house sauce, caramelized onion',   price: 219, imageUrl: burgerImgs[1],  category: 'Burgers'  },
    { shopId: bb, name: 'Mushroom Swiss',     description: 'Beef patty, sautéed mushrooms, Swiss cheese',           price: 199, imageUrl: burgerImgs[2],  category: 'Burgers'  },
    { shopId: bb, name: 'Bacon Smash',        description: 'Beef patty with thick-cut crispy bacon',                price: 209, imageUrl: burgerImgs[3],  category: 'Burgers'  },
    { shopId: bb, name: 'BBQ Smash',          description: 'House BBQ sauce, smoked bacon, onion rings',            price: 219, imageUrl: burgerImgs[4],  category: 'Burgers'  },
    { shopId: bb, name: 'Truffle Smash',      description: 'Truffle aioli, wild mushrooms, brie',                   price: 239, imageUrl: burgerImgs[5],  category: 'Burgers'  },
    { shopId: bb, name: 'Spicy Jalapeno',     description: 'Fresh jalapeños, pepper jack cheese, chipotle mayo',    price: 199, imageUrl: burgerImgs[6],  category: 'Burgers'  },
    { shopId: bb, name: 'Green Goddess',      description: 'Avocado, green goddess sauce, sprouts',                 price: 209, imageUrl: burgerImgs[7],  category: 'Burgers'  },
    { shopId: bb, name: 'Black & Blue',       description: 'Blackened seasoning, blue cheese crumbles',             price: 229, imageUrl: burgerImgs[0],  category: 'Burgers'  },
    { shopId: bb, name: 'Crispy Chicken',     description: 'Crispy fried chicken patty, pickles, hot sauce',        price: 199, imageUrl: chickenImgs[6], category: 'Burgers'  },
    { shopId: bb, name: 'Truffle Fries',      description: 'Fries with truffle oil and parmesan',                   price: 89,  imageUrl: friesImgs[0],   category: 'Sides'    },
    { shopId: bb, name: 'Sweet Potato Fries', description: 'Crispy sweet potato fries with aioli',                  price: 79,  imageUrl: friesImgs[1],   category: 'Sides'    },
    { shopId: bb, name: 'Onion Rings',        description: 'Beer-battered crispy onion rings',                      price: 65,  imageUrl: friesImgs[2],   category: 'Sides'    },
    { shopId: bb, name: 'Loaded Fries',       description: 'Cheese sauce, bacon bits, jalapeños',                   price: 99,  imageUrl: friesImgs[0],   category: 'Sides'    },
    { shopId: bb, name: 'Coleslaw',           description: 'House-made creamy coleslaw',                            price: 45,  imageUrl: sideColeslaw,   category: 'Sides'    },
    { shopId: bb, name: 'Mac & Cheese',       description: 'Creamy four-cheese mac and cheese',                     price: 79,  imageUrl: friesImgs[1],   category: 'Sides'    },
    { shopId: bb, name: 'Brownie Sundae',     description: 'Warm brownie with vanilla ice cream',                   price: 119, imageUrl: dessertBrownie, category: 'Desserts' },
    { shopId: bb, name: 'Cheesecake Slice',   description: 'Classic New York baked cheesecake',                     price: 99,  imageUrl: dessertCheesecake, category: 'Desserts' },
    { shopId: bb, name: 'Waffles',            description: 'Crispy waffles with chocolate sauce',                   price: 89,  imageUrl: dessertWaffles, category: 'Desserts' },
    { shopId: bb, name: 'Craft Cola',         description: 'Artisan cola with vanilla and spices',                  price: 55,  imageUrl: drinkCola,      category: 'Drinks'   },
    { shopId: bb, name: 'Craft Lemonade',     description: 'Fresh squeezed lemonade with mint',                     price: 65,  imageUrl: drinkLemonade,  category: 'Drinks'   },
    { shopId: bb, name: 'Vanilla Milkshake',  description: 'Hand-spun vanilla bean milkshake',                      price: 99,  imageUrl: drinkMilkshake, category: 'Drinks'   },
    { shopId: bb, name: 'Choco Milkshake',    description: 'Hand-spun dark chocolate milkshake',                    price: 99,  imageUrl: drinkMilkshake, category: 'Drinks'   },
    { shopId: bb, name: 'Salted Caramel',     description: 'Caramel, sea salt, toffee milkshake',                   price: 109, imageUrl: drinkMilkshake, category: 'Drinks'   },
    { shopId: bb, name: 'Strawberry Shake',   description: 'Fresh strawberry milkshake',                            price: 99,  imageUrl: drinkMilkshake, category: 'Drinks'   },
    { shopId: bb, name: 'Iced Coffee',        description: 'Cold brew with oat milk',                               price: 75,  imageUrl: drinkCoffee,    category: 'Drinks'   },
  ];

  await Product.insertMany(products);

  console.log(`✅ Seeded: 5 shops, ${products.length} products`);
  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });
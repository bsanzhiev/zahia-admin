import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Pizza',
  'Hamburger',
  'Fries',
  'Fried Chicken',
  'Khuushur',
  'Coca-Cola',
  'Pepsi',
  'Tea',
  'Hot-Dog',
  'Shaurma',
];

const PRODUCT_DESCRIPTION = [
  'Pizza Pizza Pizza Pizza Pizza Pizza Pizza',
  'Hamburger Hamburger Hamburger Hamburger Hamburger Hamburger',
  'Fries Fries Fries Fries Fries Fries Fries Fries Fries Fries',
  'Fried Chicken Fried Chicken Fried Chicken Fried Chicken',
  'Khuushur Khuushur Khuushur Khuushur Khuushur Khuushur',
  'Coca-Cola Coca-Cola Coca-Cola Coca-Cola Coca-Cola Coca-Cola',
  'Pepsi Pepsi Pepsi Pepsi Pepsi Pepsi Pepsi Pepsi Pepsi Pepsi',
  'Tea Tea Tea Tea Tea Tea Tea Tea Tea Tea Tea Tea Tea Tea Tea',
  'Hot-Dog Hot-Dog Hot-Dog Hot-Dog Hot-Dog Hot-Dog Hot-Dog Hot-Dog',
  'Shaurma Shaurma Shaurma Shaurma Shaurma Shaurma Shaurma Shaurma Shaurma',
]

// ----------------------------------------------------------------------

const products = [...Array(10)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.string.uuid(),
    cover: `/assets/images/product_13.jpg`,
    name: PRODUCT_NAME[index],
    description: PRODUCT_DESCRIPTION[index],
    price: faker.number.int({ min: 3, max: 25}),
    priceSale: setIndex % 3 ? null : faker.number.float({ min: 19, max: 29, precision: 0.01 }),
    status: sample(['sale', 'new', '', '']),
    create_at: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: '2023-12-31T00:00:00.000Z' }),
    stock: sample(['In stock', 'Low stock', 'Out of stock',]),
    quantity: faker.number.int(100),
    publish: sample(['published', 'draft',]),
  };
});

export default products;

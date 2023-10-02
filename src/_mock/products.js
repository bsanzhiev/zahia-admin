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
  'Hot-dog',
  'Shaurma',
];

// ----------------------------------------------------------------------

const products = [...Array(10)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `/assets/images/product_13.jpg`,
    name: PRODUCT_NAME[index],
    price: faker.number.float({ min: 5, max: 99, precision: 0.01 }),
    priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
    status: sample(['sale', 'new', '', '']),
    create_at: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: '2023-12-31T00:00:00.000Z' }),
    stock: sample(['In stock', 'Low stock', 'Out of stock',]),
    quantity: faker.number.int(100),
    publish: sample(['published', 'draft',]),
  };
});

export default products;

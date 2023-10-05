import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
	"Pizza",
	"Hamburger",
	"Fries",
	"Fried Chicken",
	"Khuushur",
	"Coca-Cola",
	"Pepsi",
	"Tea",
	"Hot-Dog",
	"Shaurma",
];

// ----------------------------------------------------------------------

const products = [...Array(10)].map((_, index) => {
	const setIndex = index + 1;

	return {
		id: faker.string.uuid(),
		cover: `/assets/images/product_13.jpg`,
		name: PRODUCT_NAME[index],
		description: faker.lorem.lines(2),
		price: faker.number.int({ min: 3, max: 25 }),
		priceSale:
			setIndex % 3
				? null
				: faker.number.float({ min: 19, max: 29, precision: 0.01 }),
		status: sample(["sale", "new", "", ""]),
		create_at: faker.date.between({
			from: "2023-01-01T00:00:00.000Z",
			to: "2023-12-31T00:00:00.000Z",
		}),
		stock: sample(["In stock", "Low stock", "Out of stock"]),
		quantity: faker.number.int(100),
		publish: sample(["published", "draft"]),
	};
});

export default products;

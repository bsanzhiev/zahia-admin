import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// interface OrderItems {
// 	id: string;
// 	code: string;
// 	date: Date;
// 	items: number;
// 	price: number;
// 	status: string;
// }

const orders = [...Array(10)].map((_, index) => ({
	id: faker.string.uuid(),
	code: faker.string.numeric(5),
	date: faker.date.between({
		from: "2023-01-01T00:00:00.000Z",
		to: "2023-12-31T00:00:00.000Z",
	}),
	items: faker.number.int(10),
	price: faker.number.int({ min: 3, max: 25 }),
	status: sample(["pendinng", "cancelled", "completed", "refunded"]),
}));

export default orders;

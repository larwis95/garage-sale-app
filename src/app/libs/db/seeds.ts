import { User, Sale, Item } from "@/app/models";
import db from "@/app/libs/db/connection";

const users = [
  {
    username: "admin",
    email: "admin@admin.com",
    password: "admin",
    type: "admin",
  },
  {
    username: "user",
    email: "user@user.com",
    password: "user",
  },
];

const sales = [
  {
    title: "Sale 1",
    description: "Sale 1 Description",
    startDate: new Date(),
    endDate: new Date(),
    location: "644 E Huron River Dr, Belleville, MI 48111",
  },
  {
    title: "Sale 2",
    description: "Sale 2 Description",
    startDate: new Date(),
    endDate: new Date(),
    location: "333 Industrial Park Dr, Belleville, MI 48111",
  },
  {
    title: "Sale 3",
    description: "Sale 3 Description",
    startDate: new Date(),
    endDate: new Date(),
    location: "60 Main St, Belleville, MI 48111",
  },
];

const items = [
  {
    name: "Item 1",
    category: "Item 1 Category",
    description: "Item 1 Description",
    condition: 1,
    price: 1.0,
    quantity: 1,
    discount: 1,
    picture: "item1.jpg",
  },
  {
    name: "Item 2",
    category: "Item 2 Category",
    description: "Item 2 Description",
    condition: 2,
    price: 2.0,
    quantity: 2,
    discount: 2,
    picture: "item2.jpg",
  },
  {
    name: "Item 3",
    category: "Item 3 Category",
    description: "Item 3 Description",
    condition: 3,
    price: 3.0,
    quantity: 3,
    discount: 3,
    picture: "item3.jpg",
  },
];

/* Locations
"644 E Huron River Dr, Belleville, MI 48111"
"333 Industrial Park Dr, Belleville, MI 48111"
"60 Main St, Belleville, MI 48111"
*/

db.once("open", async () => {
  try {
    db.dropCollection("users");
    db.dropCollection("sales");
    db.dropCollection("items");

    await User.create(users);
    await Sale.create(sales);
    await Item.create(items);

    const createdUsers = await User.find();
    const createdSales = await Sale.find();
    const createdItems = await Item.find();

    // Map each created sale id to the user sales array
    for (const user of createdUsers) {
      user.sales = createdSales.map((sale) => sale._id);
      await user.save();
    }

    // Map each created item to a sale items array
    for (const sale of createdSales) {
      sale.items = createdItems.map((item) => item._id);
      await sale.save();
    }

    // Map each sale to a user and each item to a sale
    for (const item of createdItems) {
      const sale = createdSales.find((sale) => sale._id === item.saleId);
      if (sale) {
        sale.user = createdUsers.find((user) => user._id === sale.userId);
        item.sale = sale;
        await item.save();
      }
    }

    // Map each sale to the user's favorite array
    for (const user of createdUsers) {
      user.favorites = createdSales.map((sale) => sale._id);
      await user.save();
    }

    console.log("Items seeded");
    console.log("Sales seeded");
    console.log("Users seeded");
    console.log("Favorites seeded");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

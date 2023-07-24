import API from "./Custom/API.ts";
import { z } from "zod";
import { DishItem } from "./Dish.ts";
import { menuTypes } from "./Menu.ts";

const OrderDetail = z.object({
  dish: DishItem,
  quantity: z.number(),
  note: z.string().default(""),
  unit: z.string().default("€"),
});

type OrderDetail = z.infer<typeof OrderDetail>;

export const OrderItem = z.object({
  id: z.number().optional(),
  menu_id: z.number().optional(),
  timestamp: z.date().optional(),
  date: z.date().optional(),
  order_type: z.enum(menuTypes).default("standard"),
  spot: z.string(),
  order_details: z.array(OrderDetail).nonempty(),
  notes: z.string().default(""),
  status: z.string().optional(),
});

export type OrderItem = z.infer<typeof OrderItem>;

class Order extends API<Order> implements OrderItem {
  id?: number;
  menu_id!: number;
  timestamp?: Date;
  date?: Date;
  order_type!: (typeof menuTypes)[number];
  spot!: string;
  order_details!: [OrderDetail] & OrderDetail[];
  notes?: string;
  status?: string;

  constructor(orderItem: OrderItem) {
    super("order");
    Object.assign(this, orderItem);
  }

  static async getAll(): Promise<OrderItem[] | never> {
    return new API<OrderItem>("order").getAll();
  }

  static get(id: NonNullable<OrderItem["id"]>): Promise<OrderItem | never> {
    return new API<OrderItem>("order").get(id);
  }
}

export default Order;

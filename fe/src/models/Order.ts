class Order {
  constructor(
    public id: number,
    public menu_id: number,
    public timestamp: Date,
    public date: Date,
    public order_type: number,
    public location_id: number,
    public spot: string,
    public order_details: any, // JSONB type
    public notes: string,
    public status: string
  ) {}
}

export default Order;

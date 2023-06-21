class OrderTypes {
  constructor(
    public id: number,
    public name: string,
    public password: string,
    public notes: string,
    public details: any // JSONB type
  ) {}
}

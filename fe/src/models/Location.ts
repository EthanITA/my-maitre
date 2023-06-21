class LocationRestaurant {
  constructor(
    public id: number,
    public name: string,
    public address: string,
    public city: string,
    public province: string,
    public cap: string,
    public phone_number: string,
    public website: string,
    public email: string,
    public facebook: string,
    public instagram: string,
    public whatsapp: string,
    public image: string,
    public type: number,
    public open_hours: any, // JSONB type
    public languages: number
  ) {}
}

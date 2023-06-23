class User {
  constructor(
    public id: number,
    public name: string,
    public vat: string,
    public company: string,
    public address: string,
    public city: string,
    public province: string,
    public cap: string,
    public email: string,
    public hashed_password: string
  ) {}
}

export default User;

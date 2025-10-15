export class Order {
  constructor(
    public id: string,
    public userId: string,
    public items: Array<{ productId: string; quantity: number }>,
    public total: number,
    public status: string,
    public createdAt: Date,
  ) {}
}

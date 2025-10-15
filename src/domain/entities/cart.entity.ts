export class CartItem {
  constructor(
    public id: string,
    public userId: string,
    public productId: string,
    public quantity: number,
  ) {}
}

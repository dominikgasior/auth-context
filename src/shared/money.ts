export class Money {
  constructor(private readonly value: number) {
    this.validate();
  }

  equals(money: Money): boolean {
    return this.value === money.value;
  }

  private validate(): void {
    if (this.value < 0) {
      throw new Error('Money cannot be lower than 0');
    }
  }
}

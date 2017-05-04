export class User {
  Id: number;
  Email: string;
  FirstName: string;
  LastName: string;
  get FullName(): string {
    return (`${this.FirstName} ${this.LastName}`).trim();
  }
}

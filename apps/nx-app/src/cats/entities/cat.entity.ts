export class Cat {
  private readonly _id: string;
  private _name: string;
  private _dateOfBirth: Date;
  private _weight: number;

  constructor(id: string, name: string, dateOfBirth: Date, weight: number) {
    this._id = id;
    this._name = name;
    this._dateOfBirth = dateOfBirth;
    this._weight = weight;
  }

  get id(): string {
    return this._id;
  }

  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  set dateOfBirth(value: Date) {
    this._dateOfBirth = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get weight(): number {
    return this._weight;
  }

  set weight(value: number) {
    this._weight = value;
  }
}

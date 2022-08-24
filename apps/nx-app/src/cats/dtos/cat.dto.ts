export class CatDTO {
  readonly id: string;
  readonly name: string;
  readonly dateOfBirth: Date;
  readonly weight: number;

  constructor(id: string, name: string, dateOfBirth: Date, weight: number) {
    this.id = id;
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.weight = weight;
  }
}

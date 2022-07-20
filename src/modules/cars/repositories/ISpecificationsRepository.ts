import { Specification } from "../infra/typeorm/entities/Specification";


export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ description, name }: ICreateSpecificationDTO) : Promise<void>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository }
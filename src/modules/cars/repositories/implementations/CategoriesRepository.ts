import { getRepository, Repository } from 'typeorm';

import Category from '../../entities/Category';
import ICategoriesRepository from '../ICategoriesRepository';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export default class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  // private static ISTANCE: CategoriesRepository;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  // public static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.ISTANCE) {
  //     CategoriesRepository.ISTANCE = new CategoriesRepository();
  //   }

  //   return CategoriesRepository.ISTANCE;
  // }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({ name, description });

    await this.ormRepository.save(category);

    return category;
  }

  async list(): Promise<Category[]> {
    return this.ormRepository.find();
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ where: { name } });

    return category;
  }
}

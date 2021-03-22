import Category from '../../model/Category';
import ICategoriesRepository from '../ICategoriesRepository';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export default class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static ISTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.ISTANCE) {
      CategoriesRepository.ISTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.ISTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const category = new Category();

    Object.assign(category, { name, description, created_at: new Date() });

    this.categories.push(category);

    return category;
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category | undefined {
    const category = this.categories.find(category => category.name === name);

    return category;
  }
}

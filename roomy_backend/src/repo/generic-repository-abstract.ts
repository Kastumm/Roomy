import {FilterQuery} from 'moongoose';

export abstract class IGenericRepository<T> {
  abstract getAll(): Promise<T[]>;

  abstract findById(id: string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);

  abstract remove(id: string): Promise<T>;

  abstract find(filter: FilterQuery<T>): Promise<T[]>;

  abstract exists(filter: Object): Promise<Object>;

  abstract findOne(filter: Object): Promise<T>;

  abstract findByIdAndRemove(query: string): Promise<T>;

  abstract findByIdAndUpdate(id: string, data: Object): Promise<T>;

  abstract deleteMany(filter: Object): Promise<any>;
}

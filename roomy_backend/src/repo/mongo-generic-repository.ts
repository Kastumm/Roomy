import { Model, FilterQuery } from 'mongoose';
import { IGenericRepository } from './generic-repository-abstract';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;

  constructor(repository: Model<T>) {
    this._repository = repository;
  }

  async getAll(): Promise<T[]> {
    return await this._repository.find();
  }

  async findById(id: any): Promise<T> {
    return await this._repository.findById(id);
  }

  async create(item: T): Promise<T> {
    return await this._repository.create(item);
  }
  async update(id: string, item: T) {
    return await this._repository.findByIdAndUpdate(id, item);
  }

  async remove(id: string): Promise<T> {
    return await this._repository.findByIdAndRemove(id);
  }

  async find(filter: FilterQuery<T>): Promise<T[]> {
    return await this._repository.find(filter);
  }

  async exists(filter: FilterQuery<T>): Promise<Object> {
    return await this._repository.exists(filter);
  }

  async findOne(filter: FilterQuery<T>): Promise<T> {
    return await this._repository.findOne(filter);
  }

  async findByIdAndRemove(id: string): Promise<T> {
    return await this._repository.findByIdAndRemove(id);
  }

  async findByIdAndUpdate(id: string, data: Object): Promise<T> {
    return await this._repository.findByIdAndUpdate(id, data);
  }

  async deleteMany(filter: Object): Promise<any> {
    return await this._repository.deleteMany(filter);
  }
}

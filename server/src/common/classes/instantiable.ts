import { ClassConstructor } from '../types/class-constructor.type';

export abstract class Instantiable {
  constructor(data: Partial<ClassConstructor<any>>) {
    Object.assign(this, data);
  }

  public static from<T extends ClassConstructor<any>, K>(
    this: T,
    initValue: K,
  ): InstanceType<T> {
    return new this(initValue) as InstanceType<T>;
  }
}

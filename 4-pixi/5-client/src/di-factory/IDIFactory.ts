import { Container } from 'inversify';

export interface IDIFactory<T> {
  register(container: Container): void;
  create(container: Container): T;
}

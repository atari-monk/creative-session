import { Container, interfaces } from 'inversify';

export class ContainerTools {
  private container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  isDependencyBound(identifier: interfaces.ServiceIdentifier<any>): boolean {
    return this.container.isBound(identifier);
  }

  getDependencyScope(
    identifier: interfaces.ServiceIdentifier<any>
  ): string | null {
    try {
      const instance = this.container.get<any>(identifier);
      const scope =
        instance && instance.constructor && instance.constructor.name;
      return scope || null;
    } catch (error) {
      return null;
    }
  }
}

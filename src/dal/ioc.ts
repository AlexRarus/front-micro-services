import { Container, ContainerModule } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators';
import { RouterStore } from 'mobx-react-router';

const container: any = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton'
});

container.bind(RouterStore).toConstantValue(new RouterStore());

interface IProvideSyntax {
  constraint: (bind: any, target: any) => any;
  implementationType: any;
}

const PROVIDE_METADATA_KEY: string = 'inversify-binding-decorators:provide';

export const lazyInject = (identifier: any) => (target: any, key: any) => {
  const isBound: boolean = container.isBound(identifier);

  if (isBound) {
    const metadatas: any[] = Reflect.getMetadata(PROVIDE_METADATA_KEY, Reflect) || [];
    const provideMetadata: any = metadatas.filter((metadata: IProvideSyntax) => metadata.implementationType === identifier);

    if (provideMetadata.length === 0) {
      throw new Error(`Provide identifier is not registered ${identifier}`);
    }

    container.load(
      new ContainerModule(bind => {
        provideMetadata.forEach((metadata: IProvideSyntax) => metadata.constraint(bind, metadata.implementationType));
      })
    );
  }

  Object.defineProperty(target, key, {
    get: () => container.get(identifier),
    enumerable: true
  });
};

export const provide: any = {
  singleton: (target: any) =>
    fluentProvide(target)
      .inSingletonScope()
      .done()(target)
};

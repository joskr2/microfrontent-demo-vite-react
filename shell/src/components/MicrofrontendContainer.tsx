import React, { Suspense } from 'react';

interface MicrofrontendContainerProps {
  module: string;
  scope: string;
  fallback?: React.ReactNode;
}

const MicrofrontendContainer: React.FC<MicrofrontendContainerProps> = ({ module, scope, fallback = <div>Cargando...</div> }) => {
  const [Component, setComponent] = React.useState<React.ComponentType | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const loadModule = async () => {
      try {
        if (!window[scope as keyof Window]) {
          throw new Error(`Scope ${scope} not found in window`);
        }

        const container = window[scope as keyof Window] as {
          init: (scope: unknown) => Promise<void>;
          get: (module: string) => Promise<() => { default: React.ComponentType }>;
        };


        if (typeof __webpack_share_scopes__ !== 'undefined' &&
          __webpack_share_scopes__ &&
          '__webpack_share_scopes__.default' in __webpack_share_scopes__) {
          await container.init(__webpack_share_scopes__.default);
        }

        const factory = await container.get(module);
        const Module = factory();
        setComponent(() => Module.default);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load module'));
      }
    };

    loadModule();
  }, [module, scope]);

  if (error) {
    return <div>Error loading module: {error.message}</div>;
  }

  return Component ? (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  ) : fallback;
};

export default MicrofrontendContainer;

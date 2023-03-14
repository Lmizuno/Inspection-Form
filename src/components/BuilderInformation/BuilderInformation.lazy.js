import React, { lazy, Suspense } from 'react';

const LazyBuilderInformation = lazy(() => import('./BuilderInformation'));

const BuilderInformation = props => (
  <Suspense fallback={null}>
    <LazyBuilderInformation {...props} />
  </Suspense>
);

export default BuilderInformation;

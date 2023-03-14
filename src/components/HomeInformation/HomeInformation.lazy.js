import React, { lazy, Suspense } from 'react';

const LazyHomeInformation = lazy(() => import('./HomeInformation'));

const HomeInformation = props => (
  <Suspense fallback={null}>
    <LazyHomeInformation {...props} />
  </Suspense>
);

export default HomeInformation;

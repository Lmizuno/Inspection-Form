import React, { lazy, Suspense } from 'react';

const LazySignatureComponent = lazy(() => import('./SignatureComponent'));

const SignatureComponent = props => (
  <Suspense fallback={null}>
    <LazySignatureComponent {...props} />
  </Suspense>
);

export default SignatureComponent;

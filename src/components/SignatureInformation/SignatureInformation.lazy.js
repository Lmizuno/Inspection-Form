import React, { lazy, Suspense } from 'react';

const LazySignatureInformation = lazy(() => import('./SignatureInformation'));

const SignatureInformation = props => (
  <Suspense fallback={null}>
    <LazySignatureInformation {...props} />
  </Suspense>
);

export default SignatureInformation;

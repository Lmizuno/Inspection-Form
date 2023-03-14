import React, { lazy, Suspense } from 'react';

const LazyForm = lazy(() => import('./Form'));

const Form = props => (
  <Suspense fallback={null}>
    <LazyForm {...props} />
  </Suspense>
);

export default Form;

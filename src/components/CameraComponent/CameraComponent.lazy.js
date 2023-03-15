import React, { lazy, Suspense } from 'react';

const LazyCameraComponent = lazy(() => import('./CameraComponent'));

const CameraComponent = props => (
  <Suspense fallback={null}>
    <LazyCameraComponent {...props} />
  </Suspense>
);

export default CameraComponent;

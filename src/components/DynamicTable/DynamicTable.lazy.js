import React, { lazy, Suspense } from 'react';

const LazyDynamicTable = lazy(() => import('./DynamicTable'));

const DynamicTable = props => (
  <Suspense fallback={null}>
    <LazyDynamicTable {...props} />
  </Suspense>
);

export default DynamicTable;

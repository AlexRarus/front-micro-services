import React, { lazy, Suspense } from 'react';

const HomeContainer = lazy(() => import('src/containers/home'));
const ServiceLoaderExampleContainer = lazy(() => import('src/containers/service-loader-example'));
const AboutContainer = lazy(() => import('src/containers/about'));
const NotFoundContainer = lazy(() => import('src/containers/not-found'));

export const LazyHomeContainer = () => (
  <Suspense fallback={<div />}>
    <HomeContainer />
  </Suspense>
);

export const LazyServiceLoaderExampleContainer = () => (
  <Suspense fallback={<div />}>
    <ServiceLoaderExampleContainer />
  </Suspense>
);

export const LazyAboutContainer = () => (
  <Suspense fallback={<div />}>
    <AboutContainer />
  </Suspense>
);

export const LazyNotFoundContainer = () => (
  <Suspense fallback={<div />}>
    <NotFoundContainer />
  </Suspense>
);

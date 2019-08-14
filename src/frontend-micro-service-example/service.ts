import { Service } from 'components/core';

export const {
  loadComponent,
  resizeWindow,
  subscribeOnMessages,
  submitMessage
} = new Service({ serviceId: 'service-example' });

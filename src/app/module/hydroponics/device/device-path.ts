import { HYDROPONIC_MODULE_BASE_ROUTE } from '../module-route-name';

const DEVICE_BASE = 'device';
const DEVICE_BASE_FULL = HYDROPONIC_MODULE_BASE_ROUTE + '/' + DEVICE_BASE;

export const DEVICE_PATH_FULL = {
  LIST: DEVICE_BASE_FULL,
  ADD: DEVICE_BASE_FULL + '/add',
  EDIT: DEVICE_BASE_FULL + '/edit',
  INFO: DEVICE_BASE_FULL + '/info',
};

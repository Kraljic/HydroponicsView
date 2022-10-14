import { HYDROPONIC_MODULE_BASE_ROUTE } from '../module-route-name';

const SENSOR_BASE = 'sensor';
const SENSOR_BASE_FULL = HYDROPONIC_MODULE_BASE_ROUTE + '/' + SENSOR_BASE;

export const SENSOR_PATH_FULL = {
  LIST: SENSOR_BASE_FULL,
  ADD: SENSOR_BASE_FULL + '/add',
  EDIT: SENSOR_BASE_FULL + '/edit',
  EDIT_VARIABLE: SENSOR_BASE_FULL + '/edit-variable',
  INFO: SENSOR_BASE_FULL + '/info',
};

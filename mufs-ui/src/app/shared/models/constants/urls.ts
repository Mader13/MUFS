import { environment } from 'src/environments/environment';

const BASE_URL = environment.production ? '' : 'http://localhost:5000';

export const PROJECTS_URL = BASE_URL + '/api/projects';
export const PROJECTS_BY_SEARCH_URL = PROJECTS_URL + '/search/';
export const PROJECTS_BY_ID_URL = PROJECTS_URL + '/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register-user';
export const PROJECTS_CREATE_URL = BASE_URL + '/api/projects/create-project';

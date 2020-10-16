import { CSTSnackbarSingleton } from '../components/cst-snackbar/cst-snackbar';
import minDelay from './min-delay';
const ANIMATION_DELAY = 600;

export const getApiUrl = () => {
  const apiUrl = localStorage.getItem(`apiUrl`);
  return apiUrl;
};

export const getJsonboxKeyFromUrl = (url: string) => {
  return url.split('box_')[1] || '';
};

const findApiUrl = () => {
  const apiUrl = getApiUrl();
  if (!apiUrl) {
    CSTSnackbarSingleton.open('There was a problem finding the database. Please restart this application and try again');
    return null;
  }
  return apiUrl;
};

export const updateJsonboxKey = (key: string) => {
  localStorage.setItem('apiUrl', `https://jsonbox.io/box_${key}`);
}

const contentTypeApplicationJson = {
  'content-type': 'application/json',
};

export const GET = async (path: string) => {
  const apiUrl = findApiUrl();
  if (!apiUrl) return;

  const fullUrl = `${apiUrl}${path ? `/${path}` : ''}`;

  try {
    const response = await minDelay(
      fetch(fullUrl, {
        method: 'GET',
        headers: {
          ...contentTypeApplicationJson,
        },
      }),
      ANIMATION_DELAY
    );
    const json = JSON.parse(await response.text());
    return Promise.resolve(json);
  } catch (error) {
    CSTSnackbarSingleton.open(error);
  }
};

export const POST = async (path: string, body: any) => {
  const apiUrl = findApiUrl();
  if (!apiUrl) return;

  const fullUrl = `${apiUrl}${path ? `/${path}` : ''}`;

  try {
    const response = await minDelay(
      fetch(fullUrl, {
        method: 'POST',
        headers: {
          ...contentTypeApplicationJson,
        },
        body: JSON.stringify(body),
      }),
      ANIMATION_DELAY
    );
    let json;
    try {
      json = await response.json();
    } catch (error) {
      return Promise.reject(`The server sent back invalid JSON. ${error}`);
    }

    if (json.error != null) {
      return Promise.reject(json.error.message);
    }

    if (response.status === 201 || response.status === 200) {
      return Promise.resolve(json);
    } else {
      return Promise.reject('Request error, please try again later.');
    }
  } catch (error) {
    CSTSnackbarSingleton.open(error);
  }
};

export const PUT = async (path: string, body: any) => {
  const apiUrl = findApiUrl();
  if (!apiUrl) return;

  const fullUrl = `${apiUrl}${path ? `/${path}` : ''}`;

  try {
    const response = await minDelay(
      fetch(fullUrl, {
        method: 'PUT',
        headers: {
          ...contentTypeApplicationJson,
        },
        body: JSON.stringify(body),
      }),
      ANIMATION_DELAY
    );
    let json;
    json = await response.json();

    if (response.status === 201 || response.status === 200) {
      return Promise.resolve(json);
    }
  } catch (error) {
    CSTSnackbarSingleton.open(error);
  }
};

export const DELETE = async (path: string, id: string) => {
  const apiUrl = findApiUrl();
  if (!apiUrl || !path || !id) return;

  const fullUrl = `${apiUrl}${path ? `/${path}` : ''}${id ? `/${id}` : ''}`;

  try {
    const response = await minDelay(
      fetch(fullUrl, {
        method: 'DELETE',
        headers: {
          ...contentTypeApplicationJson,
        },
      }),
      ANIMATION_DELAY
    );
    const json = JSON.parse(await response.text());

    return Promise.resolve(json);
  } catch (error) {
    CSTSnackbarSingleton.open(error);
  }
};

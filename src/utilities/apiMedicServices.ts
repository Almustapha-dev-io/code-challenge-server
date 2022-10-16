import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  API_MEDIC_AUTH_BASE_URL,
  API_MEDIC_HEALTH_BASE_URL,
  API_MEDIC_KEY,
  API_MEDIC_SECRET,
} from './env';
import { getHMACMD5Hash } from './hash';

type APIMedicTokenResult = {
  Token: string;
  ValidThrough: number;
};

type APIMedicSymptom = {
  ID: number;
  Name: string;
};

type APIMedicIssue = {
  ID: number;
  Name: string;
  ProfName: string;
  Icd: string;
  IcdName: string;
  Accuracy: number;
};

type APIMedicSpecialisation = {
  ID: number;
  Name: string;
  SpecialistID: number;
};

type APIMedicDiagnosis = {
  Issue: APIMedicIssue;
  Specialisation: APIMedicSpecialisation;
};

let token = '';
const language = 'en-gb';

export const getAPIMedicToken = async () => {
  if (token) {
    return token;
  }

  const url = API_MEDIC_AUTH_BASE_URL + '/login';
  const hash = getHMACMD5Hash(url, API_MEDIC_SECRET);
  const options: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${API_MEDIC_KEY}:${hash}`,
    },
  };
  const response: AxiosResponse<APIMedicTokenResult> = await axios.post(
    url,
    {},
    options
  );

  setTimeout(() => {
    token = '';
  }, response.data.ValidThrough * 1000);

  token = response.data.Token;
  return token;
};

export const getAPIMedicSymptoms = async () => {
  const url = API_MEDIC_HEALTH_BASE_URL + '/symptoms';
  const token = await getAPIMedicToken();
  const options: AxiosRequestConfig = {
    params: { token, language },
    headers: {
      Authorization: token,
    },
  };
  const response: AxiosResponse<APIMedicSymptom[]> = await axios.get(
    url,
    options
  );
  return response.data;
};

export const generateAPIMedicDiagnosis = async (
  symptoms: string,
  gender: 'male' | 'female',
  yearOfBirth: number
) => {
  const url = API_MEDIC_HEALTH_BASE_URL + '/diagnosis';
  const token = await getAPIMedicToken();
  const options: AxiosRequestConfig = {
    params: { token, symptoms, gender, language, year_of_birth: yearOfBirth },
    headers: {
      Authorization: token,
    },
  };
  const response: AxiosResponse<APIMedicDiagnosis[]> = await axios.get(
    url,
    options
  );
  return response.data;
};

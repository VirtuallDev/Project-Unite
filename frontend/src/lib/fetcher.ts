import axios, {AxiosRequestConfig} from 'axios';

const fetcher = (url: string, authToken: string) => axios.get(url, {headers: {Authorization: "Bearer " + authToken}}).then(r => r.data);
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { AppDispatch, RootState } from '../redux/store';
import jwtDecode from 'jwt-decode';
import { setAccessToken } from '../redux/reducers/accesstoken.reducer';

type JsonObject = Record<string, unknown>;
export const API_URL = "localhost:3000";
export type HTTP_METHOD = "GET" | "POST" | "PUT" | "DELETE" | "UPDATE";

export type BODY = JsonObject | File;



type ApiFunction = (endpoint: string | "", method?: HTTP_METHOD, body?: BODY) => Promise<JsonObject | unknown>;

function useAuth() {
    const dispatch = useDispatch<AppDispatch>();
    const apiRef = useRef<ApiFunction>(() => {throw new Error("API Function didnt initialize")});
    const accessToken = useSelector((s: RootState) => s.accessToken.accessToken);
    
    useEffect(() => {
        apiRef.current =async (endpoint, method = 'GET', body?) => {
            try {
                const json = !(body instanceof File);
                const headers = {
                    ...(json && {'Content-Type': 'application/json'}),
                    authorization: 'Bearer ' + accessToken
                }
                
                const options: RequestInit = { method, headers, body: body && json ? JSON.stringify(body) : body };
                const res = await fetch(`${API_URL}${endpoint.startsWith("/") ? endpoint : '/' + endpoint}`, options);
                const jsonRes = await res.json();
                return jsonRes;
            } catch (e) {
                console.log(e);
            }

            if(!accessToken) return;
            
        }
    }, [accessToken]);

    function isTokenExpired() {
        try {

            if(!accessToken) return true;
            const decodedExpired = jwtDecode<{exp: number}>(accessToken)?.exp;
            const currentTime = Date.now() / 1000;
            return decodedExpired < currentTime;
        } catch {
            return true;
        }
    }

    async function getNewAccessToken() {
        try {
            const res = await fetch(`${API_URL}/auth/refresh-token`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });

            const jsonRes = await res.json();
            const newAccessToken: string = jsonRes?.accessToken;
            if(newAccessToken) dispatch(setAccessToken(newAccessToken));
        } catch {
            dispatch(setAccessToken(null));
        }
    }

    
    async function useApi(endpoint: string, method: HTTP_METHOD, body: BODY) {
        try {
            if(isTokenExpired()) await getNewAccessToken();
            const jsonRes = await apiRef.current(endpoint, method, body);
            return jsonRes;
        } catch {
            return;
        }
    }

    return useApi;
}

export default useAuth;
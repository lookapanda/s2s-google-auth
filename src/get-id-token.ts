import * as nodeFetch from 'node-fetch';
import * as querystring from 'querystring';

interface IGoogleTokenResponse {
    id_token?: string;
    error?: string;
    error_description?: string;
}

const getIdToken = (jwt: string): Promise<IGoogleTokenResponse> =>
    nodeFetch
        .default('https://www.googleapis.com/oauth2/v4/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: querystring.stringify({
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: jwt,
            }),
        })
        .then((res: nodeFetch.Response) => res.json());

export default getIdToken;

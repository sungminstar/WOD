import { API } from ".";


export const getAppVersion = async () => {
    return await API.get('/api/version')
}
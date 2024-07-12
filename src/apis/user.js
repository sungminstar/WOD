import { API } from ".";


export const getMyInfo = async () => {
    return await API.get('/api/info')
}

export const getMyFriendList = async (userId) => {
    return await API.get(`/api/friend/${userId}`)
}
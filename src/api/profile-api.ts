import {profileType} from "../Redux/profile-reducer";
import {instance, ResponseType} from "./api";

type AvaType = {
    photos: {
    small: string | null
    large: string | null
}
}

export const profileApi = {
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status})
    },
    getStatus(userId: string) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    getProfile(userId: string) {
        return instance.get<profileType>(`profile/${userId}`)
            .then(response => response.data)
    },
    saveAva(ava: File) {
        const formData = new FormData()
        formData.append('image', ava)
        return instance.put<ResponseType<AvaType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: profileType) {
        return instance.put<ResponseType>(`profile`, profile)
    }
}
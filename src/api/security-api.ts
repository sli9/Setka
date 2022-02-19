import {instance} from "./api";

type CaptchaUrlType = {
    url: string
}

export const securityApi = {
    captchaUrl() {
        return instance.get<CaptchaUrlType>(`security/get-captcha-url`)
    }
}
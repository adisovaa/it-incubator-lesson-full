import { instance } from "common/instance"
import { BaseResponse } from "common/types"
import { LoginInputs } from "../ui/Login"

export const authApi = {
  login: (payload: LoginInputs) => {
    return instance.post<BaseResponse<{ userId: number; token: string }>>(`auth/login`, payload)
  },
  logout: () => {
    return instance.delete<BaseResponse>(`auth/login`)
  },
  me: () => {
    return instance.get<BaseResponse>(`auth/me`)
  },
}

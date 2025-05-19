import { httpStatus } from "../../interface/httpStatus"
import { catchAsync } from "../../shared/catchAsync"
import { sendResponse } from "../../shared/sendResponse"
import { AuthService } from "./auth.service"

const loginUser = catchAsync(async (req, res) =>{
    const {refreshToken,accessToken} = await AuthService.loginUser(req.body)
    
    res.cookie('refreshToken', refreshToken,{
        secure: false,
        httpOnly: true
    })
    res.cookie('accessToken', accessToken,{
        secure: false,
        httpOnly: true
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully login",
        data: {
            accessToken,
            refreshToken
        }

    })
})

export const AuthController = {
    loginUser
}
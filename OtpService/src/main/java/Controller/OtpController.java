package Controller;

import Model.SendOtpRequest;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;

@Controller("/otp")
public class OtpController {

    @Post("/send")
    @Produces(MediaType.APPLICATION_JSON)
    public String sendOtp(@Body SendOtpRequest sendOtpRequest){
        return sendOtpRequest.getPhoneNumber();
    }

    @Post("/verify")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String verifyOtp(@Body VerifyOtpRequest sendOtpRequest){
        return sendOtpRequest.getPhoneNumber();
    }
}

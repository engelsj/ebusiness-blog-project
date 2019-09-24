package Controller;

import Model.SendOtpRequest;
import Model.SendOtpResponse;
import Model.VerifyOtpRequest;
import Service.OtpService;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;

import javax.inject.Inject;
import javax.inject.Singleton;

@Controller("/otp")
@Singleton
public class OtpController {

    OtpService otpService;

    @Inject
    public OtpController(OtpService otpService){
        this.otpService = otpService;
    }

    @Post("/send")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public SendOtpResponse sendOtp(@Body SendOtpRequest sendOtpRequest){
        return otpService.sendOtp(sendOtpRequest);
    }

    @Post("/verify")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String verifyOtp(@Body VerifyOtpRequest sendOtpRequest){
        return sendOtpRequest.getPhoneNumber();
    }
}

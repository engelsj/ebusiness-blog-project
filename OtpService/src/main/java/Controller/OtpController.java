package Controller;

import Model.SendOtpRequest;
import Model.SendOtpResponse;
import Model.VerifyOtpRequest;
import Model.VerifyOtpResponse;
import Service.OtpService;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import io.micronaut.security.annotation.Secured;


import javax.inject.Inject;

@Secured("isAuthenticated()")
@Controller("/otp")
public class OtpController {

    OtpService otpService;

    @Inject
    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }

    @Post("/send")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public SendOtpResponse sendOtp(@Body SendOtpRequest sendOtpRequest) {
        return otpService.sendOtp(sendOtpRequest);
    }

    @Post("/verify")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public VerifyOtpResponse verifyOtp(@Body VerifyOtpRequest verifyOtpRequest) {
        return otpService.verifyOtp(verifyOtpRequest);
    }
}

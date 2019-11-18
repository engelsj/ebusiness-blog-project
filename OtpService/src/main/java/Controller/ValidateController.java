package Controller;

import Model.*;
import Service.ValidateService;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;

import javax.inject.Inject;

@Controller("/validate")
public class ValidateController {

    ValidateService validateService;

    @Inject
    public ValidateController(ValidateService validateService){
        this.validateService = validateService;
    }

    @Post("/user")
    public UserResponse isUser(@Body UserRequest userRequest){
        UserResponse userResponse = new UserResponse();
        userResponse.setMessage(validateService.isUser(userRequest.getUserName()));
        return userResponse;
    }

    @Post("/generatePartialPassword")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public PartialPasswordResponse generatePartialPassword(@Body PartialPasswordRequest partialPasswordRequest){
        System.out.println("Hit partial");
        return  validateService.generatePartialPassword(partialPasswordRequest);
    }

    @Post("/verifyPartialPassword")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public VerifyPartialPasswordResponse validatePartialPassword(@Body VerifyPartialPasswordRequest verifyPartialPasswordRequest){
        VerifyPartialPasswordResponse test = new VerifyPartialPasswordResponse();
        test = validateService.validatePartialPassword(verifyPartialPasswordRequest);
        System.out.println(test.getErrorMessage() + " " + test.isValid());
        return validateService.validatePartialPassword(verifyPartialPasswordRequest);
    }

    @Post("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public LoginResponse login(@Body LoginRequest loginRequest){
        LoginResponse response = new LoginResponse();
        response.setValid(validateService.login(loginRequest.getUserName(), loginRequest.getPassword()));
        return response;
    }

}

package Controller;

import Model.*;
import Service.ValidateService;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import io.micronaut.security.annotation.Secured;

import javax.inject.Inject;

@Secured("isAuthenticated()")
@Controller("/validate")
public class ValidateController {

    ValidateService validateService;

    @Inject
    public ValidateController(ValidateService validateService){
        this.validateService = validateService;
    }

    @Get("/user")
    public String isUser(@Header String userName){
        return validateService.isUser(userName);
    }

    @Post("/generatePartialPassword")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public PartialPasswordResponse generatePartialPassword(@Body PartialPasswordRequest partialPasswordRequest){
        return  validateService.generatePartialPassword(partialPasswordRequest);
    }

    @Post("/verifyPartialPassword")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public VerifyPartialPasswordResponse validatePartialPassword(@Body VerifyPartialPasswordRequest verifyPartialPasswordRequest){
        return validateService.validatePartialPassword(verifyPartialPasswordRequest);
    }

    @Post("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public boolean login(@Body LoginRequest loginRequest){
        return validateService.login(loginRequest.getUserName(), loginRequest.getPassword());
    }

}

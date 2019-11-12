package Controller;

import Model.PartialPasswordRequest;
import Model.PartialPasswordResponse;
import Model.VerifyPartialPasswordRequest;
import Model.VerifyPartialPasswordResponse;
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

    @Get
    public boolean isUser(@Header String userName){
        return validateService.isUser(userName);
    }

    @Post
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public PartialPasswordResponse generatePartialPassword(@Body PartialPasswordRequest partialPasswordRequest){
        return  validateService.generatePartialPassword(partialPasswordRequest);
    }

    @Post
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public VerifyPartialPasswordResponse validatePartialPassword(@Body VerifyPartialPasswordRequest verifyPartialPasswordRequest){
        return validateService.validatePartialPassword(verifyPartialPasswordRequest);
    }

}

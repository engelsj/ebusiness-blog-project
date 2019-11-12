package Service;

import Client.OtpClient;
import Client.ValidateClient;
import Model.*;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class ValidateService {

    ValidateClient validateClient;

    @Inject
    public ValidateService(ValidateClient validateClient){
        this.validateClient = validateClient;
    }

    public boolean isUser(String userName){
        return validateClient.isUser(userName);
    }

    public PartialPasswordResponse generatePartialPassword(PartialPasswordRequest partialPasswordRequest){
        return validateClient.generatePartialPassword(partialPasswordRequest.getUserName());
    }

    public VerifyPartialPasswordResponse validatePartialPassword(VerifyPartialPasswordRequest verifyPartialPasswordRequest){
        return validateClient.validatePartialPassword(verifyPartialPasswordRequest);
    }
}

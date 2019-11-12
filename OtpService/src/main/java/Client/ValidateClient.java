package Client;

import Model.PartialPasswordResponse;
import Model.VerifyPartialPasswordRequest;
import Model.VerifyPartialPasswordResponse;

import javax.inject.Singleton;
import java.util.ArrayList;

import java.util.Collections;

@Singleton
public class ValidateClient {

    String tempPassword = "Trinity";
    public boolean isUser(String userName) {
        if(userName.equals("jengels"))
            return true;
        else
            return false;
    }

    public PartialPasswordResponse generatePartialPassword(String userName){

        PartialPasswordResponse response = new PartialPasswordResponse();
        if(userName != null) {
            response.setUserName(userName);
            ArrayList<Integer> tempArray = new ArrayList<>();
            for (int i = 0; i < tempPassword.length(); i++)
                tempArray.add(i);
            Collections.shuffle(tempArray);
            StringBuilder indexes = new StringBuilder();
            for (int i = 0; i < 4; i++)
                indexes.append(tempArray.get(i));
            response.setIndexes(indexes.toString());
            return response;
        }
        response.setErrorMessage("No Username");
        return response;

    }

    public VerifyPartialPasswordResponse validatePartialPassword(VerifyPartialPasswordRequest verifyPartialPasswordRequest) {

        VerifyPartialPasswordResponse verifyPartialPasswordResponse = new VerifyPartialPasswordResponse();

        if(verifyPartialPasswordRequest.getPartialPassword().length() != verifyPartialPasswordRequest.getIndexes().length()){
            verifyPartialPasswordResponse.setValid(false);
            return  verifyPartialPasswordResponse;
        }
        for(int i = 0; i < verifyPartialPasswordRequest.getIndexes().length(); i++)
        {
            if(verifyPartialPasswordRequest.getPartialPassword().charAt(i) !=
                    (tempPassword.charAt(verifyPartialPasswordRequest.getIndexes().charAt(i) - '0')))
            {
                verifyPartialPasswordResponse.setValid(false);
                return  verifyPartialPasswordResponse;
            }
        }
        verifyPartialPasswordResponse.setValid(true);

        return verifyPartialPasswordResponse;
    }
}

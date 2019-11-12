package Client;

import Model.PartialPasswordResponse;
import Model.VerifyPartialPasswordRequest;
import Model.VerifyPartialPasswordResponse;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

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
            ArrayList<Integer> tempArray = new ArrayList<Integer>();
            for (int i = 0; i < tempPassword.length(); i++)
                tempArray.add(i);
            Collections.shuffle(tempArray);
            StringBuilder indexes = new StringBuilder();
            for (int i = 0; i < 3; i++)
                indexes.append(tempArray.get(i));
            response.setIndexes(indexes.toString());
            return response;
        }
        response.setErrorMessage("No Username");
        return response;

    }

    public VerifyPartialPasswordResponse validatePartialPassword(VerifyPartialPasswordRequest verifyPartialPasswordRequest) {
        return null;
    }
}

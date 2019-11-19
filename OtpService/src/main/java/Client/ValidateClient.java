package Client;

import AES.AES;
import Model.PartialPasswordResponse;
import Model.VerifyPartialPasswordRequest;
import Model.VerifyPartialPasswordResponse;
import Users.User;

import javax.inject.Singleton;
import java.util.ArrayList;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;

@Singleton
public class ValidateClient {


    HashMap<String, User> userHashMap;
    String testKey = "ssshhhhhhhhhhh!!!!";

    public ValidateClient(){

        // make some users instead of loading them from database
        AES aes = new AES();
        userHashMap = new HashMap<>();
    }

    public String isUser(String userName) {
        if(userHashMap.containsKey(userName))
            return AES.decrypt(userHashMap.get(userName).getPhoneNumber(),testKey);
        return "Not Found";
    }

    public PartialPasswordResponse generatePartialPassword(String userName){

        PartialPasswordResponse response = new PartialPasswordResponse();
        if(userName != null) {
            response.setUserName(userName);
            ArrayList<Integer> tempArray = new ArrayList<>();
            for (int i = 0; i < AES.decrypt(userHashMap.get(userName).getPassword(),testKey).length(); i++) {
                tempArray.add(i);
            }
            Collections.shuffle(tempArray);

            StringBuilder indexes = new StringBuilder();
            for (int i = 0; i < 3; i++)
                indexes.append(tempArray.get(i));
            char tempStringArray[] = indexes.toString().toCharArray();
            Arrays.sort(tempStringArray);
            response.setIndex1(tempStringArray[0] - '0' + 1);
            response.setIndex2(tempStringArray[1] - '0' + 1);
            response.setIndex3(tempStringArray[2] - '0' + 1);
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
                    (AES.decrypt(userHashMap.get(verifyPartialPasswordRequest.getUserName()).getPassword(),testKey).
                            charAt(verifyPartialPasswordRequest.getIndexes().charAt(i) - '0')))
            {
                verifyPartialPasswordResponse.setValid(false);
                return  verifyPartialPasswordResponse;
            }
        }
        verifyPartialPasswordResponse.setValid(true);

        return verifyPartialPasswordResponse;
    }

    public boolean login(String userName, String password){
        if(userHashMap.containsKey(userName))
            if(AES.decrypt(userHashMap.get(userName).getPassword(),testKey).equals(password))
                return true;
            return false;
    }
}

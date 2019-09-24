package Client;

import Model.SendOtpRequest;
import Model.SendOtpResponse;
import Model.VerifyOtpRequest;
import Model.VerifyOtpResponse;
import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;

import javax.inject.Singleton;

@Singleton
public class OtpClient {

    public static final String ACCOUNT_SID = "";
    public static final String AUTH_TOKEN = "";
    public static final String SID = "";
    Twilio twilioClient;

    public OtpClient(){
        twilioClient.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    public SendOtpResponse sendOtp(SendOtpRequest sendOtpResponse){
        try {
            Verification verification = Verification.creator(
                    SID,
                    sendOtpResponse.getPhoneNumber(),
                    "sms")
                    .create();
            SendOtpResponse response = new SendOtpResponse(verification);
            return response;
        }
        catch(Exception e){
            return new SendOtpResponse(e.toString());
        }

    }

    public VerifyOtpResponse verifyOtp(VerifyOtpRequest verifyOtpRequest){
        try {
            VerificationCheck verificationCheck = VerificationCheck.creator(
                    SID,
                    verifyOtpRequest.getCode())
                    .setTo(verifyOtpRequest.getPhoneNumber()).create();
            VerifyOtpResponse response = new VerifyOtpResponse(verificationCheck);
            return response;
        }
        catch(Exception e) {
            return new VerifyOtpResponse(e.toString());
        }
    }
}

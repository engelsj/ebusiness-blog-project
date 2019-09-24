package Client;

import Model.SendOtpRequest;
import Model.SendOtpResponse;
import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;

import javax.inject.Singleton;

@Singleton
public class OtpClient {

    public static final String ACCOUNT_SID = "AC5b3bd4b60d419c39a2681f13ae26d392";
    public static final String AUTH_TOKEN = "8ed451c3b4bc1de8516832c186d45022";
    public static final String SID = "VA7656bb5d9af92a9460363acf53b52749";
    Twilio twilioClient;

    public OtpClient(){
        twilioClient.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    public SendOtpResponse sendOtp(SendOtpRequest sendOtpResponse){
        Verification verification = Verification.creator(
                SID,
                sendOtpResponse.getPhoneNumber(),
                "sms")
                .create();

        response.setAccount_sid(verification.getAccountSid());
        response.setService_sid(verification.getServiceSid());
        response.setTo(verification.getTo().toString());
        response.setStatus(verification.getStatus());
        response.setValid(verification.getValid().toString());
        return response;

    }
}

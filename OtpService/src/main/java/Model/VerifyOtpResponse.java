package Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.twilio.rest.verify.v2.service.VerificationCheck;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyOtpResponse {

    @JsonProperty
    String sid;

    @JsonProperty
    String service_sid;

    @JsonProperty
    String account_sid;

    @JsonProperty
    String phoneNumber;

    @JsonProperty
    String status;

    @JsonProperty
    String valid;

    public VerifyOtpResponse(VerificationCheck verificationCheck) {
        setSid(verificationCheck.getSid());
        setService_sid(verificationCheck.getServiceSid());
        setAccount_sid(verificationCheck.getAccountSid());
        setPhoneNumber(verificationCheck.getTo());
        setStatus(verificationCheck.getStatus());
        setValid(verificationCheck.getValid().toString());
    }

}

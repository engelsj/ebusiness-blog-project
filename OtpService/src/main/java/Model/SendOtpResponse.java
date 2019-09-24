package Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import com.twilio.rest.verify.v2.service.Verification;

@Getter
@Setter
public class SendOtpResponse {


    @JsonProperty
    String sid;

    @JsonProperty
    String service_sid;

    @JsonProperty
    String account_sid;

    @JsonProperty
    String to;

    @JsonProperty
    String status;

    @JsonProperty
    String valid;

    public SendOtpResponse(Verification verification) {
        setAccount_sid(verification.getAccountSid());
        setService_sid(verification.getServiceSid());
        setTo(verification.getTo().toString());
        setStatus(verification.getStatus());
        this.setValid(verification.getValid().toString());
    }
}

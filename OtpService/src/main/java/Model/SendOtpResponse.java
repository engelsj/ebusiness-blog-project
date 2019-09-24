package Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

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

}

package Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class SendOtpRequest {

    @JsonProperty
    String phoneNumber;
}

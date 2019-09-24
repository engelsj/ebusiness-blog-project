package Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class VerifyOtpRequest {

    @JsonProperty
    String phoneNumber;

    @JsonProperty
    String code;
}

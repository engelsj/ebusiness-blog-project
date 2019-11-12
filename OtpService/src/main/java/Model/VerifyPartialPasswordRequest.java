package Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class VerifyPartialPasswordRequest {

    @JsonProperty
    String userName;

    @JsonProperty
    String partialPassword;

    @JsonProperty
    String indexes;
}

package Model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Setter;

@Setter
public class VerifyPartialPasswordResponse {
    @JsonProperty
    boolean valid;

    @JsonProperty
    String errorMessage;
}

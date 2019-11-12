package Model;


import com.fasterxml.jackson.annotation.JsonProperty;

public class VerifyPartialPasswordResponse {
    @JsonProperty
    boolean valid;

    @JsonProperty
    String errorMessage;
}

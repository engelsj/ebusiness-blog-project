package Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class PartialPasswordRequest {

    @JsonProperty
    String userName;
}

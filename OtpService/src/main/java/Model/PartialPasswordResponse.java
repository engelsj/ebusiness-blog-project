package Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PartialPasswordResponse {
    @JsonProperty
    String userName;

    @JsonProperty
    Integer index1;

    @JsonProperty
    Integer index2;

    @JsonProperty
    Integer index3;

    @JsonProperty
    String errorMessage;
}

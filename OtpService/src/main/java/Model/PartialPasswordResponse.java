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
    String indexes;

    @JsonProperty
    String errorMessage;
}

package Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    @JsonProperty
    String userName;

    @JsonProperty
    String password;
}

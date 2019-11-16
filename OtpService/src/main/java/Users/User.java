package Users;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {

    String password;

    String phoneNumber;

    public User(String password, String phoneNumber){
        this.password = password;
        this.phoneNumber = phoneNumber;
    }
}

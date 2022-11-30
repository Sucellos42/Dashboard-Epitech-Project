package Main.controllers;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/info")
public class InfoUSer {

    @GetMapping
    public String currentUser (OAuth2AuthenticationToken oAuth2AuthenticationToken) throws Exception{

        String s = oAuth2AuthenticationToken.getPrincipal().toString();
        String email = "";
        Matcher m = Pattern.compile("[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+").matcher(s);
        while (m.find()) {
            email += m.group();
        }
        return email;
    }
}

package Main.controllers;

import Main.modeles.Tokens;
import Main.modeles.Users;
import Main.repository.TokenRepository;
import Main.repository.UsersRepository;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.Banner;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.token.Token;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Controller
public class UsersController {

    @Autowired
    private UsersRepository usersRepo;

    @Autowired
    private TokenRepository tokenRepository;


    @GetMapping("/")
    public ModelAndView redirectLogin(ModelMap model){
        return new ModelAndView("redirect:/register", model);
    }

    @GetMapping("/index")
    public String viewHomePage(){
        return "index";
    }

    @GetMapping("/verificationDone")
    public String verificationDone(){
        return "verificationDone";
    }


    @GetMapping("/register")
    public String showRegistrationForm(Model model){
        model.addAttribute("user", new Users());
        return "signup_form";
    }
    @GetMapping("/dashboard")
    public String dashboard(Model model){
        String s = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        String email = "";

        Matcher m = Pattern.compile("[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+").matcher(s);
        while (m.find()) {
            email += m.group();
        }

        if (usersRepo.findByEmail(email) == null && !email.equals("")){
            Users users = new Users();
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = passwordEncoder.encode("PasswordForGoogleUser57952*");
            users.setEmail(email);
            users.setStatus(true);
            users.setPseudo("googleUser");
            users.setPassword(encodedPassword);
            usersRepo.save(users);
        }
        if(email.equals(""))
            email = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = usersRepo.findByEmail(email);

        model.addAttribute("id_user",user.getId_user());
        model.addAttribute("status", user.getStatus());

        if (usersRepo.findByEmail(email).getStatus()){
            return "dashboard";
        }
        else {
            return "accountNotVerified";
        }

    }

    @PostMapping("/process_register")
    public String processRegister(Users user) throws IOException, InterruptedException, ConstraintViolationException {


        Tokens tokens = new Tokens();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        usersRepo.save(user);

        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();
        StringBuilder buffer = new StringBuilder(targetStringLength);
        for (int i = 0; i < targetStringLength; i++) {
            int randomLimitedInt = leftLimit + (int)
                    (random.nextFloat() * (rightLimit - leftLimit + 1));
            buffer.append((char) randomLimitedInt);
        }
        String generatedToken = buffer.toString();

        BCryptPasswordEncoder tokenEncoder = new BCryptPasswordEncoder();
        String encodedToken = tokenEncoder.encode(generatedToken);
        encodedToken = encodedToken.replace('/', '-');


        tokens.setUser_id(user.getId_user());
        tokens.setValue(encodedToken);
        tokenRepository.save(tokens);

        String urlMail = ("http://mailadmin.alwaysdata.net/?email=" + user.getEmail() +"&token=" + encodedToken);
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(urlMail))
                .build();

        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());


        return "register_success";

    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ModelAndView redirectException(){
        return new ModelAndView("accountNotVerified");
    }


    @GetMapping("/users")
    public String listUsers(Model model){
        List<Users> listUsers = usersRepo.findAll();
        model.addAttribute("listUsers", listUsers);


        String s = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        String email = "";

        Matcher m = Pattern.compile("[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+").matcher(s);
        while (m.find()) {
            email += m.group();
        }


        if (usersRepo.findByEmail(email) == null && !email.equals("")){
            Users users = new Users();
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = passwordEncoder.encode("PasswordForGoogleUser57952*");
            users.setEmail(email);
            users.setPseudo("googleUser");
            users.setPassword(encodedPassword);
            usersRepo.save(users);
        }

        return "users";
    }

    @GetMapping("/verifyAccount/{email}/{tokenUrl}")
    public ModelAndView verifyAccount(@PathVariable String email, @PathVariable String tokenUrl)  {

        if (usersRepo.findByEmail(email) == null){
            return new ModelAndView("accountNotVerified");
        }

        Long id_user = usersRepo.findByEmail(email).getId_user();
        String tokens = tokenRepository.findByUser_id(id_user);


        if (tokenUrl.equals(tokens)){
            Users user = usersRepo.findByEmail(email);
            user.setStatus(true);
            usersRepo.save(user);


            return new ModelAndView("verificationDone");
        }

        else {
            return new ModelAndView("accountNotVerified");
        }


    }



}

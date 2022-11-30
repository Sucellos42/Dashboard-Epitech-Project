package Main.controllers;

import Main.modeles.UserServices;
import Main.modeles.UserWidgets;
import Main.modeles.Widgets;
import Main.repository.UserServicesRepository;
import Main.repository.UserWidgetsRepository;
import lombok.AllArgsConstructor;
import net.minidev.json.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.NameValuePair;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@AllArgsConstructor
@RequestMapping("/pokemon")
public class PokemonController {
    @Autowired
    private UserServicesRepository userServicesRepository;
    private UserWidgetsRepository userWidgetsRepository;

    @PostMapping(
            value = "/insertPokemon",
            //accept from the client
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            //accept to sent back to the client
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    @CrossOrigin
    public JSONObject insertServiceWidgetUser (@RequestBody JSONObject body, UserServices userServices, UserWidgets userWidgets, Widgets widgets) throws MalformedURLException, URISyntaxException {
        //insert service_user
        userServices.setService_id((int) body.get("service_id"));
        userServices.setUser_id((int) body.get("user_id"));
        System.out.println(userServices.getService_id());
        this.userServicesRepository.save(userServices);

        //insert widget
        widgets.setService_id((int) body.get("service_id"));

        String param = (String) body.get("param");

        //insert widget_user
        userWidgets.setParams(param);
        userWidgets.setUser_services_id(Math.toIntExact(userServices.getId_us()));
        userWidgets.setWidget_id((Integer) body.get("widget_id"));

        if (checkPokemonExists(param)) {
            this.userWidgetsRepository.save(userWidgets);
            return body;
        } else {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("status", "notok");
            return jsonObject;
        }
    }

    public static boolean checkPokemonExists(String name) throws MalformedURLException, URISyntaxException {
        URI uri = new URI("https://pokeapi.co/api/v2/pokemon/" + name);
        List<NameValuePair> param = new ArrayList<NameValuePair>();
        try {
            String result = makeAPICall(uri, param);
            System.out.println(result);
            return true;
        } catch (IOException e) {
            System.out.println("Error: cannont access content - " + e.toString());
            return false;
        } catch (URISyntaxException e) {
            System.out.println ("Error: Invalid URL " + e.toString());
            return false;
        } catch (Exception e) {
            System.out.println ("Error: " + e.toString());
            return false;
        }
    }


    public static String makeAPICall(URI uri, List<NameValuePair> parameters)
            throws Exception {
        String response_content = "";

        URIBuilder query = new URIBuilder(uri);
        query.addParameters(parameters);

        CloseableHttpClient client = HttpClients.createDefault();
        HttpGet request = new HttpGet(query.build());
        request.setHeader(HttpHeaders.ACCEPT, "application/json");
        try (CloseableHttpResponse response = client.execute(request)) {
            System.out.println(response.getStatusLine() + "hello");
            HttpEntity entity = response.getEntity();
            response_content = EntityUtils.toString(entity);
            EntityUtils.consume(entity);
        }
        System.out.println(response_content);
        if (Objects.equals(response_content, "Not Found")){
            throw new Exception("Pokemon doesn't exists");
        }
        return response_content;
    }
}

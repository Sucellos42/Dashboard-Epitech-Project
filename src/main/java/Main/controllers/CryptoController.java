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
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/crypto")
public class CryptoController {
    private UserServicesRepository userServicesRepository;
    private UserWidgetsRepository userWidgetsRepository;
    //accept to sent back to the client

    @GetMapping("/getLast")
    public static String getCryptoId() throws MalformedURLException, URISyntaxException {
        URI uri = new URI("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=50");
        String apiKey = "72e34aa7-295c-41aa-956d-494d4ae678d6";
        List<NameValuePair> param = new ArrayList<NameValuePair>();
      //  param.add(new BasicNameValuePair("symbol", "BTC"));
        try {
            String result = makeAPICall(uri, param);
            return result;
        } catch (IOException e) {
            System.out.println("Error: cannont access content - " + e.toString());
            return ("Error: cannont access content - " + e.toString());
        } catch (URISyntaxException e) {
            return ("Error: Invalid URL " + e.toString());
        }
    }

    @PostMapping("/apiCall")
    public static String makeAPICall(URI uri, List<NameValuePair> parameters)
            throws URISyntaxException, IOException {
        String response_content = "";

        URIBuilder query = new URIBuilder(uri);
        query.addParameters(parameters);

        CloseableHttpClient client = HttpClients.createDefault();
        HttpGet request = new HttpGet(query.build());

        request.setHeader(HttpHeaders.ACCEPT, "application/json");
        String apiKey = "72e34aa7-295c-41aa-956d-494d4ae678d6";
        request.addHeader("X-CMC_PRO_API_KEY", apiKey);

        try (CloseableHttpResponse response = client.execute(request)) {
//            System.out.println(response.getStatusLine());
            HttpEntity entity = response.getEntity();
            response_content = EntityUtils.toString(entity);
            EntityUtils.consume(entity);
        }
        System.out.println(response_content);
        return response_content;
    }

    @PostMapping(
            value = "/insertCrypto",
            //accept from the client
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            //accept to sent back to the client
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    @CrossOrigin
    public JSONObject insertServiceWidgetUser(@RequestBody JSONObject body, UserServices userServices, UserWidgets userWidgets, Widgets widgets) {
        //insert service_user
        userServices.setService_id((int) body.get("service_id"));
        userServices.setUser_id((int) body.get("user_id"));
        System.out.println(userServices.getService_id() + " test");
        this.userServicesRepository.save(userServices);

        //insert widget
        widgets.setService_id((int) body.get("service_id"));

        //insert widget_user
        userWidgets.setParams((String) body.get("param"));
        userWidgets.setUser_services_id(Math.toIntExact(userServices.getId_us()));
        userWidgets.setWidget_id((Integer) body.get("widget_id"));
        this.userWidgetsRepository.save(userWidgets);
        return body;
        //Instantiate new model and append json to the model
        // serviceUserServices.create(model);
    }
}


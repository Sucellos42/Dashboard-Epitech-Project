export const meteo = async ()=>{
    let city = $(".city").val();
    const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=f4dd4bc486ec1bd5be709498385b6cd0&lang=fr`)
    .then(res=>res.json())
    .then(res=>res)
    console.log(data)
    $(".modal").hide()
    for (const modal of $(".modal")) {
        modal.style.display = "none"
    }
    let element = (`
        <div class="card widget-card m-2" style="width: 18rem;">   
            <div class="card-body">      
                <h4 class="card-title text-center d-flex align-items-center flex-column">
                    Meteo
                </h4>
                <div class="d-flex justify-content-center flex-column align-items-center">
                    <h4 class="temp">${Math.round(data.list[0].main.temp)}°  ${data.city.name}</h4>
                    <div class="image-temp"><img src="http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png" /></div>
                    <div class="desc">${data.list[0].weather[0].description}</div>
                    <div class="min-max"><span class="min">Min ${Math.round(data.list[0].main.temp_min)}°</span> <span class="max">Max ${Math.round(data.list[0].main.temp_max+5)}°</span></div>
                </div>
            </div>
        </div>
    `)
return element;
}
export const gmail = async ()=>{
    $('.main').append(`
    <div class="card widget-card m-2" style="width: 18rem;">   
          <div class="card-body">      
            <h4 class="card-title text-center d-flex align-items-center flex-column">
                gmail
            </h4>
            <div class="d-flex justify-content-center flex-column align-items-center content">
            </div>
          </div>
    </div>
`)
console.log($(".authorize_button"))

const CLIENT_ID = '601087714164-g1ggj71tudtavhl9uvh8u2k4u9ou9kok.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBxsEhSvO8jqtpLJUrIxsxIKsAhzaOstpU';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;

    function gapiLoaded() {
        gapi.load('client', initializeGapiClient);
      }
      
      /**
       * Callback after the API client is loaded. Loads the
       * discovery doc to initialize the API.
       */
      async function initializeGapiClient() {
        await gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        maybeEnableButtons();
      }
      
      /**
       * Callback after Google Identity Services are loaded.
       */
      function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: '', // defined later
        });
        gisInited = true;
        maybeEnableButtons();
      }
      
      /**
       * Enables user interaction after all libraries are loaded.
       */
      function maybeEnableButtons() {
        if (gapiInited && gisInited) {
          document.querySelector('.authorize_button').style.visibility = 'visible';
        }
      }

      
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    console.log(resp)
    if (resp.error !== undefined) {
      throw (resp);
    }
    // document.getElementById('signout_button').style.visibility = 'visible';
   document.querySelector('.authorize_button').innerText = 'Refresh';
    await listLabels();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});
  }
}
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
      document.querySelector('.content').innerText = '';
      document.querySelector('.authorize_button').innerText = 'Authorize';
    //   document.getElementById('signout_button').style.visibility = 'hidden';
    }
  }
  async function listLabels() {
    let response;
    try {
      response = await gapi.client.gmail.users.labels.list({
        'userId': 'me',
      });
     let resp = await gapi.client.gmail.users.labels
    console.log(resp)
    let test =  gapi.client.gmail.users.messages.list({
      'userId':'dipocky@gmail.com',
      'labelIds':"UNREAD"
     })
     test.execute(res=>console.log(res))
     
    } catch (err) {
      document.querySelector('.content').innerText = err.message;
      return;
    }
    const labels = response.result.labels;
    if (!labels || labels.length == 0) {
      document.querySelector('.content').innerText = 'No labels found.';
      return;
    }
    // Flatten to string to display
    const output = labels.reduce(
        (str, label) => `${str}${label.name}\n`,
        'Labels:\n');
    document.querySelector('.content').innerText = output;
  }
$(".authorize_button").on("click",handleAuthClick)
}




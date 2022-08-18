import { create } from "apisauce";

const proxyAPI = create({
    baseURL: "https://gcc.oceantg.com"
  });

//N.B. Expo might complain about potential unhandled promise rejections, BUT apisauce uses an OK flag rather than rejections, so Expo should shut up
export default function OLPLogin(company, username, password) {
    //TODO: Sanitise input...

    return getBaseURL(company)
      .then(({ok, problem, baseURL}) => {

        if (!ok) {
          throw problem;
        }

        let oceanApi = create({
          baseURL: baseURL
        });

        return getSessionToken(oceanApi, company, username, password)
          .then(({ok, problem, sessionToken}) => {

            if (!ok) {
              throw problem;
            }

            let userLoginParams = {customer: company, userId: username};

            return Promise.all([
              getUserAccountInfo(oceanApi, username, sessionToken),
              getConfigData(oceanApi, sessionToken)
            ])
            .then(responses => {

              for (i in responses) {
                if (!responses[i].ok) {
                  throw responses[i].problem;
                }
              }

              let userAccountInfo = responses[0].accountInfo;
              let configData = responses[1].configData;

              console.log("BaseURL===>",baseURL)

              let sessionData = {
                baseURL: baseURL,
                USER_LOGIN_PARAMS: JSON.stringify(userLoginParams),
                SESSION_TOKEN: JSON.stringify(sessionToken),
                USER_ACCOUNT_INFO: JSON.stringify(userAccountInfo),
                ENVIRONMENT_CONFIGURATION: JSON.stringify(configData)
              };
              return {success: true, sessionData: sessionData};
            }).catch(problem => {
              return {success: false, problem: problem};
            });;
          }).catch(problem => {
            return {success: false, problem: problem};
          });;
      }).catch(problem => {
        return {success: false, problem: problem};
      });
  }

  function getBaseURL(company) {
    let parameters = {customer: company};
    return proxyAPI.get("/gccdashboard/Proxy/GetCustomerSiteDetails", parameters)
                    .then(response => {
                      return {
                        ok: response.ok, 
                        problem: response.problem,
                        baseURL: response.data.BaseUrl};
                      });
  }

  function getSessionToken(oceanApi, company, username, password) {
    let parameters = {
      customer: company,
      userId: username,
      password: password
    };
    return oceanApi.post("/OLP/api/ocean/v1/proxy/Session/Authentication", parameters)
                    .then(response => {
                      return {
                        ok: response.ok, 
                        problem: response.problem,
                        sessionToken: response.data.sessionToken};
                      });
  }

  function getUserAccountInfo(oceanApi, username, sessionToken) {
    let parameters = {id: username};
    let sessionTokenHeader = {"Ocean-SessionToken": sessionToken};
    return oceanApi.get("/OLP/api/ocean/v1/Accounts/GetAccount", parameters, {headers: sessionTokenHeader})
                    .then(response => {
                      return {
                        ok: response.ok, 
                        problem: response.problem,
                        accountInfo: response.data};
                      });
  }
  
  function getConfigData(oceanApi, sessionToken) {
    let sessionTokenHeader = {"Ocean-SessionToken": sessionToken};
    return oceanApi.get("/OLP/api/ocean/v1/proxy/environment/configuration", undefined, {headers: sessionTokenHeader})//Same
                    .then(response => {
                      return {
                        ok: response.ok, 
                        problem: response.problem,
                        configData: response.data};
                      });
  }
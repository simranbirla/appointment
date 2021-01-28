import React, { useState, useEffect } from "react";
import Calender from "./Calender";

const App = () => {
  const [user, setUser] = useState({ sign: false, id: "" });
  const [calender, setCalender] = useState();
  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "662147411883-2e0307k09k6ni4do0456krvgc9vdqbtg.apps.googleusercontent.com",
          apiKey: "AIzaSyAnDzg9tQdrNSziD6aipQ6XXYU_VDyFL_k",
          scope:
            "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          onAuthChange(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });
    return () => {
      setUser({ sign: false, id: "" });
      setCalender();
    };
  }, []);

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      setUser({
        sign: true,
        id: window.gapi.auth2.getAuthInstance().currentUser.get().getId(),
      });
    } else {
      setUser({ sign: false, id: "" });
    }
  };

  const getList = (id) => {
    window.gapi.client.calendar.calendars
      .get({
        calendarId: id,
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
          setCalender(response.result);
        },
        function (err) {
          alert("Execute error", err);
        }
      );
  };

  const signIn = () => {
    window.gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        window.gapi.client.setApiKey("AIzaSyAnDzg9tQdrNSziD6aipQ6XXYU_VDyFL_k");
        window.gapi.client
          .load(
            "https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest"
          )
          .then(() => {
            getList(
              window.gapi.auth2
                .getAuthInstance()
                .currentUser.get()
                .getBasicProfile()
                .getEmail()
            );
          });
      });
  };

  const signOut = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };
  return (
    <div className="ui container" style={{ margin: "1em", padding: "1em" }}>
      {!user.sign ? (
        <div style={{ textAlign: "center" }} className="ui container">
          <button
            onClick={() => signIn()}
            className="ui google plus button"
            style={{
              width: "300px",
              margin: "2em auto",
              padding: "2em",
              textAlign: "center",
            }}
          >
            <i class="google plus icon"></i>Sign in
          </button>
        </div>
      ) : (
        <div className="ui container">
          <button onClick={() => signOut()} className="ui blue button">
            SignOut
          </button>
          {calender ? <Calender cal={calender} /> : false}
        </div>
      )}
    </div>
  );
};

export default App;

import React, { useState } from "react";
import Events from "./Events";

const Calender = ({ cal }) => {
  const [events, setEvents] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [des, setDes] = useState();

  const showEvents = (id) => {
    window.gapi.client.calendar.events
      .list({
        calendarId: id,
        timeMin: "2020-10-12T07:20:50.52Z",
      })
      .then(
        function (response) {
          console.log("Response", response.result);
          setEvents(response.result.items);
        },
        function (err) {
          alert("Execute error", err);
        }
      );
  };

  const addEvent = (id, start, end, e, des) => {
    e.preventDefault();
    window.gapi.client.calendar.events
      .insert({
        calendarId: "ssbirla01@gmail.com",
        resource: {
          end: {
            dateTime: end,
          },
          start: {
            dateTime: start,
          },
          description: des,
        },
      })
      .then(
        function (response) {
          alert("appointmnet added");
        },
        function (err) {
          alert("Execute error", err);
        }
      );
  };

  const onChangeDate = (e, time) => {
    if (time === "start") {
      setStart(e + "T00:00:00+05:30");
    } else {
      setEnd(e + "T00:00:00+05:30");
    }
  };

  return (
    <div className="ui container">
      <h2 className="ui header">{cal.id}</h2>
      <div className="ui container">{cal.summary}</div>
      <h3 className="ui header">{cal.timeZone}</h3>

      <button
        className="ui blue button"
        onClick={() =>
          showEvents(
            window.gapi.auth2
              .getAuthInstance()
              .currentUser.get()
              .getBasicProfile()
              .getEmail()
          )
        }
      >
        Show Events
      </button>
      <form
        className="ui form"
        onSubmit={(e) =>
          addEvent(
            window.gapi.auth2
              .getAuthInstance()
              .currentUser.get()
              .getBasicProfile()
              .getEmail(),
            start,
            end,
            e,
            des
          )
        }
      >
        <div className="ui field">
          <label>
            Start date
            <input
              type="date"
              className="ui fluid icon input"
              min={
                new Date().getUTCFullYear +
                new Date().getUTCMonth() +
                new Date().getUTCDate()
              }
              onChange={(e) => {
                onChangeDate(e.target.value, "start");
              }}
              required
            />
          </label>
        </div>

        <div className="ui field">
          <label>
            End Date
            <input
              className="ui fluid icon input"
              type="date"
              min={
                new Date().getUTCFullYear +
                new Date().getUTCMonth() +
                new Date().getUTCDate()
              }
              onChange={(e) => {
                onChangeDate(e.target.value, "end");
              }}
              required
            />
          </label>
        </div>

        <div className="ui field">
          <input
            type="text"
            placeholder="Enter description"
            onChange={(e) => setDes(e.target.value)}
            className="ui fluid icon input"
          />
        </div>
        <button className="ui green button">Add an event</button>
      </form>

      {events ? <Events events={events} /> : null}
    </div>
  );
};

export default Calender;

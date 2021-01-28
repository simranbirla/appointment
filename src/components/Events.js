import React from "react";

const Events = ({ events }) => {
  return (
    <div className="ui container">
      {events.map((event) => (
        <div className="ui feed">
          <div className="ui event">
            <div className="ui summary">
              Created by{" "}
              <a href={`mailto:${event.creator.email}`}>
                {event.creator.email}
              </a>
            </div>
            <div>
              <p>
                From {"  "}
                {event.start.dateTime}
                {"  "} to{"  "} {event.end.dateTime}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;

import {
  add,
  formatDistanceStrict,
  lightFormat,
  parseISO,
  sub
} from "date-fns";
import { pipe } from "ramda";
import { useCallback, useState } from "react";
import ICalendarLink from "react-icalendar-link";
import "./styles.css";

const milestones = [
  { duration: { months: 6 }, unit: "month" },
  { duration: { days: 100 }, unit: "day" },
  { duration: { months: 3 }, unit: "month" },
  { duration: { days: 60 }, unit: "day" },
  { duration: { days: 45 }, unit: "day" },
  { duration: { days: 30 }, unit: "day" },
  { duration: { days: 14 }, unit: "day" }
];
const postMilestones = [
  { duration: { days: 14 }, unit: "day" },
  { duration: { months: 2 }, unit: "month" },
  { duration: { years: 1 }, unit: "year" }
];

const createEvent = ({ name, eventDate, milestoneDate, unit, isPost }) => {
  const timeDistance = formatDistanceStrict(eventDate, milestoneDate, { unit, roundingMethod: "floor" });

  return {
    title: `${name} ${timeDistance} ${isPost ? "post" : ""}`,
    description: "",
    startTime: milestoneDate,
    endTime: milestoneDate,
    location: ""
  };
};

const Event = ({ name, eventDate, milestoneDate, unit, isPost }) => {
  return (
    <>
      <h2>
        {name} {formatDistanceStrict(eventDate, milestoneDate, { unit, roundingMethod: "floor" })}{" "}
        {isPost && "post"} {lightFormat(milestoneDate, "MM-dd-yyyy")}
      </h2>
      <ICalendarLink
        event={createEvent({
          name,
          eventDate: eventDate,
          milestoneDate: milestoneDate,
          unit,
          isPost
        })}
      >
        Add to Calendar
      </ICalendarLink>
    </>
  );
};

export default function App() {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");

  const onDayChange = useCallback(
    (event) => {
      pipe(parseISO, setDate)(event.target.value);
    },
    [setDate]
  );

  const onNameChange = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  return (
    <div className="App">
      <h1>Today is {lightFormat(Date.now(), "MM-dd-yyyy")}</h1>
      <h2>Select a date to get your milestones</h2>
      <div>
        <label>
          Client Name:
          <input type="text" onChange={onNameChange} />
        </label>
      </div>
      <div>
        <label>
          Event Date:
          <input type="date" onChange={onDayChange} />
        </label>
      </div>
      {date &&
        milestones.map(({ duration, unit }) => (
          <Event
            id={name}
            name={name}
            eventDate={date}
            milestoneDate={sub(date, duration)}
            unit={unit}
          />
        ))}
      {date &&
        postMilestones.map(({ duration, unit }) => (
          <Event
            id={name}
            name={name}
            eventDate={date}
            milestoneDate={add(date, duration)}
            unit={unit}
            isPost
          />
        ))}
    </div>
  );
}

import {
  add,
  formatDistanceStrict,
  lightFormat,
  parseISO,
  sub
} from "date-fns";
import { pipe } from "ramda";
import { useCallback, useState } from "react";
import "./styles.css";
import { Event } from "./Event";

const MILESTONE_DATES = [
  { duration: { months: 6 }, unit: "month" },
  { duration: { days: 100 }, unit: "day" },
  { duration: { months: 3 }, unit: "month" },
  { duration: { days: 60 }, unit: "day" },
  { duration: { days: 45 }, unit: "day" },
  { duration: { days: 30 }, unit: "day" },
  { duration: { days: 14 }, unit: "day" }
];

const FOLLOW_UP_MILESTONE_DATES = [
  { duration: { days: 14 }, unit: "day" },
  { duration: { months: 2 }, unit: "month" },
  { duration: { years: 1 }, unit: "year" }
];

export default function App() {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [daysFromToday, setDaysFromToday] = useState("");

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

  const onDaysFromTodayChange = useCallback(
    (event) => {
      setDaysFromToday(event.target.value);
    },
    [setDaysFromToday]
  );

  return (
    <div className="App">
      <h1>Today is {lightFormat(Date.now(), "MM-dd-yyyy")}</h1>
      <section>
        <h2>Wedding Milestone Calendar Reminder Maker</h2>
        <div>
          <label>
            Client Name:
            <input type="text" onChange={onNameChange} defaultValue={name} />
          </label>
        </div>
        <div>
          <label>
            Event Date:
            <input type="date" onChange={onDayChange} />
          </label>
        </div>
        {date &&
          <>
            <h3>Pre Wedding Milestones</h3>
            {MILESTONE_DATES.map(({ duration, unit }) => (
              <Event
                id={name}
                name={name}
                eventDate={date}
                milestoneDate={sub(date, duration)}
                unit={unit}
              />
            ))}
          </>}
        {date &&
          <>
            <h3>Post Wedding Milestones</h3>
            {FOLLOW_UP_MILESTONE_DATES.map(({ duration, unit }) => (
              <Event
                id={name}
                name={name}
                eventDate={date}
                milestoneDate={add(date, duration)}
                unit={unit}
                isPost
              />
            ))}
          </>}
      </section>
      <section>
        <h2>Calendar Day(s) From Today Event Maker</h2>
        <div>
          <label>
            Client Name:
            <input type="text" onChange={onNameChange} defaultValue={name} />
          </label>
        </div>
        <div>
          <label>
            How many days from today?:
            <input type="number" onChange={onDaysFromTodayChange} />
          </label>
        </div>
        {
          daysFromToday &&
          <Event
            name={name}
            eventDate={Date.now()}
            milestoneDate={add(Date.now(), { days: daysFromToday })}
            unit="day"
          />
        }
      </section>
    </div>
  );
}

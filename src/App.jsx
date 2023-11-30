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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    <div className="App w-[700px] mx-auto">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-12">Hello! Today's date is {lightFormat(Date.now(), "MM/dd/yyyy")}</h1>
      <Tabs defaultValue="milestone" className="w-[800px]">
        <TabsList>
          <TabsTrigger value="milestone">Milestone Reminder Maker</TabsTrigger>
          <TabsTrigger value="days-from">Days From Reminder Maker</TabsTrigger>
        </TabsList>
        <TabsContent value="milestone">
          <section className="content-center">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Wedding Milestone Calendar Reminder Maker</CardTitle>
                <CardDescription>Enter the couples name and the day of the event and like the magic happen.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="name">
                    Client Name:
                  </Label>
                  <Input id="name" type="text" placeholder="Baby Bear & Tendi" onChange={onNameChange} defaultValue={name} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="date">
                    Event Date:
                  </Label>
                  <Input id="date" type="date" onChange={onDayChange} />
                </div>
              </CardContent>
            </Card>
            <div className="flex">
              {date &&
                <Card className="w-[350px] mt-2 flex-1">
                  <CardHeader>
                    <CardTitle>Pre Wedding Milestones</CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent>
                    {MILESTONE_DATES.map(({ duration, unit }) => (
                      <Event
                        id={name}
                        name={name}
                        eventDate={date}
                        milestoneDate={sub(date, duration)}
                        unit={unit}
                      />
                    ))}
                  </CardContent>
                </Card>
              }
              {date &&
                <Card className="w-[350px] mt-2 flex-1 ml-4">
                  <CardHeader>
                    <CardTitle>Post Wedding Milestones</CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                </Card>
              }
            </div>
          </section>
        </TabsContent>
        <TabsContent value="days-from">
          <section>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Calendar Day(s) From Today Event Maker</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="name-2">
                    Client Name:
                  </Label>
                  <Input id="name-2" type="text" onChange={onNameChange} defaultValue={name} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="days-from">
                    How many days from today?:
                  </Label>
                  <Input id="days-from" type="number" onChange={onDaysFromTodayChange} />
                </div>
              </CardContent>
            </Card>
            {daysFromToday &&
              <Card className="w-[350px] mt-2">
                <CardHeader>
                </CardHeader>
                <CardContent>
                  <Event
                    name={name}
                    eventDate={Date.now()}
                    milestoneDate={add(Date.now(), { days: daysFromToday })}
                    unit="day"
                  />
                </CardContent>
              </Card>
            }
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}

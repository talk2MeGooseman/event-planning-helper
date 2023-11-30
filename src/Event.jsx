import {
  formatDistanceStrict,
  lightFormat
} from "date-fns";
import ICalendarLink from "react-icalendar-link";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const createEvent = ({ name, eventDate, milestoneDate, unit, isPost }) => {
  const timeDistance = formatDistanceStrict(eventDate, milestoneDate, { unit, roundingMethod: "floor" });

  return {
    title: `${name} ${timeDistance} ${isPost ? "post" : ""}`,
    description: "",
    startTime: milestoneDate,
    endTime: milestoneDate,
    location: ""
  };
};

/**
 * Event component that generates a iCal file for the milestone based on the event date and unit
 *
 * @param {{
 *  name: string;
 *  eventDate: Date;
 *  milestoneDate: number;
 *  unit: "second" | "minute" | "hour" | "day" | "month" | "year";
 *  isPost: boolean;
 * }} props
 * @returns
 */
export const Event = ({ name, eventDate, milestoneDate, unit, isPost }) => {
  return (
    <>
      <h4 className="scroll-m-20 text-m font-semibold tracking-tight mb-2">
        {name} {formatDistanceStrict(eventDate, milestoneDate, { unit, roundingMethod: "floor" })} {isPost ? 'post' : 'away'}: {lightFormat(milestoneDate, "MM/dd/yyyy")}
      </h4>
      <Button asChild>
        <ICalendarLink
          className="text-sm font-medium transition-colors hover:text-primary"
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
      </Button>
      <Separator className="my-4" />
    </>
  );
};

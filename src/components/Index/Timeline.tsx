import { TimelineEvent } from "@/lib/types";

import Event from "./Event";

type TimelineProps = {
  timelineEvents: TimelineEvent[];
};

const Timeline = ({ timelineEvents }: TimelineProps) => (
  <div className="container mx-auto w-full h-full">
    <div className="relative wrap overflow-hidden h-full">
      <div className="absolute left-0 md:left-1/2 h-full border border-zinc-600/75 dark:border-zinc-400/75 dark-transition mx-3.5 md:mx-0" />
      <div className="space-y-8">
        {timelineEvents.map((event, idx) => (
          <Event
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            side={idx % 2 === 0 ? "L" : "R"}
            data={event}
          />
        ))}
      </div>
    </div>
  </div>
);

export default Timeline;

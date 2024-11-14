import { Await, defer, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export default function Events() {
  const { events } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(events) => <EventsList events={events} />}
      </Await>
    </Suspense>
  );
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events." };
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}

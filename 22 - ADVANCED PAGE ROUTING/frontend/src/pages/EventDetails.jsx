import { redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetails() {
  const data = useRouteLoaderData("event-detail");
  return (
    <>
      <EventItem event={data.event} />
    </>
  );
}

export async function loader({ request, params }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events." };
    throw new Response(
      JSON.stringify({ message: "Could not fetch event details." }),
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}

export async function action({ params, request }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events." };
    throw new Response(
      JSON.stringify({ message: "Could not fetch event details." }),
      {
        status: 500,
      }
    );
  }
  return redirect("/events");
}

import client from "./client";

export const getEvents = ({ eventName, summary, content, userID, date, address } = {}) =>
  client.get("events", {
    params: {
      eventName: eventName || undefined,
      summary: summary || undefined,
      content: content || undefined,
      userID: userID || undefined,
      date: date || undefined,
      address: address || undefined,
    },
  });

export const getEvent = (id) => client.get(`events/${id}`);

// Create, update and delete require a JWT (Student, ResidentAssistant, GreekLife or Admin).
export const createEvent = (event) => client.post("events", event);
export const updateEvent = (event) => client.put("events", event);
export const deleteEvent = (id) => client.delete(`events/${id}`);

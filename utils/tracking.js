const isRudderStackAvailable =
  typeof window !== "undefined" &&
  typeof window.rudderanalytics !== "undefined";

export const rudderStackTrack = (eventName, body) => {
  if (isRudderStackAvailable) {
    window.rudderanalytics.track(eventName, body);
  }
};

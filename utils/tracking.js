const isRudderstackAvailable = () =>
  typeof window !== "undefined" &&
  typeof window.rudderanalytics !== "undefined";

export const rudderstackTrack = (eventName, body) => {
  if (isRudderstackAvailable()) {
    window.rudderanalytics.track(eventName, body);
  }
};

import { NextResponse } from "next/server";
import Statsig from "statsig-node";
// import { EdgeConfigDataAdapter } from 'statsig-node-vercel'
import { environment } from "./constants";

// We'll use this to validate a random UUID
const IS_UUID = /^[0-9a-f-]+$/i;
// const dataAdapter = new EdgeConfigDataAdapter(process.env.EDGE_CONFIG_ITEM_KEY!)

export async function middleware(req, event) {
  // Get the user ID from the cookie or get a new one
  let userId = req.cookies.get(environment.UID_COOKIE)?.value;
  let hasUserId = !!userId;

  // If there's no active user ID in cookies or its value is invalid, get a new one
  if (!userId || !IS_UUID.test(userId)) {
    userId = crypto.randomUUID();
    hasUserId = false;
  }

  // eslint-disable-next-line no-undef
  await Statsig.initialize(environment.STATSIG_SERVER_API_KEY);

  const backgroundExperiment = await Statsig.getExperiment(
    { userID: userId },
    environment.EXPERIMENT
  );

  const background = backgroundExperiment.get("background", "white");

  console.log(background);

  // Clone the URL and change its pathname to point to a bucket
  const url = req.nextUrl.clone();
  // url.pathname = `/${background}`;

  // Response that'll rewrite to the selected bucket
  const res = NextResponse.rewrite(url);

  // Add the user ID to the response cookies if it's not there or if its value was invalid
  if (!hasUserId) {
    res.cookies.set(environment.UID_COOKIE, userId, {
      maxAge: 60 * 60 * 24, // identify users for 24 hours
    });
  }

  // Flush exposure logs to Statsig
  event.waitUntil(Statsig.flush());

  return res;
}

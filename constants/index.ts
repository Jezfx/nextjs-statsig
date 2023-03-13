export const environment = {
  UID_COOKIE: "uid",

  // This is the experiment that will be used to determine the bucket
  EXPERIMENT: "statsig_example",
  // Default Experiment Group Fallback
  GROUP_PARAM_FALLBACK: "error_default_bucket",

  STATSIG_SERVER_API_KEY: process.env["STATSIG_SERVER_API_KEY"],

  NEXT_PUBLIC_STATSIG_CLIENT_SDK_KEY:
    process.env["NEXT_PUBLIC_STATSIG_CLIENT_SDK_KEY"],
};

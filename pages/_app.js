import Script from "next/script";
import { StatsigProvider } from "statsig-react";
import Cookies from "js-cookie";

import { environment } from "../constants/";

function App({ Component, pageProps }) {
  // Middleware will automatically set a cookie for the user if they visit a page
  //   const userID = Cookies.get(UID_COOKIE)

  const userID = Cookies.get(environment.UID_COOKIE);

  console.log(Component);

  return (
    <StatsigProvider
      sdkKey={environment.NEXT_PUBLIC_STATSIG_CLIENT_SDK_KEY}
      waitForInitialization={false}
      user={{ userID }}
    >
      <Component {...pageProps} />

      <Script
        dangerouslySetInnerHTML={{
          __html: `
          function OptanonWrapper() {
            if (window.OneTrust.IsAlertBoxClosed()) {
              // Load the Rudderstack SDK
              rudderanalytics.load('${environment.rudderstackWriteKey}', '${environment.rudderstackDataPlaneUrl}', {
                // cookieConsentManager: {
                //   oneTrust: {
                //     enabled: true
                //   }
                // },
                //other options
              });
            }
          }
          `,
        }}
        id="OneTrust Callback"
        type="text/javascript"
      />
    </StatsigProvider>
  );
}

export default App;

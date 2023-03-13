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
          __html: `!function(){var e=window.rudderanalytics=window.rudderanalytics||[];e.methods=["load","page","track","identify","alias","group","ready","reset","getAnonymousId","setAnonymousId","getUserId","getUserTraits","getGroupId","getGroupTraits","startSession","endSession"],e.factory=function(t){return function(){e.push([t].concat(Array.prototype.slice.call(arguments)))}};for(var t=0;t<e.methods.length;t++){var r=e.methods[t];e[r]=e.factory(r)}e.loadJS=function(e,t){var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.rudderlabs.com/v1.1/rudder-analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a)},e.loadJS(),
          e.load("2My00CvLJWYjK3uCIy0Mb2xKqJ7","https://allplantssvg.dataplane.rudderstack.com"),
          e.page()}();`,
        }}
        type="text/javascript"
      />
    </StatsigProvider>
  );
}

export default App;

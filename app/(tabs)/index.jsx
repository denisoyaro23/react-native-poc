import React, { useRef, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import responseBody from '../../assets/response_body.json';

export default function HomeScreen() {
  const webRef = useRef(null);
  const [injectedJavaScript, setInjectedJavaScript] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [customUrl, setCustomUrl] = useState('')

  useEffect(() => {
    const fetchScript = async () => {
      try {
        console.log(`ResponseBody: ${JSON.stringify(responseBody)}`)
        const scriptContent = `
        ${responseBody.script}
        true; // note: this is required, or you'll sometimes get silent failures`;
        setInjectedJavaScript(scriptContent);
        // Regular expression to match 'OPTIMUS_WEB_URL=' followed by the value until a space or end of line
        const regex = /OPTIMUS_WEB_URL = ([^ \n]*)/;

        // Use the match method to extract the value
        const match = scriptContent.match(regex);

        if (match) {
          const optimusWebUrl = match[1]; // The value after 'OPTIMUS_WEB_URL='
          console.log("Extracted URL:", optimusWebUrl);
        } else {
          console.log("OPTIMUS_WEB_URL not found in the string");
        }
        setCustomUrl(responseBody.url)
        setLoading(false); // Set loading to false once script is loaded
      } catch (error) {
        console.error('Error fetching JavaScript file:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchScript();
  }, []);

  const onLoadHandler = ({ nativeEvent }) => {
    if(injectedJavaScript){
    webRef.current.injectJavaScript(injectedJavaScript);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Show loading indicator
      ) : (
        <WebView
          source={{ uri: customUrl }}
          ref={webRef}
          onMessage={(event) => {
            console.log(event.nativeEvent.data);
          }}
          onLoad={onLoadHandler}
          style={{ marginTop: 50, flex: 1 }} // Leave space at the top
          incognito={true}
          webviewDebuggingEnabled={true}
        />
      )}
    </View>
  );
}
import React, { useRef, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  const webRef = useRef(null);
  const [injectedJavaScript, setInjectedJavaScript] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [customUrl, setCustomUrl] = useState('')

  useEffect(() => {
    const fetchScript = async () => {
      try {
        // Replace this URL with the actual endpoint where your script is hosted
        const response = await fetch('https://api.dev.optimusapp.io/onboarding/v2/93434138-f8bd-4fc7-bf46-4a498b3efd4f/app-url?memberId=fbd9d123-3483-4b0c-91f6-17ad2fa9b89f&rewardProgramId=b3541f64-96af-4993-b1f7-a685e90eaeca&deviceType=IOS&deviceVersion=IOS-15.1',
        {
          method: 'GET',
          headers: {
            'X-Optimus-Authorization': `Bearer eyJraWQiOiI4V0ZMUVdSRTFBRVNINDgybXRIc2JnSWJIZ1wvc1JuQjdMTTJ5eTRRRk8yVT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3bzNkOWVwMzk2anZiM2l0NjZqMm41NGlpcSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3B0aW11c1wvYWRtaW4iLCJhdXRoX3RpbWUiOjE3MjQ4NDkxNDcsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xXzBTYnQ0TDU3YyIsImV4cCI6MTcyNDkzNTU0NywiaWF0IjoxNzI0ODQ5MTQ3LCJ2ZXJzaW9uIjoyLCJqdGkiOiI0Zjk0Yjg5OS0yMjExLTRlZTItOGExOS02NzFmOWM4MTM0MjAiLCJjbGllbnRfaWQiOiI3bzNkOWVwMzk2anZiM2l0NjZqMm41NGlpcSJ9.VzQt38n894Ryiy6KroABV_pEq-KAyPBlSR2Vaa97KZGU1-vKja0hlbN1Jh_4FZva-ESdbSNjA1uUUgyA09YgnggXxh5354YsNx0uLBvFMO-BExzrd8zDemn7CR5LiJWVYHDAKLmYLg5Kgi0ZNZMQMJxjIY8Ebdi-Dd841QfWfScZNB9w1_1dJhg-GYHrqrIRS6VBt5jQfsQD1ph4AWwB_qIL55qKgUN4VRGwG1hKHs81A0BsERKnPsZEaef-ukkXko-qKi7zE3vK3ttM_TwOGSvvcmz0G7RyXXFf5TbA9od3FL3gEMq8x-ksOgOABNVcCkJ8egDGJ39KDAiLpXomow`, // Add Bearer token here
            'Content-Type': 'application/json', // Adjust content type as needed
          },
        }
        );
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const responseBody = await response.json();
        const scriptContent = `
        ${responseBody.script}
        true; // note: this is required, or you'll sometimes get silent failures`;
        setInjectedJavaScript(scriptContent);
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
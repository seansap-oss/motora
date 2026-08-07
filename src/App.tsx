import { useEffect, useState } from "react";
import { MobileRuntime } from "./mobile";
import { MobileDeviceProvider } from "./mobile/Device";
import { KeyboardProvider } from "./mobile/Keyboard";
import Prototype from "./Prototype";

export default function App() {
  const [webLayout, setWebLayout] = useState(() => window.matchMedia("(min-width: 740px)").matches);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 740px)");
    const update = () => setWebLayout(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (webLayout) {
    return (
      <MobileDeviceProvider>
        <KeyboardProvider>
          <div className="motora-web-runtime"><Prototype web /></div>
        </KeyboardProvider>
      </MobileDeviceProvider>
    );
  }

  return (
    <MobileRuntime>
      <Prototype />
    </MobileRuntime>
  );
}

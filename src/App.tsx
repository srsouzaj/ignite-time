import { Button } from "./components/Button";

import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./components/styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary" />;
    </ThemeProvider>
  );
}

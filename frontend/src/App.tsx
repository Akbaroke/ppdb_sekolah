import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import AppShell from "./layouts/AppShell";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Router />
      </AppShell>
    </BrowserRouter>
  );
}

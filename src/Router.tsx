import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";

function Router() {
  return (
    <BrowserRouter basename="react-dnd">
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

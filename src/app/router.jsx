
import { Route, Switch } from "react-router-dom";
import Chat from "../pages/chat/Chat";
import { WebsocketProvider } from "./contexts/Websocket";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Router = () => {

    return (
        <WebsocketProvider>
            <Switch>
                <Route path="/chat/:type/:roomId">
                    <Chat />
                </Route>
                <Route path="/chat/:roomId">
                    <Chat />
                </Route>

                <Route path="/">
                    <Redirect to="/chat/general" />
                </Route>
            </Switch>
        </WebsocketProvider >
    );
}


export default Router;





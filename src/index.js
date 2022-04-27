import "./index.css"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import * as serviceWorker from "./serviceWorker"
import { ConnectedRouter } from "connected-react-router"
import { PersistGate } from "redux-persist/integration/react"
import { Route, Switch } from "react-router-dom"
import ReactGA from 'react-ga'
import { GA_SITE_TAG, FB_SITE_TAG } from "./config/environment"
import ReactPixel from 'react-facebook-pixel'

ReactPixel.init(FB_SITE_TAG)
ReactPixel.pageView()

ReactGA.initialize(GA_SITE_TAG)
ReactGA.pageview(window.location.pathname + window.location.search)

import {
  Home,
  Discoveries,
  Start,
  Launch,
  Status,
  Complete,
  List,
  Guide,
  PrivacyPolicy,
  Discovery,
  NotFound,
  Settings,
  Blog,
  Article
} from "./views"

import { store, history, persistor } from "./redux/store"
import { Footer } from "./components"

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/expeditions" component={List} />
            <Route path="/discoveries" component={Discoveries} />
            <Route path="/d/:id" component={Discovery} />
            <Route path="/guide" component={Guide} />
            <Route path="/settings" component={Settings} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/expedition/start" component={Start} />
            <Route path="/expedition/launch" component={Launch} />
            <Route path="/expedition/status" component={Status} />
            <Route path="/expedition/complete" component={Complete} />
            <Route path="/blog" component={Blog} />
            <Route component={Home}/>
          </Switch>
          <Footer />  
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  )
}

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById("root")
)

serviceWorker.unregister()

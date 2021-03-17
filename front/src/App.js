import "./App.css";
import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTop from "./components/Navbar";
import Home from "./components/Home";
import PrivateRoute from "./PrivateRoute";
import Profile from "./components/Profile";
import Signin from "./components/SignIn";
import Connexion from "./components/Connexion";
import PostDeal from "./components/PostDeal";
import PostDiscussion from "./components/PostDiscussion";
import { loadUser } from "./actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import Discussions from "./components/Discussions";
import BonPlans from "./components/BonPlans";
import FeedBack from "./components/FeedBack";
import PostedDeals from "./components/PostedDeals";
import PostedDiscussions from "./components/PostedDiscussions";
import DealPageModel from "./components/DealPageModel";
import DiscussionPageModel from "./components/DiscussionPageModel";
import UserProfile from "./components/UserProfile";
import HightTech from "./components/HighTech";
import Voyages from "./components/Voyages";
import Cosmétiques from "./components/Cosmétiques";
import Consoles from "./components/Consoles";
import ConsolesDiscussion from "./components/ConsolesDiscussion";
import VoyagesDiscussion from "./components/VoyagesDiscussion";
import CosmétiquesDiscussion from "./components/CosmétiquesDiscussion";
import HightTechDiscussion from "./components/HightTechDiscussion";
import Footer from "./components/Footer";
import Jumia from "./components/Jumia";
import ScoopInformatique from "./components/ScoopInformatique";
import MyTek from "./components/MyTek";
import Carrefour from "./components/Carrefour";
import TahaVoyages from "./components/TahaVoyages";
import Search from "./components/Search";
import { getNotifications } from "./actions/notificationsActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadUser());
    }
  }, [localStorage.getItem("token")]);
  return (
    <Router>
      <NavbarTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path={`/user/:id`} component={UserProfile} />
        <Route exact path={`/bon-plans/:id`} component={DealPageModel} />
        <Route
          exact
          path={`/discussions/:id`}
          component={DiscussionPageModel}
        />

        <Route exact path="/signin" component={Signin} />
        <Route exact path="/discussions" component={Discussions} />
        <Route exact path="/bon-plans" component={BonPlans} />
        <Route exact path="/groupes/Hight-Tech" component={HightTech} />
        <Route exact path="/groupes/Voyages" component={Voyages} />
        <Route exact path="/groupes/Cosmétiques" component={Cosmétiques} />
        <Route exact path="/groupes/Consoles" component={Consoles} />
        <Route exact path="/marchands/jumia" component={Jumia} />
        <Route exact path="/marchands/my-tek" component={MyTek} />
        <Route exact path="/marchands/carrefour" component={Carrefour} />
        <Route exact path="/marchands/taha-voyages" component={TahaVoyages} />
        <Route exact path="/search" component={Search} />
        <Route
          exact
          path="/marchands/scoop-informatique"
          component={ScoopInformatique}
        />
        <Route
          exact
          path="/groupes-discussions/Consoles"
          component={ConsolesDiscussion}
        />
        <Route
          exact
          path="/groupes-discussions/Voyages"
          component={VoyagesDiscussion}
        />
        <Route
          exact
          path="/groupes-discussions/Cosmétiques"
          component={CosmétiquesDiscussion}
        />
        <Route
          exact
          path="/groupes-discussions/Hight-Tech"
          component={HightTechDiscussion}
        />
        <Route exact path="/connexion" component={Connexion} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/profile/mes-deals" component={PostedDeals} />
        <PrivateRoute
          exact
          path="/profile/mes-discussions"
          component={PostedDiscussions}
        />
        <PrivateRoute exact path="/post-deal" component={PostDeal} />
        <PrivateRoute exact path="/feed-back" component={FeedBack} />
        <PrivateRoute
          exact
          path="/post-discussion"
          component={PostDiscussion}
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

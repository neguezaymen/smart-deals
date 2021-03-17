import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useEffect, useState } from "react";
import logonav from "../res/logo-nav.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import Avatar from "@material-ui/core/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import NotifyMe from "react-notification-timeline";

import IconButton from "@material-ui/core/IconButton";
import { loadUser, logoutUser } from "../actions/authActions";
import logout from "../res/logout.png";
import FeedBack from "./FeedBack";
import { getSearch } from "../actions/getSearchActions";
import Badge from "@material-ui/core/Badge";
import { getNotifications } from "../actions/notificationsActions";

const NavbarTop = () => {
  const auth = useSelector((state) => state.AuthReducer);
  const attt = auth.notifications;
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.isAuth) {
      dispatch(loadUser());
    }
  }, [auth.isAuth]);
  let nots = useSelector((state) => state.notificationsReducer);
  let data = nots.notifications.reverse();

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  let history = useHistory();

  const PSrc = useSelector((state) => state.pictureReducer);
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = () => {
    dispatch(getSearch(search));
    setSearch("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(getSearch(search));
      setSearch("");
      history.push("/search");
    }
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="custom" className="nav-bar" fixed="top">
        <Link to="/">
          <Navbar.Brand>
            <div className="logo">
              <img src={logonav} alt="logo" style={{ color: "white" }} />
              <div className="logo-title">
                <span className="span-a">S</span>mart{" "}
                <span className="span-d">D</span>eals
              </div>
            </div>
          </Navbar.Brand>
        </Link>

        <div style={{ display: "flex" }}>
          <div className="notifications-phone">
            <NotifyMe
              data={data}
              storageKey="notific_key"
              notific_key="timestamp"
              notific_value="update"
              heading="Notifications"
              sortedByKey={true}
              showDate={true}
              size={22}
              color="#03A5C1"
            />
          </div>
          <Link to="/profile" className="avatar-phone">
            <Avatar
              alt="avatar"
              src={auth.user && auth.user.avatar}
              style={{ marginRight: "5px", marginLeft: "7px" }}
            />
          </Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </div>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto bd  ">
            <Link to="/bon-plans" className="bd ">
              Bon plans
            </Link>
            <Link to="/discussions" className="bd ">
              Discussions
            </Link>

            <NavDropdown
              // variant="secondary"
              title="Menu"
              id="collasible-nav-dropdown"
              className="bd "
            >
              <Link to="/groupes" className=" dropdown-item">
                <NavDropdown.Item href="/groupes">
                  Tous les Groupes ▶
                </NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />
              <Link to="/groupes/Hight-Tech" className=" dropdown-item">
                <NavDropdown.Item href="/groupes/Hight-Tech">
                  Hight-Tech
                </NavDropdown.Item>
              </Link>
              <Link to="/groupes/Cosmétiques" className=" dropdown-item">
                <NavDropdown.Item href="/groupes/Cosmétiques">
                  Santé & Cosmétiques
                </NavDropdown.Item>
              </Link>
              <Link to="/groupes/Consoles" className=" dropdown-item">
                <NavDropdown.Item href="/groupes/Consoles">
                  Consoles & Jeux vidéo
                </NavDropdown.Item>
              </Link>
              <Link to="/groupes/Voyages" className=" dropdown-item">
                <NavDropdown.Item href="/groupes/Voyages">
                  Voyages
                </NavDropdown.Item>
              </Link>
              <NavDropdown.Item></NavDropdown.Item>
              <NavDropdown.Item></NavDropdown.Item>
              <Link to="marchands" className=" dropdown-item">
                <NavDropdown.Item href="/marchands">
                  Tous les marchands ▶
                </NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />
              <Link to="/marchands/jumia" className=" dropdown-item">
                <NavDropdown.Item href="/marchands/Jumia">
                  Jumia
                </NavDropdown.Item>
              </Link>
              <Link
                to="/marchands/scoop-informatique"
                className=" dropdown-item"
              >
                <NavDropdown.Item href="/marchands/scoopinformatique">
                  Scoop Informatique
                </NavDropdown.Item>
              </Link>
              <Link to="/marchands/my-tek" className=" dropdown-item">
                <NavDropdown.Item href="/marchands/mytek">
                  MyTek
                </NavDropdown.Item>
              </Link>
              <Link to="/marchands/carrefour" className=" dropdown-item">
                <NavDropdown.Item href="/marchands/carrefour">
                  Carrefour
                </NavDropdown.Item>
              </Link>
              <Link to="/marchands/taha-voyages" className=" dropdown-item">
                <NavDropdown.Item href="/marchands/tahavoyages">
                  Taha Voyages
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>

          <form className="form-inline d-flex justify-content-center md-form form-sm mt-0 search-btn">
            <Link to="/search">
              <i
                className="fas fa-search"
                aria-hidden="true"
                style={{ color: "white" }}
                onClick={handleSearch}
              ></i>
            </Link>

            <input
              className="form-control form-control-sm ml-3 w-75 search-phone"
              type="text"
              onChange={handleChange}
              placeholder="Chercher"
              aria-label="Search"
              value={search}
              onKeyPress={handleKeyDown}
            />
          </form>
          <div className="cnx-post">
            {auth.isAuth || localStorage.getItem("token") ? (
              <>
                <div
                  style={{
                    color: "white",
                    padding: "0 10px",
                    fontSize: "26px",
                    fontFamily: "Arizonia, cursive",
                  }}
                >
                  {auth.user && "Bonjour  " + auth.user.pseudo}
                </div>
                {/* <Badge
                  badgeContent={0}
                  color="primary"
                  style={{ marginRight: "10px" }}
                >
                  <i
                    style={{
                      fontSize: "25px",
                      color: "#03A5C1",
                      paddingRight: "7px",
                    }}
                    class="fas fa-bell"
                  ></i>
                </Badge> */}
                <div className="notifications-pc">
                  <NotifyMe
                    data={data}
                    storageKey="notific_key"
                    notific_key="timestamp"
                    notific_value="update"
                    heading="Notifications"
                    sortedByKey={true}
                    showDate={true}
                    size={22}
                    color="#03A5C1"
                  />
                </div>

                <Link to="/profile" className="avatar-pc">
                  <Avatar
                    alt="avatar"
                    src={auth.user && auth.user.avatar}
                    style={{ marginRight: "5px", marginLeft: "5px" }}
                  />
                </Link>

                <IconButton
                  aria-label="logout"
                  style={{ color: "#03A5C1", fontSize: "15px" }}
                  onClick={() => dispatch(logoutUser())}
                >
                  <img
                    style={{ color: "#03A5C1", marginRight: "7px" }}
                    src={logout}
                    alt="logout"
                    width="30px"
                    color="#03A5C1"
                  />
                </IconButton>
              </>
            ) : (
              <>
                <button type="button" className="cnx-btn">
                  <i className="fas fa-sign-in-alt person-cnx"></i>
                  <Link to="/connexion">Connexion</Link>
                </button>
                <div>
                  <button type="button" className="cnx-btn">
                    <i className="fas fa-user-plus person-cnx"></i>
                    <Link to="signin">S'enregistrer</Link>
                  </button>
                </div>
              </>
            )}
            <Dropdown className="btn-post-g">
              <Dropdown.Toggle
                className="btn-post"
                variant="primary"
                id="dropdown-basic"
              >
                <i className="fas fa-plus plus"></i>
                Poster...
              </Dropdown.Toggle>

              <Dropdown.Menu className="post-menu">
                <Dropdown.Item>
                  <Link to="/post-deal">
                    <i className="fas fa-bolt bolt"></i>Deal
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="post-discussion">
                    <i
                      className="fas fa-comments "
                      style={{ paddingRight: "11px" }}
                    ></i>
                    Discussion
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  {auth.isAuth ? <FeedBack style={{ color: "white" }} /> : ""}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarTop;

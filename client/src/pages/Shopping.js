import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/Shopping.css";
import Banner from "../components/Banner";
import game1Logo from "../gamesMedia/asscreed_logo.png";
import game1Model from "../gamesMedia/asscree2.png";
import GameCard from "../components/GameCard";
import game1Cover from "../gamesMedia/codcover.png";
import game2Cover from "../gamesMedia/dbzcover.png";
import game3Cover from "../gamesMedia/watchdogscover.png";
import FilterOptions from "../components/FilterOptions";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import axios from "axios";
import { baseURL } from "../utils/constants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Shopping() {
  const [banner, setBanner] = useState("To be done");
  const [games, setGames] = useState([]);

  const fetchLoggedInUserDetails = async () => {
    //user details
    await axios
      .get(baseURL + "/userdashboard", { withCredentials: true })
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAllGames = async () => {
    await axios
      .get(baseURL + "/products", { withCredentials: true })
      .then((res) => {
        setGames(res.data.products);
        console.log(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchLoggedInUserDetails();
    fetchAllGames();
  }, []);

  return (
    <div id="Container">
      <NavBar />
      <div class="blob1"></div>
      <div class="blob2"></div>
      <div id="innerContainer">
        <div id="leftContainer">
          <FilterOptions />
        </div>
        <div id="rightContainer">
          <div id="bannerContainer">
            {banner ? (
              <Banner logo={game1Logo} model={game1Model} />
            ) : (
              <Skeleton
                baseColor="transparent"
                highlightColor="gray"
                width={"100%"}
                height={"100%"}
                duration={1.3}
                enableAnimation={true}
              />
            )}
          </div>
          <div id="gamesContainer">
            {games ? (
              games.map((game) => {
                return (
                  <div key={game._id} className="game">
                    <GameCard
                      cover={game.cover.secure_url}
                      title={game.name}
                      price={game.price}
                    />
                  </div>
                );
              })
            ) : (
              <div style={{ width: "100%", height: "100%" }}>
                <Skeleton
                  baseColor="transparent"
                  highlightColor="gray"
                  width={"100%"}
                  height={"100%"}
                  duration={1.3}
                  enableAnimation={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Shopping;

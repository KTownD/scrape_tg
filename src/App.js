import ReactDOM from 'react-dom/client';
import "./styles/App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Episode } from "./components/Episode";
import { ChopData } from "./dataUtils.js";
import { VscSettings } from "react-icons/vsc";
import Checkbox from "./components/Checkbox";
import ReactPlaceholder from "react-placeholder";
import {  RectShape } from "react-placeholder/lib/placeholders";
import Slider from "./components/Slider";

const LOADINGSTATE = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

function App() {
  const [choppedData, setChoppedData] = useState([]);
  const [favorites, setFavorites] = useState([]); //'Ahsoka', 'Foundation', 'The Wheel of Time']);
  const [hidden, setHidden] = useState([]); //['Minx','What We Do','The Chi','Heels', 'Virgin River']);
  const [hiddenIds, setHiddenIds] = useState([]);
  const [showFavsList, setShowFavsList] = useState(true);
  const [showHideList, setShowHideList] = useState(false);
  const [showAllHideList, setShowAllHideList] = useState(false);
  const [loadingState, setLoadingState] = useState(LOADINGSTATE.LOADING);
  const [err, setErr] = useState();
  const [showSettings, setShowSettings] = useState(false);
  const [imageSize, setImageSize] = useState(150);

  useEffect(() => {
    async function getData() {
      try {
        let res = "";

        setLoadingState(LOADINGSTATE.LOADING);
        if (process.env.NODE_ENV === "development") {
          console.log("dev mode");
          res = await axios.get("/api/torrents-hotpicks.php?cat=3");
        } else {
          console.log("deploy mode");
          res = await axios.get(
            "https://torrentgalaxy.to/torrents-hotpicks.php?cat=3&not-from-cache-please"
          );
        }

        //setHtmlData(res.data);
        setChoppedData(ChopData(res.data));
        setLoadingState(LOADINGSTATE.LOADED);
      } catch (error) {
        setLoadingState(LOADINGSTATE.ERROR);
        setErr(error);
        return error;
      }
    }

    let favs = [];
    let hids = [];
    let ids = [];

    try {
      favs = JSON.parse(window.localStorage.getItem("favorites"));
      hids = JSON.parse(window.localStorage.getItem("hidden"));
      ids = JSON.parse(window.localStorage.getItem("hidden-ids"));
    } catch {
      // ignore error
    }
    setFavorites(favs === null ? [] : favs);
    setHidden(hids === null ? [] : hids);
    setHiddenIds(ids === null ? [] : ids);
    console.log("Read favs: ", favs);
    console.log("Read hidden: ", hids);

    getData();
  }, []);

  useEffect(() => {
    // Due to double-loading issues in dev mode, do not allow deleting what was saved here.
    if (favorites.length > 0) {
      //console.log("Saving favs: ", JSON.stringify(favorites));
      window.localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    // Due to double-loading issues in dev mode, do not allow deleting what was saved here.
    if (hidden.length > 0) {
      //console.log("Saving hidden: ", JSON.stringify(hidden));
      window.localStorage.setItem("hidden", JSON.stringify(hidden));
    }
  }, [hidden]);

  useEffect(() => {
    // Due to double-loading issues in dev mode, do not allow deleting what was saved here.
    if (hiddenIds.length > 0) {
      //console.log("Saving hidden: ", JSON.stringify(hidden));
      window.localStorage.setItem("hidden-ids", JSON.stringify(hiddenIds));
    }
  }, [hiddenIds]);

  function episodeMatchesFavs(e) {
    return favorites.some((s) => s.includes(e.title));
  }

  function episodeMatchesHidden(e) {
    return hidden.some((s) => s.includes(e.title));
  }

  function episodeIdMatchesHidden(e) {
    return hiddenIds.some((s) => s.includes(e.id));
  }

  function handleHideSeries(title) {
    //  If the title is on the hidden list, remove it from that list.
    //  Otherwise, add it.
    if (hidden.some((s) => s.includes(title))) {
      handleRemoveHidden(title);
    } else {
      setHidden([...hidden, title].toSorted());
    }
  }

  function handleHideEpisodeId(id) {
    //  If the id is on the hidden ids list, remove it from that list.
    //  Otherwise, add it.
    if (hiddenIds.some((s) => s.includes(id))) {
      handleRemoveHiddenId(id);
    } else {
      setHiddenIds([...hiddenIds, id]);
    }
  }

  function handleAddFavorite(title) {
    setFavorites([...favorites, title].toSorted());
  }

  function handleRemoveFavorite(title) {
    setFavorites(favorites.filter((h) => h !== title));
  }

  function handleRemoveHidden(title) {
    setHidden(hidden.filter((h) => h !== title));
  }

  function handleRemoveHiddenId(id) {
    setHiddenIds(hiddenIds.filter((h) => h !== id));
  }

  function onCheckboxClick() {
    setShowAllHideList(!showAllHideList);
  }

  function onClickSettings() {
    setShowSettings(!showSettings);
  }

  function onChangeImageSize(newSize) {
    setImageSize(newSize);
    //console.log(newSize);

    // var e = document.getElementsByClassName('episode-container');

    // if(e[1]!==null)
    // {
    //   e[1].style.width = newSize //+ "px";
    // }

  }

  const awesomePlaceholder = (
    <div className="my-awesome-placeholder" style={{ display: "flex" }}>
      <RectShape color="#282b2d" style={{ width: 130, height: 150 }} />
      <RectShape color="#282b2d" style={{ width: 130, height: 150 }} />
      <RectShape color="#282b2d" style={{ width: 130, height: 150 }} />
      <RectShape color="#282b2d" style={{ width: 130, height: 150 }} />
      <RectShape color="#282b2d" style={{ width: 130, height: 150 }} />
    </div>
  );

  return (
    <div className="App">
      <header className="header">
        <div>Series Scraper</div>
        <div className="settings-btn" onClick={onClickSettings}>
          <VscSettings />
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar">
          <div className="favs-filters">
            <span className="collapsible">
              Favorites:
              <button
                className="collapse-btn"
                onClick={() => {
                  setShowFavsList(!showFavsList);
                }}
              >
                {showFavsList ? "-" : "+"}
              </button>
            </span>
            {showFavsList && (
              <ul className="favs-filters-list">
                {favorites.map((f) => (
                  <li onClick={() => handleRemoveFavorite(f)} key={f}>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="hide-filters">
            <span className="collapsible">
              Hidden:
              <button
                className="collapse-btn"
                onClick={() => {
                  setShowHideList(!showHideList);
                }}
              >
                {showHideList ? "-" : "+"}
              </button>
            </span>
            {showHideList && (
              <ul className="hide-filters-list">
                {hidden.map((f) => (
                  <li onClick={() => handleRemoveHidden(f)} key={f}>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        <div className="episode-area">
          {loadingState === LOADINGSTATE.LOADING && (
            <div className="loading-area">
              <h2 style={{ color: "#282b2d" }}>Loading...</h2>
              <ReactPlaceholder
                customPlaceholder={awesomePlaceholder}
              ></ReactPlaceholder>
            </div>
          )}
          {loadingState === LOADINGSTATE.ERROR && (
            <h2 style={{ color: "red" }}>Error occurrred: {err?.message}</h2>
          )}

          {loadingState === LOADINGSTATE.LOADED && (
            <div className="fav-episode-area">
              {choppedData.length > 0 &&
                choppedData
                  .filter(
                    (x) =>
                      episodeMatchesFavs(x) &&
                      (showAllHideList || !episodeIdMatchesHidden(x))
                  )
                  .map((x) => (
                    /*<div key={x.id} className='fav-episode-list-block'>*/
                    <Episode
                      episode={x}
                      handleHideSeries={null}
                      handleAddFavorite={null}
                      isOnHiddenList={false}
                      isOnHiddenIdList={episodeIdMatchesHidden(x)}
                      handleHideEpisodeId={
                        showAllHideList || !episodeIdMatchesHidden(x)
                          ? handleHideEpisodeId
                          : null
                      }
                      imageWidth = {imageSize + 'px'}
                    />
                    /*</div>*/
                  ))}
            </div>
          )}

          {loadingState === LOADINGSTATE.LOADED && (
            <div className="oth-episode-area">
              {choppedData.length > 0 &&
                choppedData
                  .filter(
                    (x) =>
                      !episodeMatchesFavs(x) &&
                      (showAllHideList ||
                        (!episodeMatchesHidden(x) && !episodeIdMatchesHidden(x)))
                  )
                  .map((x) => (
                    /*<div key={x.id} className='oth-episode-list-block'>*/
                    <Episode
                      episode={x}
                      handleHideSeries={handleHideSeries}
                      handleAddFavorite={handleAddFavorite}
                      isOnHiddenList={episodeMatchesHidden(x)}
                      isOnHiddenIdList={episodeIdMatchesHidden(x)}
                      handleHideEpisodeId={
                        showAllHideList || !episodeIdMatchesHidden(x)
                          ? handleHideEpisodeId
                          : null
                      }
                      imageWidth = {imageSize + 'px'}
                    />
                    /*</div>*/
                  ))}
            </div>
          )}

        </div>

        {showSettings && (
          <div className="settings">
            <h2>Settings</h2>
            <Checkbox
              label="Force Show All"
              checked={showAllHideList}
              onCheckboxClick={onCheckboxClick}
            />
            <p></p>
            <label>Icon Size: {imageSize}</label>
            <Slider currentValue={imageSize} setCurrentValue={onChangeImageSize}></Slider>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;

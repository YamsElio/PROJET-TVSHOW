import { useEffect, useState } from "react";
import { TVShowAPI } from "./API/tv-show";
import "./global.css";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./component/TVShowDetail/TVShowDetail";
import { Logo } from "./component/Logo/Logo";
import logo from "./assets/images/logo.png";
//import { TVShowListItem } from "./component/TVShowListItem/TVShowListItem";
import { TVShowList } from "./component/TVShowList/TVShowList";
import { SearchBar } from "./component/SearchBar/SearchBar";

export function App() {
  async function searchTVShow(tvShowName) {
    const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
    if (searchResponse.length > 0) {
      setCurrentTVShow(searchResponse[0]);
    }
  }
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationsList, setrecommendationsList] = useState([]);

  async function fetchPopular() {
    const populars = await TVShowAPI.fetchPopulars();
    if (populars.length > 0) {
      setCurrentTVShow(populars[0]);
    }
  }
  async function fetchRecommandations(TVShowID) {
    const recommendations = await TVShowAPI.fetchrecommandations(TVShowID);
    if (recommendations.length > 0) {
      setrecommendationsList(recommendations.slice(0, 10));
    }
  }

  useEffect(() => {
    fetchPopular();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommandations(currentTVShow.id);
    }
  }, [currentTVShow]);

  console.log(recommendationsList);
  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path})`
          : "black",
        backgroundRepeat: currentTVShow ? `no-repeat` : "no-repeat",
        backgroundPosition: currentTVShow ? `center ` : "center",
        backgroundSize: currentTVShow ? `cover` : "cover",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo title="Yams" subtitle="Find your way" image={logo} />
          </div>
          <div className="col-md-12 col-lg-4 ">
            <SearchBar onSubmit={searchTVShow} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommendations}>
        {recommendationsList && recommendationsList.length > 0 && (
          <TVShowList
            onclickItem={setCurrentTVShow}
            TVShowList={recommendationsList}
          />
        )}
      </div>
    </div>
  );
}

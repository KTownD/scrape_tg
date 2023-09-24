import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaRegFloppyDisk } from "react-icons/fa6";

import Tooltip from "./Tooltip";

export function Episode({
  // {id, filename, img, href, season, episode, title}
  episode,
  handleHideSeries,
  handleAddFavorite,
  isOnHiddenList,
  isOnHiddenIdList,
  handleHideEpisodeId,
  imageWidth = "125px",
}) {
  // isOnHiddenList -- True if this series title is on the list of Hidden series
  return (
    <div
      key={episode.id}
      className={`episode-container ${isOnHiddenList ? "grayed-episode" : ""}`}
      style={{ width: `${imageWidth}` }}
    >
      <a className="episode-thumbnail-link" href={episode.href}>
        <img className="thumbnail" src={episode.img} alt={episode.title} />
      </a>
      <div className="episode-details">
        <a href={episode.href}>
          <div className="episode-title">{episode.title}</div>
        </a>
        <span className="season-episode">
          {episode.season?.length > 0 && (
            <div className="season-num">{episode.season}</div>
          )}
          {episode.episode?.length > 0 && (
            <div className="episode-num">{episode.episode}</div>
          )}
        </span>
        <div className="episode-details-links">
          {handleHideSeries !== null && (
            <Tooltip
              tooltipText={isOnHiddenList ? "Show Series" : "Hide Series"}
              position={"left"}
            >
              <a
                className="details-link-a"
                href="#"
                onClick={() => handleHideSeries(episode.title)}
              >
                {isOnHiddenList ? <BiSolidHide /> : <BiSolidShow />}
              </a>
            </Tooltip>
          )}
          {handleAddFavorite !== null && (
            <Tooltip tooltipText={"Make Favorite"} position={"top"}>
              <a
                className="details-link-a"
                href="#"
                onClick={() => handleAddFavorite(episode.title)}
              >
                <AiOutlineLike />
              </a>
            </Tooltip>
          )}

          {handleHideEpisodeId !== null && (
            <Tooltip
              tooltipText={isOnHiddenIdList ? "Show Episode" : "Hide Episode"}
              position={"right"}
            >
              <a
                className="details-link-a"
                href="#"
                onClick={() => handleHideEpisodeId(episode.id)}
              >
                <FaRegFloppyDisk />
              </a>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}

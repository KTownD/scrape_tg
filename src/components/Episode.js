export function Episode({
  // {id, filename, img, href, season, episode, title}
  episode,
  handleHideSeries,
  handleAddFavorite,
  isOnHiddenList,
  isOnHiddenIdList,
  handleHideEpisodeId }) {
  // isOnHiddenList -- True if this series title is on the list of Hidden series 
  return (
    <div key={episode.id} className={`episode-container ${isOnHiddenList ? 'grayed-episode' : ''}`}>
      <a href={episode.href}>
        <img className='thumbnail' src={episode.img} alt={episode.title} />
      </a>
      <div className="episode-details">
        <a href={episode.href}>
          <div className='title'>{episode.title}</div>
        </a>
        <span className='season-episode'>
          {episode.season?.length > 0 && <div className='season-num'>{episode.season}</div>}
          {episode.episode?.length > 0 && <div className='episode-num'>{episode.episode}</div>}
        </span>
        <div className='episode-details-links'>
          {handleHideSeries !== null &&
            <a href="#" onClick={() => handleHideSeries(episode.title)}>{isOnHiddenList ? 'Un-Hide' : 'Hide'}</a>
          }
          {handleAddFavorite !== null &&
            <a href="#" onClick={() => handleAddFavorite(episode.title)}>Make Fav</a>
          }
          {handleHideEpisodeId !== null &&
            <a href="#" onClick={() => handleHideEpisodeId(episode.id)}>{isOnHiddenIdList ? "!DL'd" : "DL'd"}</a>
          }

        </div>
      </div>
    </div>
  );

}

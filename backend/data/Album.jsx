import { initMusic, list_album } from "./list-song.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Albums = () => {
  const navigate = useNavigate();
  // We only need one state for albums, as all will be displayed initially
  const [albumsToDisplay, setAlbumsToDisplay] = useState([]); // Renamed for clarity
  const [userAccountType, setUserAccountType] = useState('normal');

  useEffect(() => {
    const storedAccountType = localStorage.getItem('account_type') || 'normal';
    setUserAccountType(storedAccountType);

    (async () => {
      await initMusic(); // initMusic will load all songs into list_album in list-song.js (unfiltered)
      setAlbumsToDisplay(list_album); // Set all albums to be displayed initially
    })();
  }, []);

  // Removed the second useEffect as we no longer filter for display

  const handleAlbumClick = (album) => {
    const canAccess = checkSongAccess(album.premium, userAccountType);

    if (canAccess) {
      // If access is granted, navigate to the album details page
      navigate(`/thuvien/album/${album.author}`);
    } else {
      // If access is denied, show an alert and suggest upgrading
      alert("Bạn cần nâng cấp tài khoản để nghe album này.");
      // Optionally, you can navigate to an upgrade page here:
      // navigate('/upgrade-account');
    }
  };

  const checkSongAccess = (songPremiumLevel, currentUserAccountType) => {
    const accountTypeHierarchy = {
      'normal': 0,
      'plus': 1,
      'premium': 2,
      'admin': 3
    };

    const songRequiredLevel = songPremiumLevel;
    const userLevel = accountTypeHierarchy[currentUserAccountType];

    if (currentUserAccountType === 'admin') {
      return true; // Admins can access all
    }
    return userLevel >= songRequiredLevel;
  };

  const getRequiredAccountType = (premiumLevel) => {
    if (premiumLevel === 1) return 'Plus'; // Changed to 'Plus' for display
    if (premiumLevel === 2) return 'Premium'; // Changed to 'Premium' for display
    return 'Normal'; // Should not be reached if clicked, but for completeness
  };

  return (
    <div className=" p-4 ">
      <h2 className="text-white fs-4 fw-bold mb-4" style={{ margin: '26px', marginBottom: '20px' }}>Album Hot</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2">
        {albumsToDisplay.map((album) => ( // Loop through all albums
          <div key={album.id} className="col text-center text-white" onClick={() => handleAlbumClick(album)}>
            <img
              src={album.img}
              className="object-cover rounded mb-2"
              style={{ width: '200px', height: '220px' }}
            />
            <p className="fw-semibold" style={{ margin: 0, fontFamily: "sans-serif", fontWeight: 14 }}>{album.song_name}</p>
            <p className="text-white" style={{ opacity: 0.6, margin: 0, fontFamily: "sans-serif" }}>{album.author}</p>
            {album.premium === 1 && (
              <span
                className="badge"
                style={{ backgroundColor: '#A17DFF', color: 'white' }}
              >
                PLUS
              </span>
            )}
            {album.premium === 2 && (
              <span
                className="badge"
                style={{ backgroundColor: '#FFC107', color: 'black' }}
              >
                PREMIUM
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Albums;
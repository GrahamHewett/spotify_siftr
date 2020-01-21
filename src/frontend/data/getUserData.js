import React from "react";
import "./getUserData.css";

export default function UserData({token, logOut}) {
  const [username, setUsername] = React.useState(null);
  React.useEffect(() => {
    async function fetchData() {
      fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(response => response.json())
    .then(data => setUsername(data.display_name))
    }
    fetchData()
  }, [token])
      
    
  if (!username) {
    return null;
  } else {
    return (
      <div className="section-statusBar">
        <h2 className="item-statusBar">Welcome, {username}</h2>
        <button className='item-statusBar button-green' 
          onClick={() => logOut ? logOut() : null}> 
          Log out of Spotify
        </button>
      </div>
    );
  }
  
}


// name: data.display_name,
// bday: data.birthdate,
// location: data.country,
// email: data.email,
// ext: data.external_urls,
// followers: data.followers,
// href: data.href,
// id: data.id,
// images: data.images,
// subscriptions: data.product,
// type: data.type,
// uri: data.uri
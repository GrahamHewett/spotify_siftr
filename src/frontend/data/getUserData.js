import React from "react";
import "./getUserData.css";

export default function UserData({token, logOut}) {
  const [user, setUser] = React.useState([]);
  
  React.useEffect(() => {
    async function fetchData() {
      fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(response => response.json())
    .then(data => setUser({
      name: data.display_name,
      bday: data.birthdate,
      location: data.country,
      email: data.email,
      ext: data.external_urls,
      followers: data.followers,
      href: data.href,
      id: data.id,
      images: data.images,
      subscriptions: data.product,
      type: data.type,
      uri: data.uri
    }))
    }
    fetchData()
  }, [token])
      
    
  if (user.length === 0) {
    return <div>loading..</div>;
  } else {
    return (
      <div className="section-statusBar">
        <h2 className="item-statusBar">Welcome, {user.name}</h2>
        <button className='item-statusBar button-green' 
          onClick={() => logOut ? logOut() : null}> 
          Log out of Spotify
        </button>
      </div>
    );
  }
  
}

{/* <h1 style={{...defaultStyle, 
            'font-size': '54px',
            'margin-top': '5px'
          }}>
            {this.state.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={playlistToRender}/>
          <HoursCounter playlists={playlistToRender}/>
          <Filter onTextChange={text => {
              this.setState({filterString: text})
            }}/>
          {playlistToRender.map((playlist, i) => 
            <Playlist playlist={playlist} index={i} />
          )} */}
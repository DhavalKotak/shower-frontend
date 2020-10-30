import React, { Component } from 'react'
import Song from './Song'

class Playlist extends Component{
    constructor(){
        super()
        this.state = {songs : null}
    }
    componentDidMount = () => {
        let songData = JSON.parse(window.localStorage.getItem("PlayList"))
        if(songData !== null){
            let songs = songData.map(song => <Song key={song.id} song={song}/>)
            this.setState({songs : songs})
        }
    }
    render(){
        return(
            <React.Fragment>
                {this.state.songs}
            </React.Fragment>
        )
    }
}

export default Playlist
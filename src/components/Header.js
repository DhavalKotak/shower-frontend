import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import SongList from "./SongList"

class Header extends Component{
    constructor() {
        super()
        this.state = {songData: null}
        fetch("https://shower-backend.herokuapp.com/songs")
          .then(async data => {
             let res = await data.json()
            const songData = res.map(song => <SongList key={song.song_id} song={song}/>)
            this.setState({songData: songData})
          })
    }
    render() {
        return(
            <React.Fragment>
                <Jumbotron>
                    <h1>Welcome To Shower{this.props.key}</h1>
                </Jumbotron>
                {this.state.songData}
            </React.Fragment>
        )
    }
}

export default Header
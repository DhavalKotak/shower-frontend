import React, { Component } from 'react'
import musicIcon from "./../assets/music-note.png"
import Container  from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import {FaPlay,FaPause,FaPlus} from 'react-icons/fa'

class SongList extends Component {
    constructor(){
        super()
        this.state = {
            loading : false,
            play : false,
            ctx: null
        }
    }
    playSong = () => {
        if(this.state.loading === false && this.state.ctx === null){
            const ctx = new AudioContext()
            this.setState({ctx : ctx})
            let audio 
            this.setState({
                loading: true
            })
            fetch(`https://shower-backend.herokuapp.com/play?song=${this.props.song.song_name}`)
            .then(data => data.arrayBuffer())
            .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
            .then(decodeAudioData => {
                    audio = decodeAudioData
            }).then(() => {
                const playsound = ctx.createBufferSource()
                playsound.buffer = audio
                playsound.connect(ctx.destination)
                if(this.state.play === false){
                    playsound.start(ctx.currentTime)
                    this.setState({play : true})
                }
                this.setState({loading: false})
            })
            .catch(err => {
                this.setState({loading:false})
                alert(err)
            })
        }else{
            let ctx = this.state.ctx
            if(ctx.state === 'running'){
                ctx.suspend()
                this.setState({play: false})
            }
            else if(ctx.state === 'suspended'){
                ctx.resume()
                this.setState({play: true})
            }
                
        }
    }

    addToPlayList = async () =>{
        let songs = []
        let songData = {
            id : this.props.song.song_id,
            name : this.props.song.song_name,
            artist : this.props.song.artist_name
        }
        let oldStorage = JSON.parse(window.localStorage.getItem("PlayList"))
        if(oldStorage == null){
            songs.push(songData)
            window.localStorage.setItem("PlayList",JSON.stringify(songs))
        }else{
            let repeat = false
            window.localStorage.clear("PlayList")
            oldStorage.forEach(song => {
                if(song.id === songData.id)
                repeat = true
                songs.push(song)
            })
            if(repeat === false){
                songs.push(songData)
                alert("Song Added!")
            }else{
                alert("Its Already There")
            }
            window.localStorage.setItem("PlayList",JSON.stringify(songs))
        }      
    }
    render(){
        return(
            <React.Fragment>
                <Container>
                    <Row>
                        <Col md={10} xs={8}>
                            <img src={musicIcon} alt="" align="left"/>
                            <h5>&nbsp; {this.props.song.song_name}</h5>
                            <p>&nbsp; {this.props.song.artist_name}</p>
                        </Col>
                        <Col md={2} xs={4}>
                            <Button variant="outline-info" onClick={this.playSong} disabled={this.state.loading}>
                                {this.state.play ?
                                <FaPause/>
                                :
                                <FaPlay/>}
                            </Button>&ensp;
                            <Button variant="outline-success" title="Add To Playlist" onClick={this.addToPlayList}><FaPlus/></Button>
                        </Col>
                    </Row>
                    <hr/>
                </Container>
            </React.Fragment>
        )
    }
}
export default SongList
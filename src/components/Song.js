import React, { Component } from 'react'
import  Container  from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import  Col  from 'react-bootstrap/Col'
import Button  from 'react-bootstrap/Button'
import musicIcon from './../assets/music-note.png'
import {FaPlay,FaPause,FaMinus} from 'react-icons/fa'

class Songs extends Component {
    constructor(){
        super()
        this.state = {
            loading : false,
            play : false,
            ctx: null,
            show: true
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
            fetch(`https://shower-backend.herokuapp.com/play?song=${this.props.song.name}`)
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

    removeFromPlaylist = () => {
        let songs = []
        let playlist = JSON.parse(window.localStorage.getItem("PlayList"))
        console.log(playlist.length)
        for(let i = 0; i <= playlist.length; i++){
            if(playlist[i].id === this.props.song.id){
                playlist.splice(i , 1)
                console.log(playlist)
                playlist.forEach(song => {
                    songs.push(song)
                })
                window.localStorage.clear("PlayList")
                window.localStorage.setItem("PlayList",JSON.stringify(songs))
                break
            }
        }
        window.location.replace("https://dhavalkotak.github.io/shower-frontend/")
    }

    render(){
        return(
            <React.Fragment>
                <Container>
                    <Row>
                        <Col md={10} xs={8}>
                            <img src={musicIcon} alt="" align="left"/>
                            <h5>&nbsp; {this.props.song.name}</h5>
                            <p>&nbsp; {this.props.song.artist}</p>
                        </Col>
                        <Col md={2} xs={4}>
                            <Button variant="outline-info" onClick={this.playSong}>
                                {this.state.play ?
                                <FaPause/>
                                :
                                <FaPlay/>}
                            </Button>&ensp;
                            <Button variant="outline-danger" title="Remove From Playlist" onClick={this.removeFromPlaylist}><FaMinus/></Button>
                        </Col>
                    </Row>
                    <hr/>
                </Container>
            </React.Fragment>
        )
    }
}

export default Songs

import React from 'react'
import YouTube from 'react-youtube'
import $ from 'jquery'


class Youtb extends React.Component{
  constructor(props){
    super(props);
    this.videoSearch = this.videoSearch.bind(this)
    this.state = { videosid: '', vid: ''}
  }

  videoSearch(words){
    $.ajax({
      url: `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBDVstf4LwXgPuKoKWt_a6WfZMkV1gdN_8&part=snippet&type=video&maxResults=10&q=${words}`,
      type: 'GET',
      dataType: 'JSON'
    }).done( videos => {
      this.setState({videosid: videos})
      this.setState({vid:this.state.videosid.items[0].id.videoId})
    })

  }


  render(){
    let commands = {
        smart:true,
        indexes:["find *","play *"], // These spoken words will trigger the execution of the command
        action:(i,wildcard) =>{ // Action to be executed when a index match with spoken word
            this.videoSearch(wildcard)
        }
    };
    artyom.addCommands(commands)

    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return(
      <YouTube
        videoId={this.state.vid}
        opts={opts}
      />
    )
  }
}

export default Youtb

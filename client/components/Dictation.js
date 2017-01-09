import React from 'react';
import { connect } from 'react-redux';
import { setScript } from '../actions/actions.js'


class Dictation extends React.Component{
  constructor(props){
    super(props);
    this.toText = this.toText.bind(this);
  }
  componentDidMount(){
    artyom.fatality();
  }

  toText(script){
    this.props.dispatch(setScript(script))
  }

  UserDictation = artyom.newDictation({
    continuous:true, // Enable continuous if HTTPS connection
    onResult:(text)=> {
        this.toText(text);
        console.log(this.props.script);
    },
    onStart:() => {
        console.log("Dictation started by the user");
    },
    onEnd:() => {
        alert("Dictation stopped by the user");
    }
});

  render(){
    let text = this.props.script
    return (
    <div className="row">
      <div className="col m3 s12 note-pad">
        <h1 className="center">Dictation</h1>
        <p>Dictation component is different that the other components, Nova is not listening now, that means you cannot navigate with your voice through the app or give her commands</p>
        <p>when you click the Start button, Nova is going to write down on the notebook everything that you said. When you are done just click the stop button</p>
        <br/>
        <hr/>
        <p>Press Start and Nova will be ready to take notes</p>
        <input type='button' className="btn col m6 s6" onClick={() => this.UserDictation.start()} value="Start"/>
        <input type='button' className="btn red col m6 s6" onClick={() => this.UserDictation.stop()} value="Stop"/>
        <br/>
        <p className="alert-error">Note: Please make sure you Stop Nova before you go to a different component</p>
      </div>
      <div className="col m9 s12">
        <div className="col offset-m3 m5 s12">
          <div className="paper">
            <div className="lines">
              <div className="text">
                {text}
              </div>
            </div>
            <div className="holes hole-top"></div>
            <div className="holes hole-middle"></div>
            <div className="holes hole-bottom"></div>
          </div>
        </div>
      </div>
    </div>
  )
  }
}

const mapStateToProps = (state) => {
  return {
    script: state.script,
  }
}

export default connect(mapStateToProps)(Dictation);

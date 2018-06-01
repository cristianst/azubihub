import React, { Component } from 'react';
import _  from 'lodash';

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    const top = rect.top - 72;
    const bot = rect.bottom - 72;
    const viewHeight = (window.innerHeight || document.documentElement.clientHeight) - 72;
    const isInViewPort = (
        // eslint-disable-next-line 
        top >= 0 && top < viewHeight ||
        // eslint-disable-next-line 
        bot >= 0 && bot < viewHeight
        //   && rect.left >= 0 &&
        //   rect.right <= (window.innerWidth || document. documentElement.clientWidth)
    );
    
    return isInViewPort;
  }

HTMLCollection.prototype.forEach = Array.prototype.forEach;
// eslint-disable-next-line 
Array.prototype.shuffle = function() {
    var input = this;
     
    for (var i = input.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
         
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}

class Video extends Component {
    constructor(props){
        super(props);
        this.videos = [];
        const groups = [{
            videoKey: 'foo',
            videoSrc: 'http://mirrors.standaloneinstaller.com/video-sample/metaxas-keller-Bell.mp4',
            sound: false,
        }, {
            videoKey: 'bar',
            videoSrc: 'http://mirrors.standaloneinstaller.com/video-sample/DLP_PART_2_768k.mp4',
            sound: false
        }].shuffle();
        this.state = {
            groups
        };
    }
    scrollHandler = () => {
console.log("scrolling");
        this.videos.forEach(video => {
            if(isElementInViewport(video) && video.paused){
                console.log('video in viewport, play it');
                video.play();                 
            } else if (!isElementInViewport(video) && !video.paused){
                console.log('video out of viewport, pause it');
                video.muted = true;
                video.pause();
            }
        });
    }
    handleTimeUpdate = (event) => {
        //console.log(event.target.currentTime);
    }
    componentDidMount(){
        window.addEventListener('scroll', _.throttle(this.scrollHandler, 100));
        const videos = this.ref.getElementsByTagName('video');
        videos.forEach(video =>{
            this.videos.push(video);
            const visibleVideo = isElementInViewport(video);
            video.addEventListener('timeupdate', this.handleTimeUpdate);
            if(visibleVideo){
                video.play();
            }
        });
    }
    getVideoRef = (ref) =>  {
        if(ref){
            this.ref = ref; 
        }      
        
    };
    handleVideoClick = (index) => {
        const videoClicked = this.videos[index];
        videoClicked.muted = !videoClicked.muted;
        if(!videoClicked.muted){
            const newGroups = [...this.state.groups];
            newGroups[index].sound = true;
            this.setState({
                groups: newGroups
            });
        }
    }
    getVideoDurations = () => {
        this.videos.forEach(video => {
            console.log(video.currentTime);
        });
    }
    render(){
        // const groups = [{
        //     videoKey: 'foo',
        //     videoSrc: 'http://mirrors.standaloneinstaller.com/video-sample/metaxas-keller-Bell.mp4',
        //     sound: false,
        // }, {
        //     videoKey: 'bar',
        //     videoSrc: 'http://mirrors.standaloneinstaller.com/video-sample/DLP_PART_2_768k.mp4',
        //     sound: false
        // }].shuffle();
        const { groups } = this.state;
        return (
            <div className="questionLayout" ref={ref => this.getVideoRef(ref)}>
                <div className="fixedHeader">
                    <div style={styles.backbutton}>BACK TO SURVEY</div>
                    <div style={styles.search}>
                        <div className="divsearch" style={styles.divsearch}>Search</div>
                    </div>
                </div>
                <div style={styles.maincontent}>
                <br/><br/>
                <button onClick={() => this.getVideoDurations()}>Get Durations</button>
                <br/>
                { groups.map((group, index) => (
                    <div key={index}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        <br/><br/>    
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        <br/><br/>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        <br/><br/>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        <br/><br/>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        <br/><br/>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        <br/><br/>
                        <span className="videooverlay" onClick={() => this.handleVideoClick(index)}>
                            <video data-key={index} muted style={{ width: '100%'}}><source src={group.videoSrc}/></video>
                        </span>
                        <br/><br/>
                    </div>
                ))}
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                <br/><br/>    
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                <br/><br/>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                <br/><br/>
                </div>
            </div>
            
        );
    }
}

const styles = {
    backbutton : {
        backgroundColor: '#294c73',
        color: '#fff',
        textAlign: 'center',
        padding: 10,
        fontWeight: 100,
        letterSpacing: -0.2,
    },
    search: {
        backgroundColor: '#447dbe',
        padding: '10px 20px'
    },
    divsearch: {
        backgroundColor: ' #1f5a8e',
        borderRadius: 5,
        color: '#fff',
        opacity: 0.7
    },
    maincontent: {
        height: 980,
        padding: 20,
        backgroundColor: '#F5F5F6',
        marginTop: 72
    }
}
export default Video;
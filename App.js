import React, { Component, useState,useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator,TextInput,Image,TouchableOpacity,BackHandler,ToastAndroid } from 'react-native';
import WebView from 'react-native-webview';
import { Dimensions } from "react-native";
import imgFullScreen from './assets/fullscreen2.png';
import SplashScreen from 'react-native-splash-screen';
import Svg, { G, Path } from 'react-native-svg';
import Fullscreen from './assets/fullscreen.svg';
import Menu from './assets/menu-list.svg';

var theWidth = Dimensions.get('window').width; //full width
var theHeight = Dimensions.get('window').height; //full height

{/*export default class App extends Component{*/ }
export default function App() {
  let count = 0;

  useEffect(() => {
    SplashScreen.hide();
  }, []);


  useEffect(() => {
    /**/
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
    
  }, []);

  const [loaded, setLoaded] = useState('Loading...');
  const [theUri, setUri] = useState({ uri: 'https://www.google.com' });
  const [theURL, setTheURL] = useState('https://www.google.com');
  const [showLoader, setShowLoader] = useState(true);
  const [showBar, setShowBar] = useState(true);
  const [newHeight, setNewHeight] = useState(theHeight-50); //max height=588px, greater than 589 screen get blank after load
  

  {/* */ }
  const loadingStop = () => {
      setLoaded("");
      setShowLoader(false);
      //alert("Val="+val);

  }
  const loadingStart = () => {
    setLoaded("Loading");
    setShowLoader(true);
    //alert("Val="+val);

  }
  const newUri = (event) =>{
    /*
    if(event.nativeEvent.key=='Enter'){
      setUri({ uri: event.key });
    }
    */
    
  }
  const go = () =>{
    if(theURL != ""){
      setUri({ uri: theURL });
    }
    
    //alert("Hi"+(theURL));
  }
  const setFullScreen = () =>{
    setShowBar(false);
    setNewHeight(theHeight);

    setUri({ uri: theURL+"?x=1"});
    
    
  }

  function handleBackButtonClick() {
    /**/
    let myREturn=true;
    //navigation.goBack();
    
    if(count==0){
      showToastWithGravity("Press again to exit from full screen mode."+count);
    }
    if(count==1){
      showToastWithGravity("Press again to exit from app."+count);

    }
    /*
    if(count==2){
      myREturn=false;
    } 
    */   
    count++;
    setNewHeight(newHeight);
    setShowBar(true);
    return myREturn;
    
  }

  const showToastWithGravity = (txt) => {
    ToastAndroid.showWithGravity(
      txt,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (

    <View style={styles.container}>
      {showBar && 
        <View style={styles.firstBar}>
          <TextInput 
            name="url"
            style={styles.urlBox} 

            placeholder="e.g http://www.mysite.com"
            value={theURL}
            onChangeText={setTheURL}
            onEndEditing={(theURL) => go(theURL)}></TextInput>

          <TouchableOpacity onPress={setFullScreen}>
            {/*<Image source={imgFullScreen} style={styles.icon1} />*/}
            <Fullscreen style={styles.icon1}/>
          </TouchableOpacity>
          <TouchableOpacity>
            {/*<Image source={require('./assets/menu-list.png')}  />*/}
            <Menu style={styles.icon2}/>
          </TouchableOpacity>
          
        </View>
      }

      {showLoader && <View ><Text>{loaded} {theURL}</Text><ActivityIndicator size="small" color="#0000ff" /></View>}
      
      {/* styles.bodyBrowser */}
      <View style={{backgroundColor: '#008811', flex: 1,  width: theWidth, border:3, borderColor:'#000000'}}>
        {/* */}

        <WebView source={theUri}
        scalesPageToFit={true}
        onLoadEnd={loadingStop} 
        onLoadStart={loadingStart}
        androidLayerType={'software'}
        style={{flex:0,height:'100%'}}
        />
      </View>

    </View>


  );



}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    //backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //alignSelf: 'stretch',
    borderWidth: 1,
    width: theWidth,
    //height: theHeight,
    //borderColor: '#ff0000'
  },
  bodyBrowser: {
    
    marginTop: 20,
    alignSelf: 'stretch',
    //height: theHeight - 100,
    height: 550,
    //borderColor: '#222222',
    //borderWidth: 2,
    width: theWidth,
  },
  urlBox:{
    borderRadius: 15,
    width:280,
    backgroundColor: '#eeeeee',
    height:42,
    marginLeft:10,
    color: '#000000'
    
  },
  icon1: {
    width:42,
    height:42,
    marginTop:6,
    marginRight: 10
  },
  icon2: {
    width:42,
    height:42,
    marginRight: 10,
    marginTop:6
  }
  ,firstBar:{ 
    flexDirection:"row",
    justifyContent: "space-between",
    width: theWidth,
    height: 48
  }
});

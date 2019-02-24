import React from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const HEADER_MAX_HEIGHT = 200;//ヘッダーの高さの最大値
const HEADER_MIN_HEIGHT = 60;//ヘッダーの高さの最小値
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;//最大値と最小値の差

class ScrolleHideHeader extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  render(){

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const data = Array.from({length:30});//長さ30の空の配列を用意
    console.log(data);
    return(
      <View style = {styles.container}>

        <ScrollView
          style = {styles.scrolle}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
        >
          <View style={styles.scrollViewContent}>
            {data.map((_,i)=>
              <View key={i} style={styles.row}>
                <Text style = {styles.text}>{i}</Text>
              </View>
            )}
          </View>

        </ScrollView>

        <Animated.View style={[styles.header, {height: headerHeight}]}>
          <View style = {styles.bar}>
            <Text style = {styles.title}>Title</Text>
          </View>
        </Animated.View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  scrolle:{
    flex:1,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  row:{
    height: 40,
    margin: 9,
    backgroundColor:'#333366',
    alignItems:'center',
    justifyContent:'center',
  },
  text:{
    fontSize:18,
    color:'#fff',
  },
  //ヘッダーのスタイル
  header:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#9999cc',
    overflow: 'hidden',
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
});

export default ScrolleHideHeader;
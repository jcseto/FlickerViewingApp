'use strict';

var React = require('react-native');
var fullsizeImage = require('./image');

var {
  StyleSheet,
  Image, 
  View,
  TouchableHighlight,
  ListView,
  Text,
  Component
} = React;

var styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1
  }
});

class image extends Component {

  constructor(props) {
    var photoSource = 'https://farm' + props.farm + '.staticflickr.com/'+props.server+'/'+props.id + '_' + props.secret + '.jpg';

    super(props);
    this.imageSource = photoSource;
    console.log(photoSource);
  }


  render() {
    return (
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image} 
          source={{uri: this.imageSource}} />
      </View>
    );
  }
}


module.exports = image;
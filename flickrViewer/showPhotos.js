'use strict';

var React = require('react-native');
var fullsizeImage = require('./image');

var {
  StyleSheet,
  Image, 
  View,
  TouchableHighlight,
  ListView,
  Component
} = React;

var styles = StyleSheet.create({
  textContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  thumbnail: {
    width: 100,
    height: 100,
  },    
  listContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  container: {
    backgroundColor: '#CCC',
        margin: 10,
        width: 100,
        height: 100
  }
});

class showPhotos extends Component {

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.photos.photo)
    };
  }

  photoPressed(photo) {
    this.props.navigator.push({
      title: photo.title,
      component: fullsizeImage,
      passProps: photo
    });
  }

  renderPhotos(photo, sectionID, rowID) {
    var photoSource = 'https://farm' + photo.farm + '.staticflickr.com/'+photo.server+'/'+photo.id + '_' + photo.secret + '.jpg';
    return (
      <TouchableHighlight onPress={() => this.photoPressed(photo)} 
          underlayColor='#dddddd'>
        <View style={styles.container}>
          <Image
            source={{uri: photoSource}}
            style={styles.thumbnail}
          />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        contentContainerStyle={styles.listContainer}
        dataSource={this.state.dataSource}
        renderRow={this.renderPhotos.bind(this)}/>
    );
  }
}


module.exports = showPhotos;
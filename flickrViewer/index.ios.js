/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var GridView = require('react-native-grid-view');
var searchPage = require('./searchPage');

var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Component
} = React;



class flickrViewer extends Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Flickr Viewer',
          component: searchPage,
        }}/>
    );
  }
}

var styles = React.StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('flickrViewer', () => flickrViewer);

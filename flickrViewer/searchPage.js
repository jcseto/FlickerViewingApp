'use strict';

var React = require('react-native');
var showPhotos = require('./showPhotos');


var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  PickerIOS,
  Image,
  Component
} = React;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    flex:1,
    padding: 30,
    marginTop: 65,
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  }
});

var PickerItemIOS = PickerIOS.Item;

function urlForQueryAndPage(searchString) {

  var API_KEY = 'dfa8b5756339d7482cb36d5653327010';
  var API_Search = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
  var API_getRecent = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent';
  var Params = '&api_key=' + API_KEY + '&format=json&nojsoncallback=1';
  var textSearch = '&text=';

  if(searchString){
    return 'https://api.flickr.com/services/rest/?method=flickr.photos.search' + Params + textSearch + searchString;
  }

  return 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent' + Params;
};


var sortingOptions = {
  sort: ['None', 'Relevance', 'Date: Asc', 'Date: Desc']
};

class searchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      isLoading: false,
      message: ''
    };
  }

  handleResponse(response) {
    this.setState({ isLoading: false });
    if (response) {
      this.props.navigator.push({
        title: 'Results',
        component: showPhotos,
        passProps: response
      });
    } else {
      this.setState({ message: 'Location not recognized please try again.'});
    }
  }

  executeQuery(query) {
    this.setState({ isLoading: true, message: '' });
    fetch(query)
      .then(response => response.json())
      .then(json => this.handleResponse(json))
      .catch(error => {
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
        });
      });
  }

  onSearchPressed() {
    var query = urlForQueryAndPage(this.state.searchString);
    if(this.state.optionChosen && this.state.optionChosen !== "None" && this.state.searchString){
      if(this.state.optionChosen == 'Date: Desc'){
        query = query + '&sort=' + 'date-posted-desc';
      }
      else if(this.state.optionChosen == 'Relevance'){

        query = query + '&sort=' + 'relevance';
      }
      else{
        query = query + '&sort=' +'date-posted-asc';
      }

    }
    this.executeQuery(query);
  }

  onSearchTextChanged(event) {
    this.setState({ searchString: event.nativeEvent.text });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search Flickr for Images
        </Text>
        
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            placeholder='Photos, people, or groups'
            onChange={this.onSearchTextChanged.bind(this)}/>
          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.onSearchPressed.bind(this)}>              
            <Text style={styles.buttonText}>Search</Text>
          </TouchableHighlight>
        </View>

        <Text>Sort By: </Text>
        
        <PickerIOS
          selectedValue={this.state.optionChosen}
          onValueChange={(optionChosen) => this.setState({optionChosen})}>
          {sortingOptions['sort'].map((option) => (
            <PickerItemIOS
              key={option}
              value={option}
              label={option}
            />
          ))}
        </PickerIOS>

        
      </View>
    );
  }
}

module.exports = searchPage;
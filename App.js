
import React, {useState, useCallback} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Text,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  
  
  const api = {
    key : '1e76348125829550a45fdc38ebfe2e82' ,
    baseUrl : ' http://api.openweathermap.org/data/2.5/ ' ,
   } ;

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput("");
    axios({
      method: 'GET',
      url : `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}` 
    }).then(res => {
      console.log(res.data);
      setData(res.data);
    })
    .catch(e => console.dir(e))
    .finally(() => setLoading(false))
  }, [api.key, input])

  return (
    <View style={styles.root}>
      <ImageBackground source={require('./src/assets/dark.jpeg')}
      resizeMode='cover'
      style={styles.image}>
        <View>
          <TextInput placeholder='Enter city name...'
          onChangeText={text => setInput(text)}
          value={input}
          placeholderTextColor={'#000'}
          style={styles.textInput}
          onSubmitEditing={fetchDataHandler}
          >
             
          </TextInput>
        </View>
        {loading && (<View>
           <ActivityIndicator size={'large'} color='#000'/>
          </View>)}
        {data &&  (
          <View style={styles.infoView}>
            <Text style={styles.cityText}>
                {`${data?.name}, ${data?.sys?.country}`}
            </Text>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString()}
            </Text>
            <Text style={styles.tempText}>
              {`${Math.round(data?.main?.temp)}`} °C
            </Text>
            <Text style={styles.minMax}>
              {`Min ${Math.round(data?.main?.temp_min)}`} °C  /
              {`  Max ${Math.round(data?.main?.temp_max)}`} °C
            </Text>
          </View>)}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: 'column'
  },
  textInput: {
    padding:10,
    paddingVertical:20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 19,
    borderRadius: 16,  
    opacity: 0.5,
  },
  infoView: {
    alignItems: 'center'
  },
  cityText: {
    color: '#fff',
    fontSize: 45,
    fontWeight: 'bold'
  },
  dateText: {
    color: '#fff',
    fontSize: 22,
    marginVertical:10
  },
  tempText: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
    marginVertical:12
  },
  minMax: {
    color: '#fff',
    fontSize: 15,
    marginVertical:10
  }
});

export default App;

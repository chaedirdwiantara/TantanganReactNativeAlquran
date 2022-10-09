import React, {useState , useEffect} from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Flatlist } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([])
  
  const getFood = async () => {
    try {
      const response = await fetch('https://dev-dummy-api.jelantah.org/api/foods/get');
      const json = await response.json();
      setData(json)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getFood();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      )  : (
        <Flatlist 
          data = {data?.data.data}
          keyExtractor= {({id}, index) => id}
          renderItem={({item}) => (
            <Text>
              {item?.food_name}
            </Text>
          )}
        />
      ) }      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },  
});

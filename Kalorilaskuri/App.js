import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [weight, setWeight] = useState('');
  const [intensity, setIntensity] = useState(1.3);
  const [gender, setGender] = useState('male');
  const [calories, setCalories] = useState(null);

  let activityArray = [];
  activityArray.push({label: 'light', value: 1.3});
  activityArray.push({label: 'usual', value: 1.5});
  activityArray.push({label: 'moderate', value: 1.7});
  activityArray.push({label: 'hard', value: 2.0});
  activityArray.push({label: 'very hard', value: 2.2});

  let genderArray = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ];

  const calculateCalories = () => {
    const mass = parseFloat(weight);
    if (!isNaN(mass)) {
      let E;
      if (gender === 'male') {
        E = (879 + 10.2 * mass) * intensity;
      } else {
        E = (795 + 7.18 * mass) * intensity;
      }
      setCalories(E.toFixed(2));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Weight:</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Enter your weight (kg)"
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Intensity:</Text>
      <Picker
        selectedValue={intensity}
        onValueChange={(itemValue) => setIntensity(itemValue)}
      >
        {activityArray.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>

      <Text style={styles.label}>Gender:</Text>
      <RadioForm
        radio_props={genderArray}
        initial={0}
        onPress={(value) => { setGender(value) }}
      />

      <Button title="Calculate" onPress={calculateCalories} />

      {calories !== null && (
        <Text style={styles.result}>Calories needed: {calories}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
  result: {
    fontSize: 18,
    marginTop: 16,
  },
});

export default App;
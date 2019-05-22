import React, { Component } from 'react';
import { TextField, Paper, MenuItem, Grid, Typography } from '@material-ui/core';
import CharacterClassesProvider from '../services/CharacterClassesProvider';
import CharacterWeaponsProvider from '../services/CharacterWeaponsProvider';
import { debounce } from 'lodash';

class Example3 extends Component {

  state = {
    name: '',
    selectedClass: 'Warrior',
    selectedWeapon: 'Axe',
    availableClasses: [],
    availableWeapons: []
  };

  componentDidMount = async () => {
    const name = this.load('name', '');
    const selectedClass = this.load('selectedClass', 'Warrior');
    const selectedWeapon = this.load('selectedWeapon', 'Axe');
    const availableClasses = await CharacterClassesProvider(); 
    const availableWeapons = await CharacterWeaponsProvider(selectedClass);

    this.setState({
      name: name,
      selectedClass: selectedClass,
      selectedWeapon: selectedWeapon,
      availableClasses: availableClasses,
      availableWeapons: availableWeapons
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.name !== this.state.name) {
      this.saveName(this.state.name);
    }
    if (prevState.selectedClass !== this.state.selectedClass) {
      this.saveSelectedClass(this.state.selectedClass);
    }
    if (prevState.selectedWeapon !== this.state.selectedWeapon) {
      this.saveSelectedWeapon(this.state.selectedWeapon);
    }
  }

  load = (key, defaultValue) => {
    try {
      const value = localStorage.getItem(key);
      if (!value) {
        return defaultValue;
      }

      return JSON.parse(value);
    }
    catch(error) {
      console.warn(error);
      return defaultValue;
    }
  }

  saveName = debounce((value) => {
    try {
      localStorage.setItem('name', JSON.stringify(value));
    }
    catch (error) {
      console.warn(error);
    }
  }, 1000);

  saveSelectedClass = debounce((value) => {
    try {
      localStorage.setItem('selectedClass', JSON.stringify(value));
    }
    catch (error) {
      console.warn(error);
    }
  }, 1000);

  saveSelectedWeapon = debounce((value) => {
    try {
      localStorage.setItem('selectedWeapon', JSON.stringify(value));
    }
    catch (error) {
      console.warn(error);
    }
  }, 1000);

  onClassChange = async (event) => {
    const selectedClass = event.target.value;
    this.setState({
      selectedClass: selectedClass
    });

    const availableWeapons = await CharacterWeaponsProvider(selectedClass);
    this.setState({
      selectedWeapon: availableWeapons[0].value,
      availableWeapons: availableWeapons
    });
  }

  render = () => {
    const { name, selectedClass, selectedWeapon, availableClasses, availableWeapons } = this.state;

    return (
      <>
        <Typography variant="h6" style={{ margin: 16 }}>Example 3</Typography>
        <Paper style={{ margin: 16, padding: 16 }}>
          <form>
            <Grid container spacing={8}>
              <Grid item xs={4}>
                <TextField 
                  label="Character Name"
                  value={name}
                  onChange={event => this.setState({ name: event.target.value })}
                  fullWidth
                />  
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Class"
                  value={selectedClass}
                  onChange={this.onClassChange}
                  fullWidth
                >
                  {availableClasses.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Weapon"
                  value={selectedWeapon}
                  onChange={event => this.setState({ selectedWeapon: event.target.value })}
                  fullWidth
                >
                  {availableWeapons.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Paper style={{ margin: 16, padding: 16 }}>
          <pre>
            {JSON.stringify(this.state, null, 2)}
          </pre>
        </Paper>
      </>
    );
  }
}

export default Example3;

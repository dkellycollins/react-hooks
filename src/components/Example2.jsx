import React, { Component } from 'react';
import { TextField, Paper, MenuItem, Grid, Typography } from '@material-ui/core';
import CharacterClassesProvider from '../services/CharacterClassesProvider';
import CharacterWeaponsProvider from '../services/CharacterWeaponsProvider';

class Example2 extends Component {

  state = {
    name: '',
    selectedClass: 'Warrior',
    selectedWeapon: 'Axe',
    availableClasses: [],
    availableWeapons: []
  };

  componentDidMount = async () => {
    const availableClasses = await CharacterClassesProvider(); 
    const selectedClass = availableClasses[0].value;

    const availableWeapons = await CharacterWeaponsProvider(selectedClass);
    const selectedWeapon = availableWeapons[0].value;

    this.setState({
      selectedClass: selectedClass,
      availableClasses: availableClasses,
      selectedWeapon: selectedWeapon,
      availableWeapons: availableWeapons
    });
  }

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
        <Typography variant="h6" style={{ margin: 16 }}>Example 2</Typography>
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

export default Example2;

import React, { Component } from 'react';
import { TextField, Paper, MenuItem, Grid, Typography } from '@material-ui/core';
import CharacterClassesProvider from '../services/CharacterClassesProvider';
import CharacterWeaponsProvider from '../services/CharacterWeaponsProvider';
import { isEqual } from 'lodash';


class Example3 extends Component {

  state = {
    character: {
      name: '',
      selectedClass: 'Warrior',
      selectedWeapon: 'Axe',
    },
    availableClasses: [],
    availableWeapons: []
  };

  componentDidMount = async () => {
    const character = this.loadCharacter({ name: '', selectedClass: 'Warrior', selectedWeapon: 'Axe' });
    const availableClasses = await CharacterClassesProvider(); 
    const availableWeapons = await CharacterWeaponsProvider(character.selectedClass);

    this.setState({
      character: character,
      availableClasses: availableClasses,
      availableWeapons: availableWeapons
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState.character, this.state.character)) {
      localStorage.setItem('character', JSON.stringify(this.state.character));
    }
  }

  loadCharacter = (defaultValue) => {
    try {
      const character = localStorage.getItem('character');
      if (!character) {
        return defaultValue;
      }

      return JSON.parse(character);
    }
    catch(error) {
      console.warn(error);
      return defaultValue;
    }
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
    const { character, availableClasses, availableWeapons } = this.state;

    return (
      <>
        <Typography variant="h6" style={{ margin: 16 }}>Example 3</Typography>
        <Paper style={{ margin: 16, padding: 16 }}>
          <form>
            <Grid container spacing={8}>
              <Grid item xs={4}>
                <TextField 
                  label="Character Name"
                  value={character.name}
                  onChange={event => {
                    this.setState({ 
                      character: {
                        ...character,
                        name: event.target.value 
                      }
                    });
                  }}
                  fullWidth
                />  
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Class"
                  value={character.selectedClass}
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
                  value={character.selectedWeapon}
                  onChange={event => {
                    this.setState({ 
                      character: {
                        ...character,
                        selectedWeapon: event.target.value 
                      }
                    });
                  }}
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
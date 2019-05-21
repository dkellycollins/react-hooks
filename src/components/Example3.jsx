import React, { Component } from 'react';
import { TextField, Paper, MenuItem, Grid, Typography } from '@material-ui/core';
import CharacterClassesProvider from '../services/CharacterClassesProvider';
import CharacterWeaponsProvider from '../services/CharacterWeaponsProvider';
import { debounce, isEqual } from 'lodash';

/**
 * In this example we continue building on the previous example to "save" the state of the form after 1 second. 
 * For the purposes of the demo, this just updates the component with the saved data. To convert this example to a functional
 * component we can create a custom hook that debounces changes.
 */

class Example3 extends Component {

  state = {
    character: {
      name: '',
      selectedClass: 'Warrior',
      selectedWeapon: 'Axe',
    },
    savedCharacter: null,
    availableClasses: [],
    availableWeapons: []
  };

  componentDidMount = async () => {
    const availableClasses = await CharacterClassesProvider(); 
    const selectedClass = availableClasses[0].value;

    const availableWeapons = await CharacterWeaponsProvider(selectedClass);
    const selectedWeapon = availableWeapons[0].value;

    this.setState({
      character: {
        ...this.state.character,
        selectedClass: selectedClass,
        selectedWeapon: selectedWeapon
      },
      availableClasses: availableClasses,
      availableWeapons: availableWeapons
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!isEqual(prevState.character, this.state.character)) {
      this.saveCharacter()
    }
  }

  saveCharacter = debounce(() => {
    this.setState({
      savedCharacter: {
        ...this.state.character,
        savedOn: new Date()
      }
    });
  }, 2000);

  onClassChange = async (event) => {
    const selectedClass = event.target.value;
    this.setState({
      character: {
        ...this.state.character,
        selectedClass: selectedClass
      }
    });

    const availableWeapons = await CharacterWeaponsProvider(selectedClass);
    this.setState({
      character: {
        ...this.state.character,
        selectedWeapon: availableWeapons[0].value
      },
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
                    })
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
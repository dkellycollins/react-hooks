import React, { useState, useEffect } from 'react';
import { TextField, Paper, MenuItem, Grid, Typography } from '@material-ui/core';
import CharacterClassesProvider from '../services/CharacterClassesProvider';
import CharacterWeaponsProvider from '../services/CharacterWeaponsProvider';

function useLocalStorage(key, defaultState) {
  const [state, setState] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      if (!value) {
        return defaultState;
      }

      return JSON.parse(value);
    }
    catch (error) {
      console.warn(error);
      return defaultState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

function Example3() {
  const [character, setCharacter] = useLocalStorage('Character', { name: '', selectedClass: 'Warrior', selectedWeapon: 'Axe' });
  const [availableClasses, setAvailableClasses] = useState([]);
  const [availableWeapons, setAvailableWeapons] = useState([]);

  //Load the list of classes.
  useEffect(() => {
    const loadAvailableClasses = async () => {
      setAvailableClasses(await CharacterClassesProvider());
    }
    loadAvailableClasses();
  }, []);
  //Load the list of weapons when a class has been selected.
  useEffect(() => {
    const loadAvailableWeapons = async () => {
      setAvailableWeapons(await CharacterWeaponsProvider(character.selectedClass));
    }
    loadAvailableWeapons();
  }, [character.selectedClass]);
  //Select the first weapon then the list of weapons changes.
  useEffect(() => {
    const selectedWeapon = availableWeapons.find(weapon => weapon.value === character.selectedWeapon);
    if (availableWeapons.length !== 0 && !selectedWeapon) {
      setCharacter(c => ({
        ...c,
        selectedWeapon: availableWeapons[0].value
      }));
    }
  }, [character.selectedWeapon, availableWeapons]);

  return (
    <>
      <Typography variant="h6" style={{ margin: 16 }}>Example 3 Complete</Typography>
      <Paper style={{ margin: 16, padding: 16 }}>
        <form>
          <Grid container spacing={8}>
            <Grid item xs={4}>
              <TextField 
                label="Character Name"
                value={character.name}
                onChange={event => setCharacter({ ...character, name: event.target.value })}
                fullWidth
              />  
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="Class"
                value={character.selectedClass}
                onChange={event => setCharacter({ ...character, selectedClass: event.target.value})}
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
                onChange={event => setCharacter({ ...character, selectedWeapon: event.target.value })}
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
          {JSON.stringify({
            character,
            availableClasses,
            availableWeapons
          }, null, 2)}
        </pre>
      </Paper>
    </>
  );
}

export default Example3;
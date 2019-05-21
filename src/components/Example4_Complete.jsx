import React, { useState, useEffect } from 'react';
import { TextField, Paper, MenuItem, Grid, Typography } from '@material-ui/core';
import CharacterClassesProvider from '../services/CharacterClassesProvider';
import CharacterWeaponsProvider from '../services/CharacterWeaponsProvider';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}

function Example4() {
  const [character, setCharacter] = useState({ name: '', selectedClass: 'Warrior', selectedWeapon: 'Axe' });
  const [savedCharacter, setSavedCharacter] = useState(null);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [availableWeapons, setAvailableWeapons] = useState([]);
  const debouncedCharacter = useDebounce(character, 2000);

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
  //Select the first class when the list of classes changes.
  useEffect(() => {
    if (availableClasses.length !== 0) {
      setCharacter(c => ({
        ...c,
        selectedClass: availableClasses[0].value
      }));
    }
  }, [availableClasses]);
  //Select the first weapon then the list of weapons changes.
  useEffect(() => {
    if (availableWeapons.length !== 0) {
      setCharacter(c => ({
        ...c,
        selectedWeapon: availableWeapons[0].value
      }));
    }
  }, [availableWeapons]);
  //Update the savedCharacter when the debouncedCharacter changes.
  useEffect(() => {
    setSavedCharacter({
      ...debouncedCharacter,
      savedOn: new Date()
    });
  }, [debouncedCharacter]);

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
                onChange={event => setCharacter({ ...character, selectedClass: event.target.value })}
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
                onChange={event => setCharacter({ ...character, selectedClass: event.target.value })}
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
            savedCharacter,
            availableClasses,
            availableWeapons
          }, null, 2)}
        </pre>
      </Paper>
    </>
  );
}

export default Example4;
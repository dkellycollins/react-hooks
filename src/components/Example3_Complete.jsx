import React, { useState, useEffect } from 'react';
import { TextField, Paper, MenuItem, Grid, Typography } from '@material-ui/core';
import CharacterClassesProvider from '../services/CharacterClassesProvider';
import CharacterWeaponsProvider from '../services/CharacterWeaponsProvider';

function useLocalStorage(key, defaultState, delay) {
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
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      }
      catch (error) {
        console.warn(error);
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [key, state, delay]);

  return [state, setState];
}

function Example3() {
  const [name, setName] = useLocalStorage('name', '', 1000);
  const [selectedClass, setSelectedClass] = useLocalStorage('selectedClass', 'Warrior', 1000);
  const [selectedWeapon, setSelectedWeapon] = useLocalStorage('selectedWeapon', 'Axe', 1000);
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
      setAvailableWeapons(await CharacterWeaponsProvider(selectedClass));
    }
    loadAvailableWeapons();
  }, [selectedClass]);
  //Select the first weapon then the list of weapons changes.
  useEffect(() => {
    const match = availableWeapons.find(weapon => weapon.value === selectedWeapon);
    if (availableWeapons.length !== 0 && !match) {
      setSelectedWeapon(availableWeapons[0].value);
    }
  }, [availableWeapons, selectedWeapon]);

  return (
    <>
      <Typography variant="h6" style={{ margin: 16 }}>Example 3 Complete</Typography>
      <Paper style={{ margin: 16, padding: 16 }}>
        <form>
          <Grid container spacing={8}>
            <Grid item xs={4}>
              <TextField 
                label="Character Name"
                value={name}
                onChange={event => setName(event.target.value)}
                fullWidth
              />  
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="Class"
                value={selectedClass}
                onChange={event => setSelectedClass(event.target.value)}
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
                onChange={event => setSelectedClass(event.target.value)}
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
            name,
            selectedClass,
            selectedWeapon,
            availableClasses,
            availableWeapons
          }, null, 2)}
        </pre>
      </Paper>
    </>
  );
}

export default Example3;

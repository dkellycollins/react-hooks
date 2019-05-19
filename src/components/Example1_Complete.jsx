import React, { useState } from 'react';
import { TextField, Paper, MenuItem, Grid, Typography } from '@material-ui/core';

const characterClass = [
  { label: 'Warrior', value: 'Warrior' },
  { label: 'Archer', value: 'Archer' },
  { label: 'Mage', value: 'Mage' }
];

const characterWeapon = {
  Warrior: [
    { label: 'Sword', value: 'Sword' },
    { label: 'Axe', value: 'Axe' },
    { label: 'Big Stick', value: 'Big Stick' }
  ],
  Archer: [
    { label: 'Bow', value: 'Bow' },
    { label: 'Gun', value: 'Gun' }
  ],
  Mage: [
    { label: 'Default Staff', value: 'Default Staff' },
    { label: 'Staff of Klovzaannaak', value: 'Staff of Eovuntayl' }
  ]
}

function Example1() {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState('Warrior');
  const [selectedWeapon, setSelectedWeapon] = useState('Axe');

  return (
    <>
      <Typography variant="h6" style={{ margin: 16 }}>Example 1 Complete</Typography>
      <Paper style={{ margin: 16, padding: 16 }}>
        <form>
          <Grid container spacing={8}>
            <Grid item xs={4}>
              <TextField 
                label="Character Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
              />  
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="Class"
                value={selectedClass}
                onChange={(event) => setSelectedClass(event.target.value)}
                fullWidth
              >
                {characterClass.map(option => (
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
                onChange={(event) => setSelectedWeapon(event.target.value)}
                fullWidth
              >
                {characterWeapon[selectedClass].map(option => (
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
            selectedWeapon
          }, null, 2)}
        </pre>
      </Paper>
    </>
  )
}

export default Example1;
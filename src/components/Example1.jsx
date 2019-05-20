import React, { Component } from 'react';
import { TextField, Paper, MenuItem, Grid, Typography } from '@material-ui/core';

/**
 * The is a bare minimum example of managing state in react. The goal is to update this class to be
 * a functional component with "useState"
 */

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
    { label: 'Staff of Klovzaannaak', value: 'Staff of Klovzaannaak' }
  ]
};

class Example1 extends Component {

  state = {
    name: '',
    selectedClass: 'Warrior',
    selectedWeapon: 'Axe'
  };

  render = () => {
    const { name, selectedClass, selectedWeapon } = this.state;

    return (
      <>
        <Typography variant="h6" style={{ margin: 16 }}>Example 1</Typography>
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
                  onChange={event => this.setState({ selectedClass: event.target.value })}
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
                  onChange={event => this.setState({ selectedWeapon: event.target.value })}
                  fullWidth
                >
                  {characterWeapon[this.state.selectedClass].map(option => (
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

export default Example1;
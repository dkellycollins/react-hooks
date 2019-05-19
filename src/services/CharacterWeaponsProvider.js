
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
};

function CharacterWeaponsProvider(characterClass) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(characterWeapon[characterClass]);
    });
  });
}

export default CharacterWeaponsProvider;
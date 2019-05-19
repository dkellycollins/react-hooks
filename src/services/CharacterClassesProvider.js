
const characterClass = [
  { label: 'Warrior', value: 'Warrior' },
  { label: 'Archer', value: 'Archer' },
  { label: 'Mage', value: 'Mage' }
];

function CharacterClassesProvider() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(characterClass);
    });
  });
}

export default CharacterClassesProvider;
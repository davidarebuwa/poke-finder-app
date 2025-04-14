 const getTypeColor = (type) => {
    const colors = {
      fire: '#f08030',
      water: '#6890f0',
      grass: '#78c850',
      electric: '#f8d030',
      psychic: '#f85888',
      ice: '#98d8d8',
      dragon: '#7038f8',
      dark: '#705848',
      fairy: '#ee99ac',
      normal: '#a8a878',
      // Add more as needed
    };
    return colors[type] || '#ccc';
  };

  export default getTypeColor;

  
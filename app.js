const api = require('./api.js');
const history = require('./history.js');
const prompts = require('prompts');

const displayResults = async (keyword, limit) => {
    const results = await api.searchPlayers(keyword);

    if (!results || results.length === 0) {
        console.log('No results found.');
        return;
    }

    results.forEach((result, index) => {
        if (limit === undefined || index < limit) {
            console.log(`${index + 1}. ${result.strPlayer} (${result.strTeam} - ${result.strSport})`);
        }
    });

    history.saveSearch(keyword, results.length);

    const response = await prompts([
        {
            type: 'number',
            name: 'choice',
            message: 'Select a player by typing their number:',
            validate: (value) => (value > 0 && value <= results.length ? true : 'Please enter a valid number'),
        },
    ]);

    const index = response.choice - 1;
    const player = results[index];

    if (player) {
        const details = await api.lookUpId(player.idPlayer);
        console.log(`\n${details.strPlayer} - ${details.strTeam}`);
        console.log(`Nationality: ${details.strNationality}`);
        console.log(`Position: ${details.strPosition}`);
        console.log(`Birth Date: ${details.dateBorn}`);
        console.log(`Birth Place: ${details.strBirthLocation}`);
        console.log(`Description: ${details.strDescriptionEN}\n`);
    } else {
        console.log('Invalid selection.');
    }
};

module.exports = {
    displayResults
};

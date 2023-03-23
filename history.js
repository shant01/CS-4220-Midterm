const fs = require('fs');
const path = require('path');

const historyFilePath = path.join(__dirname, 'history.json');

const readHistory = () => {
    try {
        const data = fs.readFileSync(historyFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        } else {
            throw error;
        }
    }
};

const saveSearch = (search, resultCount) => {
    const history = readHistory();

    history.push({
        search,
        resultCount,
    });

    fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));
};

module.exports = {
    saveSearch
};

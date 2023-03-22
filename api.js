const axios = require('axios');

const url = 'https://www.thesportsdb.com/api/v1/json/1';
const endpoint = `${url}/searchteams.php`;
const LOOKUP_TEAM_ENDPOINT = `${url}/lookupteam.php`;

const searchTeams = async (keyword) => {
  try {
    const response = await axios.get(`${url}/searchteams.php?t=${encodeURIComponent(keyword)}`);
    return response.data.teams;
  } catch (err) {
    console.error(err);
    return [];
  }
}

const getTeamDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/lookupteam.php?id=${encodeURIComponent(id)}`);
    return response.data.teams[0];
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = {
  searchTeams,
  getTeamDetails,
};

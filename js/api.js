const BASE_URL = "https://api.football-data.org/v2";
const API_KEY = "d4c8e57786be471aa408d140af54fb65";
const LEAGUE_ID = 2021


function statusResponse(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function jsonResponse(response) {
  return response.json();
}

function errorResponse(error) {
  console.error("Error at::", error);
}

function getStandingsCompetitions(idLiga) {
  if ("caches" in window) {
    caches
      .match(`${BASE_URL}/competitions/PL/standings`)
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            standingsTable(data);
          });
        }
      });
  }

  fetch(`${BASE_URL}/competitions/PL/standings`, {
    method: "GET",
    headers: {
      "X-Auth-Token": API_KEY,
    },
  })
    .then(statusResponse)
    .then(jsonResponse)
    .then((data) => {
      standingsTable(data);
    })
    .catch(errorResponse);
}

function getMatchesCompetitions(PL, matchDay = 1) {
  if ("caches" in window) {
    caches
      .match(`${BASE_URL}/competitions/PL/matches?matchday=${matchDay}`)
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            matchesTable(data);
          });
        }
      });
  }

  fetch(`${BASE_URL}/competitions/PL/matches?matchday=${matchDay}`, {
    method: "GET",
    headers: {
      "X-Auth-Token": API_KEY,
    },
  })
    .then(statusResponse)
    .then(jsonResponse)
    .then((data) => {
      matchesTable(data);
    })
    .catch(errorResponse);
}
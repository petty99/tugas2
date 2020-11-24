function matchesTable(data) {
  let matches = "";

  if (matches.status === "FINISHED") {
    score = `${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}`;
    status = 'Full Time';
    statusClass = 'red';
} else if(matches.status === "POSTPONED") {
    score = '-';
    statusClass = 'red';
} else {
    status = '';
}

  data.matches.map((team) => {
    matches += `
    <div class="col s12 m6">
      <div class="card">
        <div class="statustim"><span>${team.status}</span></div>
        <hr>
        <div class="card-content black-text">
            <div class="team-wrapper">
              <div class="vs-team">
                <p><strong>${team.awayTeam.name}</strong></p>
                <p><strong>${team.homeTeam.name}</strong></p>
              </div>
              <div class="tim-tim">
                <span class="card-title">${team.utcDate}</span>
              </div>
            </div>
        </div>
      </div>
    </div>
    `;
  });
  document.getElementById("matches").innerHTML = matches;
  document.getElementById('preloader').innerHTML = '';
}

function standingsTable(data) {
  data = JSON.parse(JSON.stringify(data).replace(/http:/g, "https:"));
  let standings = "";
  data.standings[0].table.map((team, index) => {
    standings += `
      <tr>
        <td class="standingsTeamName">
          <span>${index + 1}. </span>
          <figure class="standingsTeamLogo">
              <img src="${team.team.crestUrl}" alt="${team.team.name}">
          </figure>
          <h6 class="blue-grey-text text-darken-2">${team.team.name}</h6>
        </td>
        <td>${team.playedGames}</td>
        <td>${team.won}</td>
        <td>${team.draw}</td>
        <td>${team.lost}</td>
        <td>${team.goalsFor}</td>
        <td>${team.goalsAgainst}</td>
        <td>${team.goalDifference}</td>
        <td>${team.points}</td>
      </tr>
    `;
  });
  let standingsEl = document.getElementById("standings");
  if (standingsEl) standingsEl.innerHTML = standings;
}

function getDetailTeam() {
  return new Promise((resolve, reject) => {
    var urlParams = new URLSearchParams(window.location.search).get("id");

    if ("caches" in window) {
      caches.match(`${BASE_URL}/teams/${urlParams}`).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            teamProfile(data);
            resolve(data);
          });
        }
      });
    }

    fetch(`${BASE_URL}/teams/${urlParams}`, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    })
      .then(statusResponse)
      .then(jsonResponse)
      .then((data) => {
        teamProfile(data);
        resolve(data);
      })
      .catch(errorResponse);
  });
}

function teamProfile(data) {
  data = JSON.parse(JSON.stringify(data).replace(/http:/g, "https:"));
  let activeCompetitions = "";
  data.activeCompetitions.map((competition) => {
    activeCompetitions += `
      <li class="collection-item">${competition.name}</li>
    `;
  });

  let teamProfile = `
  <div class="card teamProfile">
    <div class="row">
        <div class="col s12 m12" style="padding-bottom: 10px; border-bottom: 2px solid #ccc; text-align: center;">
          <figure class="teamProfileImg">
            <img src="${data.crestUrl}" alt="${data.name}" style="width:100%">
          </figure>
          <h2>${data.name}</h2>
        </div>
  </div>`;
  document.getElementById("content").innerHTML = teamProfile;
}

function getFavoriteTeam() {
  dbGetAllFavoriteTeam().then(function(teams) {
    let favoriteTeam = "";
    teams.map(team => {
      favoriteTeam += `
          <div class="col s15 m15">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img
                  src="${team.logo}"
                  style="max-height: 48px; width="48px" margin: 20px auto"
                />
              </div>
              <div class="card-content">
                <span class="card-title truncate">${team.name}</span>
                <ul>
                  <li class="collection-item">${team.venue}</li>
                </ul>
                <button onclick="dbDeleteFavoriteTeam(${team.id},'${team.name}')" 
              class="waves-effect waves-light btn red">HAPUS</button>
              </div>
            </div>
          </div>
          `;
    });
    if (favoriteTeam.length < 1) favoriteTeam = '<h6 style="padding-left: 15px">Tidak Ada Tim yang Ditambahkan </h6>'
    document.getElementById("favorite").innerHTML = favoriteTeam;
  });
}

function getTeams() {
  if('caches' in window){
      caches.match(`${BASE_URL}/competitions/PL/teams`)
      .then(res => {
          if(res){
              res.json()
              .then(data => {
                  let teamsHTML = ''
                  data = data.teams
                  data.forEach(team => {
                      let urlTeamImage = team.crestUrl
                      urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
                      teamsHTML  += `
                      <div class="col s12 m6">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${urlTeamImage}" height="48px" width="48px" alt="${team.name}"/>
              </div>
              <div class="card-content text-center">
                <span class="card-title truncate">${team.name}</span>
                <ul>
                  <li class="collection-item">${team.venue}</li>
                </ul>
                <ul>
                  <li class="attendance">${team.address}</li>
                </ul>
                <button onclick="dbInsertFavoriteTeam(${team.id},'${urlTeamImage}','${team.name}','${team.venue}','${team.address}')" 
                class="white-text btn blue accent-3">Add Favorite</button>
              </div>
            </div>
          </div>`
                  })
                  document.getElementById('teams').innerHTML = teamsHTML
              })
          }
      })

  }
  fetch(`${BASE_URL}/competitions/PL/teams`,{
      headers : {
          'X-Auth-Token' : API_KEY
      }
  })
  .then(status)
  .then(res => res.json())
  .then(data => {
      let teamsHTML = ''
      data = data.teams
      data.forEach(team => {
          let urlTeamImage = team.crestUrl
          urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
          teamsHTML  += `
          <div class="col s12 m6">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${urlTeamImage}" height="48px" width="48px" alt="${team.name}"/>
              </div>
              <div class="card-content text-center">
                <span class="card-title truncate">${team.name}</span>
                <ul>
                  <li class="collection-item">${team.venue}</li>
                </ul>
                <ul>
                  <li class="attendance">${team.address}</li>
                </ul>
                <button onclick="dbInsertFavoriteTeam(${team.id},'${urlTeamImage}','${team.name}','${team.venue}','${team.address}')" 
            class="white-text btn blue accent-3">Add Favorite</button>
              </div>
            </div>
          </div>`
      })
      document.getElementById('teams').innerHTML = teamsHTML
  })
  .catch(err => console.log(err))
}

function toast(text) {
  return M.toast({html: `<p class="center-align white-text text-lighten-2">${text}</p>`, classes: 'red'});
}

const preLoader = 
`<div class="preloader-wrapper big active">
    
        <div class="circle-clipper right">
            <div class="circle"></div>
        </div>
        <div class="gap-patch">
            <div class="circle"></div>
        </div>
        <div class="circle-clipper left">
            <div class="circle"></div>
        </div>
    </div>
</div>`;
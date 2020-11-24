const idbPromised = idb.open("yunifootball_db", 1, (upgradedDb) => {
  if (!upgradedDb.objectStoreNames.contains("teams")) {
    upgradedDb.createObjectStore("teams");
  }
});

const dbGetAllFavoriteTeam = () => {
  return idbPromised.then(db => {
    let transaction = db.transaction("teams", `readonly`);
    return transaction.objectStore("teams").getAll();
  }).then(data => data)
  .catch(() => console.log("Data Kosong"))
};

const dbInsertFavoriteTeam = (id, logo, name, venue, score) => {
  //let confirm = window.confirm(`Apakah yakin ingin menambahkan klub ${name} ke Favorit ?`)
  let item = {
    id: id,
    logo: logo,
    name: name,
    venue: venue,
    score:score,
  };

  if(confirm){
    idbPromised.then(db => {
      let transaction = db.transaction('teams', 'readwrite');
      transaction.objectStore('teams').put(item, id);
      return transaction;
    }).then(transaction => {
      if (transaction.complete) {
        toast(`Tim favorit ${name} berhasil ditambahkan.`)
        pushNotification('Menambahkan Tim Favorit', `Tim favorit ${name} berhasil ditambahkan.`)
      }
    }).catch(() => console.log("Gagal Menyimpan Tim."))
  }
};

const dbDeleteFavoriteTeam = (id, name) => {
  //let confirm = window.confirm(`Apakah anda akan menghapus ${name} dari Favorit ?`)

  if(confirm){
    idbPromised.then(db => {
      let transaction = db.transaction('teams', 'readwrite');
      transaction.objectStore('teams').delete(id);
      return transaction;
    }).then(transaction => {
      if (transaction.complete) {
        toast(`Tim favorit ${name} berhasil dihapus.`)
        pushNotification('Menambahkan Tim Favorit', `Tim favorit ${name} berhasil dihapus.`)
      }
    }).catch(() => console.log("Gagal Menyimpan Tim."))
  }
};

const pushNotification = (title, message) => {
  const options = {
      body: message
  };
  if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(regis => {
          regis.showNotification(title, options);
      });
  } else {
      console.error('Fitur notifikasi tidak diizinkan.');
  }
}
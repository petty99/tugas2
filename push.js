var webPush = require("web-push");

const vapidKeys = {
  publicKey:"BDb0nELMMBSwxcPrBXbSOVzejM5aOLbhKZenBgambBMw_v7GMamtLsxUNcQJw8I0wBWyarjyiM7VbLPNPlGpxsw",
  privateKey:"nTKIZdKRg5GoDVMWgKwjmumCN6HlSmUNs6uXbuMaOJ0",
};

webPush.setVapidDetails(
  "mailto: <yunitarisandi99@gmail.com>",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/cSVY5Wbb2Gw:APA91bFfn_Ux8CK77xZd0hu8MMp73j214WohEJ2-ww6PDXwMcsu49DxR-bRJxYlXSJCt3Xis7RmKa0Sufc_l3SBoRJxqPutpkTWlfNTlnZnhvj520ul5Jn_nWRHRx2cNFdZFpWFz7vAv",
  keys: {
    p256dh:
      "BLhWbewHymdBskdtUR+gLzWxO+ZZkdvOwTXEXc4UxHsYSALGfDuQ/ecLq0f7UtmtHZVi/qCwpI2L3tUc0BFvmYA=",
    auth: "1xpmi4A3dhtS/cLyCv98Mg==",
  },
};
var payload = 'Selamat! Aplikasi anda sudah dapat menerima push notifikasi';
var options = {
  gcmAPIKey: "580211239650",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);

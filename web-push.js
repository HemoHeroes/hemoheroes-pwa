const publicVapidKey =
  "BJu_4-wfWdkSMwLrLzSbllzNHnuWFdYnGmZbNk7damnfOReovgffVPyzEk6yJBNRg6Qz2gpR5nZf-uka462Zh4M";

// Check for service worker
if ("serviceWorker" in navigator) {
  console.log("entrou auqi???")
  send().catch(err => console.log(err));
}

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  const register = await navigator.serviceWorker.register("/sw.js", {
    scope: "/"
  });

  // Register Push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  let user = window.localStorage.getItem("login") == null ? null : JSON.parse(window.localStorage.getItem("login")).email;

  let fetchs = await fetch("https://www.hemoheroes.com/api/v1/notifications", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
      "User": user
    }
  });
  return fetchs;
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);  
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
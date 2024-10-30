// lib/firebaseAdmin.js
import admin from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: "playspark-c6ad4",
  private_key_id: "43712512b7d4444d3d2b9892f715dabb19f35da3",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCfF7U5ZfzDppFD\n7mRDud6CtBQ58NqmsSZWYrAjPPFazhZAGWWssH6/NXl1kGndRERdvWLvmomNPq4/\nOGSlGr6c6hqyIRWRg7F0QZGUkXG7jUZYVsF6ZaaudXvY8O6MBpRreTnB7nUNNB33\nIK3P2Ha2PNanEHqIr5/H+erdDa2NMa7KuIeG4c4yY6nKdLIBSbxQ7BPNYu8wX7p5\nd93klijPRtfswxbdTp3/3bzDwvAFbqp81vng7VIlec00Fk+hPAgOP76tO5Z0DBZg\nw8/XK7jXm3KsBBp2RUw6xxBaCTFQIGSWSUfbVNMJ/5oU0QJqUj7Hwn+z7SRtpYUZ\ndeyFdsiBAgMBAAECggEAAn/38+YxR5/e81F0LrYlghSomNEJM2qDltgUFzBT01e0\nLb8r+TGBkT6o8vWOjaJyrR9oon7TIXIw1j+lBP7PLD410QMEk1QIPI8B+xZa/PW4\n+2RSQ+xZQ6EjlMD24b6QKxfUa21JnYSGtzymMTTuaw1/oBdBDv5lfFLtNTb2nN96\nwS8Qc8qtl1goT5Y52G2rON0vJvxmyiS5DZs8FZxlYV9ALoEhsAoYMpYAedXWLaY/\nh5q3Jy85xRACXoLHthfAPG+uRMYzNqx9CnJ13oY+gUs4IZiOrerwcSB0nz77+To2\nprx/c6k1Lqwo3bMCuVsAejebZ+htizN7CBGIChelzQKBgQDdOc6HgHsXbazrxTbp\nVtLtADpqNJ1MHje5JwL9t0odomng95DpYo7Uh62Z+3csr8D0cJ+06AiXNdzXozY3\n3iY7Oc+8lLYDVMcWg4BHj0l0uE75mOSHvi0+5QFp5ZTg33l9WxB87dFmcVtKTUYG\n7w1FcVMGyTN+1S6bU6iQm/VidQKBgQC4GaR6b7rULexZ1T2JzZoCl7l0WygQzHcF\nnH4b5dUE7akyNfrFKP1IKFH02PFgUPPxGNcJDyUVyxOvZW564nceF9jT9XpwgngX\n+RBv+JU3ZnGGURC2qtkFW1lzkWjRS6Q0r8tjAw9GUMFtuKwEAFx1gKWwkeGs0GXz\ngPtwWUF0XQKBgGCMbABjKFVvPjqflXl8tQ1OPjA/yi6AOZ2K0xlbtvL8AO133jyd\nEOzcUf2T680K31FPHcRcR/OGRF2wE2eKgnDyqCELXexSQZknxwJ0HIDeN0ljWsmL\nTD/YviczVShXH7R/29BKEkt9SXRCCT/ZcJdQAAZEJT9DVtXfSv/hsNRJAoGBALKR\nrMhVt5I3ORmpjJctpkT9hhUmliY1LP10XZ4RwB2XqJXbZfH3YDWtZlFoXDhgTT1+\nKpXO6tnIsL9gU1k+cOvvlZGCedDHvFUEcL0rERE7fMIbv2pvLTHU+V7vnAvmos+3\n9D+FqDs7+WLDzZXUA9q1fgFWft9xBHK8mSbQbHzBAoGBANcufcH1CztIGQ5NHG5E\nbdDgfd9U21vGYu25KXn1vm4hNcCiRark2nHx0/ojWF95mN5tLn8M3g/ZtBGmI2iP\nyleYISTPoU7FQETUfNXdhVcIn4qj7F24C0AFoLl5Iei4zJ2CcpH5jkSfRursWTuG\nURp9hvEdTwgdQEj27M+tZuPs\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-zjjhv@playspark-c6ad4.iam.gserviceaccount.com",
  client_id: "114602047149323226106",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zjjhv%40playspark-c6ad4.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;

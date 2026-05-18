const fs = require('fs');
const https = require('https');
const path = require('path');

const hookUrlPath = path.join(__dirname, '..', '.deploy-hook-url');
const hookUrl = fs.readFileSync(hookUrlPath, 'utf8').trim();

if (!hookUrl) {
  console.error('ERROR: .deploy-hook-url file is empty or not found.');
  process.exit(1);
}

console.log('Triggering deployment on Vercel...');

https.get(hookUrl, (res) => {
  if (res.statusCode === 200) {
    console.log('SUCCESS: Deployment triggered successfully.');
  } else {
    console.error(`ERROR: Request failed with status ${res.statusCode}`);
  }
}).on('error', (err) => {
  console.error(`ERROR: Connection failed - ${err.message}`);
});
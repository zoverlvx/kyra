env $(cat ./.env) node handleChannels.js | jq '.'

# Ng-Meetup-backend
Server-side for ngMeetup app.

## Steps

Install all node dependences:

```sh
sudo npm install 
```

Run it

```sh
node index.js
```

## Filesystem

```
- data/ 		[all temporal cached files will be save here]
- app.js 		[app module with express]
- cache.js		[cache functions]
- config.js		[oauth keys & meetup urlname]
- index.js 		[bootstrapp backend]
- meetup.js		[meetup-api wrapper & routes]
- package.json	[node dependences]
```

## Configurable parts

### cache.js

Required time since last cache to regenerate JSON from API. By default 1 hour.

```javascript
if (time - cacheResponse.time < 3600000)
```

### config.js

Meetup required config. 

[Link to get 0AUTH](https://secure.meetup.com/es/meetup_api/oauth_consumers/)

```javascript
var config = {
    urlname: "meetup_urlname",
    key: "meetup_oauth_key",
    secret: "meetup_oauth_secret"
};
```


## License
MIT

#### Made with love by 
[@ginesortiz] and [@aserrabl]


[@ginesortiz]:<https://twitter.com/ginesortiz>
[@aserrabl]:<https://twitter.com/aserrabl>

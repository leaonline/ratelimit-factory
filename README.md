# Ratelimit Factory

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
![GitHub file size in bytes](https://img.shields.io/github/size/leaonline/ratelimit-factory/ratelimit-factory.js)
![GitHub](https://img.shields.io/github/license/leaonline/ratelimit-factory)

Rate-limit methods and publications. Lightweight. Simple.

All code is ~200 lines and includes a full registry class to handle register and running the rate limiter.

## Install and import

```bash
$ meteor add leaonline:ratelimit-factory
```

Then import the specific functions via

```javascript
import { 
  runRateLimiter,
  rateLimitMethod,
  rateLimitMethods,
  rateLimitPublication,
  rateLimitPublications, 
  rateLimitAccounts } from 'meteor/leaonline:ratelimit-factory'
```

You can simply omit the functions you don't need.

## Usage

You can use these functions to rate limit all Methods and Publications on your Meteor backend.
After you have added all Methods/Publications, you can execute the rate limier using `runRateLimiter`
and pass a callback function which is executed on limit exceeded.

For a detailed usage, you can lookup the [API documentation](./API.md)

## License

MIT, see [license file](./LICENSE)

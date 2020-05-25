# Ratelimit Factory

Rate-limit methods and publications. Lightweight. Simple.

## Usage

This package exports the following functions:

- `rateLimitMethod`
- `rateLimitMethods`
- `rateLimitPublication`
- `rateLimitPublications`
- `rateLimitAccounts`
- `runRateLimiter`

You can use these functions to rate limit all Methods and Publications on your Meteor backend.
After you have added all Methods/Publications, you can execute the rate limier using `runRateLimiter`
and pass a callback function which is executed on limit exceeded.

All code is ~200 lines and includes a full registry class to handle register and running the rate limiter.

## License

MIT, see [license file](./LICENSE)

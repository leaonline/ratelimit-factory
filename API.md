## Constants

<dl>
<dt><a href="#rateLimitMethods">rateLimitMethods</a> ⇒ <code>Array</code></dt>
<dd><p>Registers an array of method definitions to the rate limiter</p>
</dd>
<dt><a href="#rateLimitMethod">rateLimitMethod</a> ⇒ <code>Boolean</code></dt>
<dd><p>Registers a method for rate-limiting.</p>
</dd>
<dt><a href="#rateLimitPublications">rateLimitPublications</a> ⇒ <code>Array</code></dt>
<dd><p>Registers an array of publication definitions</p>
</dd>
<dt><a href="#rateLimitPublication">rateLimitPublication</a> ⇒ <code>Boolean</code></dt>
<dd><p>Registers a publication for rate limiting</p>
</dd>
<dt><a href="#rateLimitAccounts">rateLimitAccounts</a></dt>
<dd><p>Rate-limits by default all builtin methods and publications. You can extend / override accountMethods and accountPublications</p>
</dd>
<dt><a href="#runRateLimiter">runRateLimiter</a></dt>
<dd><p>This finally runs through all registered methods/publications and internally adds the rules for each.
Can perform a simple sanity check to see, if there is no non-rate-limited method or publication left.
If you want the sanity check to be valid you should run this after all methods and publications and builtins
have been registered for rate limiting.</p>
</dd>
</dl>

<a name="rateLimitMethods"></a>

## rateLimitMethods ⇒ <code>Array</code>
Registers an array of method definitions to the rate limiter

**Kind**: global constant  
**See**: {rateLimitMethod}  

| Param | Description |
| --- | --- |
| methods | an array of method definitions |

<a name="rateLimitMethod"></a>

## rateLimitMethod ⇒ <code>Boolean</code>
Registers a method for rate-limiting.

**Kind**: global constant  
**See**: https://docs.meteor.com/api/methods.html#DDPRateLimiter-addRule  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the method |
| userId | <code>String</code> \| <code>function</code> \| <code>undefined</code> | optional The user ID attempting the method or subscription |
| connectionId | <code>String</code> \| <code>function</code> \| <code>undefined</code> | A string representing the user's DDP connection |
| clientAddress | <code>String</code> \| <code>function</code> \| <code>undefined</code> | The IP address of the user |
| numRequests | <code>Number</code> | number of requests allowed per time interval. Default = 10. |
| timeInterval | <code>Number</code> | time interval in milliseconds after which rule's counters are reset. Default = 1000. |

<a name="rateLimitPublications"></a>

## rateLimitPublications ⇒ <code>Array</code>
Registers an array of publication definitions

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| publications | <code>Array</code> | an array of publication definitions |

<a name="rateLimitPublication"></a>

## rateLimitPublication ⇒ <code>Boolean</code>
Registers a publication for rate limiting

**Kind**: global constant  
**See**: https://docs.meteor.com/api/methods.html#DDPRateLimiter-addRule  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the method |
| userId | <code>String</code> \| <code>function</code> \| <code>undefined</code> | optional The user ID attempting the method or subscription |
| connectionId | <code>String</code> \| <code>function</code> \| <code>undefined</code> | A string representing the user's DDP connection |
| clientAddress | <code>String</code> \| <code>function</code> \| <code>undefined</code> | The IP address of the user |
| numRequests | <code>Number</code> | number of requests allowed per time interval. Default = 10. |
| timeInterval | <code>Number</code> | time interval in milliseconds after which rule's counters are reset. Default = 1000. |

<a name="rateLimitAccounts"></a>

## rateLimitAccounts
Rate-limits by default all builtin methods and publications. You can extend / override accountMethods and accountPublications

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| numRequestsMethods | <code>Number</code> | number of requests allowed per time interval. Default = 10. |
| timIntervalMethods | <code>Number</code> | time interval in milliseconds after which rule's counters are reset. Default = 1000. |
| numRequestsPublications | <code>Number</code> | number of requests allowed per time interval. Default = 10. |
| timeIntervalPublications | <code>Number</code> | time interval in milliseconds after which rule's counters are reset. Default = 1000. |
| accountMethods | <code>Array</code> | list with strings of all builtin methods |
| accountPublications | <code>Array</code> | list with strings of all builtin publications |

<a name="runRateLimiter"></a>

## runRateLimiter
This finally runs through all registered methods/publications and internally adds the rules for each.
Can perform a simple sanity check to see, if there is no non-rate-limited method or publication left.
If you want the sanity check to be valid you should run this after all methods and publications and builtins
have been registered for rate limiting.

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| limitExceededCallback | <code>function</code> | function to be called if a rate-limit is exceeded at runtime |
| sanityCheck | <code>Boolean</code> | performs a sanity check before adding the rules |
| throwIfNotRatelimited | <code>Boolean</code> | throws an Error if any entry in Meteor.server.method_handlers or   Meteor.server.publication_handlers is found that is not registered for rate limiting. |


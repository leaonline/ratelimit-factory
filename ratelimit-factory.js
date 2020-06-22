import { RateLimiterRegistry } from './RateLimiterRegistry'
import { check, Match } from 'meteor/check'

export const isObject = Match.Where(x => typeof x === 'object' && x !== null)

/**
 * Registers an array of method definitions to the rate limiter
 * @param methods an array of method definitions
 * @see {rateLimitMethod}
 * @return {Array}
 */

export const rateLimitMethods = methods => {
  check(methods, [isObject])
  return methods.map(rateLimitMethod)
}

/**
 * Registers a method for rate-limiting.
 * @param name {String} Name of the method
 * @param userId {String|Function|undefined} optional The user ID attempting the method or subscription
 * @param connectionId {String|Function|undefined} A string representing the user's DDP connection
 * @param clientAddress {String|Function|undefined} The IP address of the user
 * @param numRequests {Number} number of requests allowed per time interval. Default = 10.
 * @param timeInterval {Number} time interval in milliseconds after which rule's counters are reset. Default = 1000.
 * @see https://docs.meteor.com/api/methods.html#DDPRateLimiter-addRule
 * @return {Boolean}
 */

export const rateLimitMethod = ({ name, userId, connectionId, clientAddress, numRequests, timeInterval }) => {
  // no need to check since RateLimiterRegistry does that already
  return RateLimiterRegistry.addMethod({ name, userId, connectionId, clientAddress, numRequests, timeInterval })
}

/**
 * Registers an array of publication definitions
 * @param publications {Array} an array of publication definitions
 * @return {Array}
 */

export const rateLimitPublications = publications => {
  check(publications, [isObject])
  return publications.map(rateLimitPublication)
}

/**
 * Registers a publication for rate limiting
 * @param name {String} Name of the method
 * @param userId {String|Function|undefined} optional The user ID attempting the method or subscription
 * @param connectionId {String|Function|undefined} A string representing the user's DDP connection
 * @param clientAddress {String|Function|undefined} The IP address of the user
 * @param numRequests {Number} number of requests allowed per time interval. Default = 10.
 * @param timeInterval {Number} time interval in milliseconds after which rule's counters are reset. Default = 1000.
 * @see https://docs.meteor.com/api/methods.html#DDPRateLimiter-addRule
 * @return {Boolean}
 */

export const rateLimitPublication = ({ name, userId, connectionId, clientAddress, numRequests, timeInterval }) => {
  // no need to check since RateLimiterRegistry does that already
  return RateLimiterRegistry.addPublication({ name, userId, connectionId, clientAddress, numRequests, timeInterval })
}

/**
 * Rate-limits by default all builtin methods and publications. You can extend / override accountMethods and accountPublications
 * @param numRequestsMethods {Number} number of requests allowed per time interval. Default = 10.
 * @param timIntervalMethods {Number} time interval in milliseconds after which rule's counters are reset. Default = 1000.
 * @param numRequestsPublications {Number} number of requests allowed per time interval. Default = 10.
 * @param timeIntervalPublications {Number} time interval in milliseconds after which rule's counters are reset. Default = 1000.
 * @param accountMethods {Array} list with strings of all builtin methods
 * @param accountPublications {Array} list with strings of all builtin publications
 */

export const rateLimitAccounts = ({
                                    numRequestsMethods = 10,
                                    timIntervalMethods = 1000,
                                    numRequestsPublications = 10,
                                    timeIntervalPublications = 1000,
                                    accountMethods = [
                                      'login',
                                      'loginWithToken',
                                      'logout',
                                      'logoutOtherClients',
                                      'getNewToken',
                                      'removeOtherTokens',
                                      'configureLoginService',
                                      'changePassword',
                                      'forgotPassword',
                                      'resetPassword',
                                      'verifyEmail',
                                      'createUser',
                                      'ATRemoveService',
                                      'ATCreateUserServer',
                                      'ATResendVerificationEmail'
                                    ],
                                    accountPublications = [
                                      'meteor.loginServiceConfiguration',
                                      'meteor_autoupdate_clientVersions',
                                      '_roles'
                                    ]
                                  } = {}) => {
  Accounts.removeDefaultRateLimit()

  accountMethods.forEach(name => RateLimiterRegistry.addMethod({
    name,
    numRequests: numRequestsMethods,
    timeInterval: timIntervalMethods
  }))

  accountPublications.forEach(name => RateLimiterRegistry.addPublication({
    name,
    timeInterval: timeIntervalPublications,
    numRequests: numRequestsPublications
  }))
}

/**
 * This finally runs through all registered methods/publications and internally adds the rules for each.
 * Can perform a simple sanity check to see, if there is no non-rate-limited method or publication left.
 * If you want the sanity check to be valid you should run this after all methods and publications and builtins
 * have been registered for rate limiting.
 *
 * @param limitExceededCallback {Function} function to be called if a rate-limit is exceeded at runtime
 * @param sanityCheck {Boolean} performs a sanity check before adding the rules
 * @param throwIfNotRatelimited {Boolean} throws an Error if any entry in Meteor.server.method_handlers or
 *   Meteor.server.publication_handlers is found that is not registered for rate limiting.
 */
export const runRateLimiter = (limitExceededCallback, sanityCheck = true, throwIfNotRatelimited = false) => {
  if (sanityCheck) {
    console.info(`[RateLimiterRegistry]: run sanity check, strict-mode=${throwIfNotRatelimited}`)
    RateLimiterRegistry.sanityCheck(throwIfNotRatelimited)
    console.info('[RateLimiterRegistry]: sanity check passed')
  }
  RateLimiterRegistry.run(limitExceededCallback)
}

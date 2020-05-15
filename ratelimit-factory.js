import { RateLimiterRegistry } from './RateLimiterRegistry'
import { check, Match } from 'meteor/check'

export const isObject = Match.Where(x => typeof x === 'object' && x !== null)

export const rateLimitMethods = methods => {
  check(methods, [isObject])
  return methods.map(rateLimitMethod)
}

export const rateLimitMethod = ({ name, userId, connectionId, clientAddress, numRequests, timeInterval }) => {
  // no need to check since RateLimiterRegistry does that already
  return RateLimiterRegistry.addMethod({ name, userId, connectionId, clientAddress, numRequests, timeInterval })
}

export const rateLimitPublications = publications => {
  check(publications, [isObject])
  return publications.map(rateLimitPublication)
}

export const rateLimitPublication = ({ name, userId, connectionId, clientAddress, numRequests, timeInterval }) => {
  // no need to check since RateLimiterRegistry does that already
  return RateLimiterRegistry.addPublication({ name, userId, connectionId, clientAddress, numRequests, timeInterval })
}

export const rateLimitAccounts = ({
                                    numRequestsMethods = 5,
                                    timIntervalMethods = 10000,
                                    numRequestsPublications = 20,
                                    timeIntervalPublications = 10000,
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

export const runRateLimiter = (limitExceededCallback, sanityCheck = true) => {
  if (sanityCheck) {
    RateLimiterRegistry.sanityCheck(true)
    console.info('[RateLimiterRegistry]: sanity check passed in strict mode')
  }
  RateLimiterRegistry.run(limitExceededCallback)
}

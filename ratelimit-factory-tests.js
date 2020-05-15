// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by ratelimit-factory.js.
import { name as packageName } from "meteor/leaonline:ratelimit-factory";

// Write your tests here!
// Here is an example.
Tinytest.add('ratelimit-factory - example', function (test) {
  test.equal(packageName, "ratelimit-factory");
});

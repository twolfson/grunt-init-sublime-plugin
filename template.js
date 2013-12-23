/*
 * grunt-init-node
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

// Basic template description.
exports.description = 'Create a Node.js module, including mocha unit tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ shouldn\'t contain \'node\' or \'js\' and should ' +
  'be a unique ID not already in use at search.npmjs.org.';

// Template-specific notes to be displayed after question prompts.
exports.after = [
  'If you used Travis CI, be sure to activate it via https://travis-ci.org/profile'
].join('\n');

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.prompts.travis_username = {
    name: 'travis_username',
    message: 'Travis CI username (adds Travis CI badge)'
  };

  init.prompts.gittip_username = {
    name: 'gittip_username',
    message: 'Gittip username (adds Gittip badge)'
  };

  init.process({type: 'node'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'UNLICENSE'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('travis_username'),
    init.prompt('gittip_username'),
    init.prompt('node_version', '>= 0.8.0'),
    init.prompt('main'),
    init.prompt('npm_test', 'mocha'),
    {
      name: 'keywords',
      message: 'What keywords relate to this plugin (comma separated)?'
    }
    // {
    //   name: 'travis',
    //   message: 'Will this project be tested with Travis CI?',
    //   default: 'Y/n',
    //   warning: 'If selected, you must enable Travis support for this project in https://travis-ci.org/profile'
    // }
  ], function(err, props) {
    // Set up dependencies
    props.dependencies = {};
    props.devDependencies = {
      'mocha': '~1.11.0',
      'grunt': '~0.4.1',
      'grunt-contrib-jshint': '~0.6.0',
      'grunt-contrib-watch': '~0.4.0'
    };
    // // TODO: compute dynamically?
    // props.travis = /y/i.test(props.travis);
    // props.travis_node_version = '0.10';

    // Break up the keywords by commas
    var keywords = props.keywords;
    keywords = keywords ? keywords.split(',') : [];

    // Trim each keyword and save
    keywords = keywords.map(function (str) {
      return str.trim();
    });
    props.keywords = keywords;

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // If the licenses contain an Unlicense, pluck it
    props.unlicense = props.licenses.filter(function (license) {
      return license.match(/^UNLICENSE$/i);
    })[0];

    // If an unlicense was found, add it to output
    if (props.unlicense) {
      files['UNLICENSE'] = __dirname + '/licenses/UNLICENSE';
      props.licenses = [];
    } else {
      // Add properly-named license files.
      init.addLicenseFiles(files, props.licenses);
    }

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props, function (pkg) {
      // If there was UNLICENSE, add it as a license
      if (props.unlicense) {
        pkg.licenses.push({
          type: 'UNLICENSE',
          url: props.homepage + '/blob/master/UNLICENSE'
        });
      }

      // Return the package
      return pkg;
    });

    // All done!
    done();
  });

};

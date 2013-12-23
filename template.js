var _ = require('underscore.string');

// Basic template description.
exports.description =  'Create Sublime Text plugin';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.prompts.gittip_username = {
    name: 'gittip_username',
    message: 'Gittip username (adds Gittip badge)'
  };

  init.process({type: 'node'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('licenses', 'UNLICENSE'),
    init.prompt('author_name'),
    init.prompt('gittip_username'),
  ], function(err, props) {
    // Define a short name and short camel name for the prompt
    props.short_name = props.name.replace('sublime-', '');
    props.short_camel_name = _.camelize(props.short_name);

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

    // All done!
    done();
  });

};

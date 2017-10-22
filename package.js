Package.describe({
  summary: 'Relations for Meteor Astronomy',
  version: '1.0.0',
  name: 'jagi:astronomy-relations',
  git: 'https://github.com/jagi/meteor-astronomy-relations.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');

  api.use([
    'jagi:astronomy@2.5.2',
    'ecmascript'
  ], ['client', 'server']);

  api.imply('jagi:astronomy');

  // Module.
  api.addFiles([
    'lib/module.js'
  ], ['client', 'server']);
});

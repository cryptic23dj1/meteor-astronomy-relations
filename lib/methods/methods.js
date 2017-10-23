// Prototype Methods ///////////////////////////////////////////////////////////

var prototypeMethods = {};

prototypeMethods.getRelated = function(relationName) {
  var doc = this;
  var Class = doc.constructor;

  // If there is already a reference to the relation object(s) stored in the
  // "_references" object then we can take it without looking in collection.
  if (_.has(this._references, relationName)) {
    return this._references[relationName];
  }

  // Look for the relation definition.
  var relation = Class.getRelation(relationName);
  if (!relation) {
    return;
  }

  // Get a collection defined in the relation.
  var ForeignClass = Astro.getClass(relation.class);
  var ForeignCollection = ForeignClass.getCollection();

  // Prepare selector to select only these documents that much the relation.
  var selector = {};
  var localValue = this.get(relation.local);
  selector[relation.foreign] = _.isArray(localValue) ?
    {$in: localValue} : localValue;

  // Get a related object.
  var related;
  if (relation.type === 'one') {
    related = ForeignCollection.findOne(selector);
  } else if (relation.type === 'many') {
    related = ForeignCollection.find(selector);
  }

  // Assing the related object to the "_references" object for further use.
  return this._references[relationName] = related;
};

// Class Methods ///////////////////////////////////////////////////////////////

var classMethods = {};

classMethods.hasRelation = function(relationName) {
  return _.has(this.schema.relations, relationName);
};

classMethods.getRelation = function(relationName) {
  return this.schema.relations[relationName];
};

classMethods.getRelations = function() {
  return this.schema.relations;
};

export default {prototypeMethods, classMethods};
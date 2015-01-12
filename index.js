'use strict';

var _ = require('lodash');
var fs = require('fs');

var pizzas = _(JSON.parse(fs.readFileSync('pizzas.json').toString()));

var toppingCombinations = pizzas
  .pluck('toppings')
  .sort()
  .map(function(toppings) {
    return _(toppings)
      .sort()
      .toString();
  })
  .value();

var pizzaCounts = toppingCombinations
  .reduce(
    function(counts, key) {
      counts[key]++;
      return counts;
    },
    _(toppingCombinations)
      .uniq()
      .map(function(key) { return [key, 0]; })
      .zipObject()
      .value()
  );

var sortedPizzas = _(pizzaCounts)
  .pairs()
  .sortBy(1)
  .reverse()
  .some(function(pair, key) {
    if (key === 20) return true;
    console.log(key + 1 + '. '+
      pair[0].replace(',', ', ') + '\n=> ' + pair[1] + ' orders\n');
  });

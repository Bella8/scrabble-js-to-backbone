// player.js
import Backbone from 'backbone';
import Scrabble from 'app/models/scrabble';

const Player = Backbone.Model.extend({
  defaults: {
    //creating atttributes for our model
    name: "ada",
    plays: []
  },

  //not creating an attribute, giving it a property
  //this is a thing that the model has access to
  initialize: function(options) {
    this.scrabble = new Scrabble();
  },

  hasWon: function() {
    return this.totalScore() > 100;
  },

  totalScore: function() {
    var total = 0;
    for (var i = 0; i < this.get('plays').length; i++){
      total += this.scrabble.score(this.get('plays')[i]);
    }
    return total;
  },

  highestScoringWord: function() {
    return this.scrabble.highestScoreFrom(this.get('plays'));
  },

  highestWordScore: function() {
    return this.scrabble.score(this.scrabble.highestScoreFrom(this.get('plays')));
  },

  play: function(word) {
    if (this.hasWon()){
      return false;
    } else {
      this.get('plays').push(word);
    }
  }
});

export default Player;

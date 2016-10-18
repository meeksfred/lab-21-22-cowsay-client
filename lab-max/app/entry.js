'use strict';

require('./scss/base.scss');

const cowsay = require('cowsay-browser');
const angular = require('angular');

const cowsayApp = angular.module('cowsayApp', []);

cowsayApp.controller('CowController', ['$log', CowController]);

function CowController($log){
  $log.debug('init CowController');

  this.title = 'Cowsay Lab 2.0, Using Angular';
  this.cowTexts = [];
  cowsay.list( (err, cowChars) => {
    this.cowChars = cowChars;
    this.activeCow = this.cowChars[0];
  });

  this.cowTalk = function(input){
    $log.debug('this.cowTalk');
    return '\n' + cowsay.say({text: input || 'type an input to make me talk', f:this.activeCow});
  };

  this.cowPopulate = function(input){
    $log.debug('this.cowPopulate');
    this.newText = this.cowTalk(input);
    this.cowTexts.push(this.newText);
  };

  this.revertText = function(){
    this.newText = this.cowTexts.pop() || '';
  };
}

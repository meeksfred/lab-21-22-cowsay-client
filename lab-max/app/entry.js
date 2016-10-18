'use strict';

require('./scss/base.scss');

const cowsay = require('cowsay-browser');
const angular = require('angular');

const cowsayApp = angular.module('cowsayApp', []);

cowsayApp.controller('CowController', ['$log', '$scope', CowController]);

function CowController($log, $scope){
  $log.debug('init CowController');
  let cowCtrl = $scope.cowCtrl = {};

  cowCtrl.title = 'Cowsay Lab 2.0, Using Angular';
  cowCtrl.revertTexts = [];

  cowCtrl.cowTalk = function(input){
    $log.debug('cowCtrl.cowTalk');
    return '\n' + cowsay.say({text: input || 'type an input to make me talk'});
  };

  cowCtrl.cowPopulate = function(input){
    $log.debug('cowCtrl.cowPopulate');
    return '\n' + cowsay.say({text: input || 'give me texts'});
  };
}

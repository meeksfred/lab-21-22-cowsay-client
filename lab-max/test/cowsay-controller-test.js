'use strict';

require('./lib/test-setup.js');

const cowsay = require('cowsay-browser');
const angular = require('angular');

describe('testing cowCtrl', function(){
  beforeEach( () => {
    angular.mock.module('cowsayApp');
    angular.mock.inject($controller => {
      this.cowCtrl = new $controller('CowController');
    });
  });

  describe('testing initial properties and values', () => {
    it('title should equal Cowsay Lab 2.0, Using Angular', () => {
      expect(this.cowCtrl.title).toBe('Cowsay Lab 2.0, Using Angular');
    });

    it('intro should equal the (long) intro', () => {
      let intro = 'Welcome to the Cowsay Machine. To make the second cow say what you want, you may enter any word between 5 and 15 characters.';
      expect(this.cowCtrl.intro).toBe(intro);
    });

    it('secondCowText should equal WHERE IS THE SECOND COW!!!', () => {
      expect(this.cowCtrl.secondCowText).toBe('WHERE IS THE SECOND COW!!!');
    });

    it('submitText should equal Click to make second cow speak!', () => {
      expect(this.cowCtrl.submitText).toBe('Click to make second cow speak!');
    });

    it('undoText should equal Click to revert text update!', () => {
      expect(this.cowCtrl.undoText).toBe('Click to revert text update!');
    });

    it('cowTexts should be an empty array', () => {
      expect(Array.isArray(this.cowCtrl.cowTexts)).toBe(true);
    });

    it('cowChars should be the same as cowsay.list', () => {
      cowsay.list((err, list) => {
        expect(this.cowCtrl.cowChars).toEqual(list);
        expect(this.cowCtrl.activeCow).toEqual(list[0]);
      });
    });
  });

  describe('testing #cowTalk()', () => {
    it('should return a bevis.zen hello', () => {
      let expectedResult = '\n' + cowsay.say({text: 'hello', f: this.cowCtrl.activeCow});
      let result = this.cowCtrl.cowTalk('hello');
      expect(result).toEqual(expectedResult);
    });
  });

  describe('testing #cowPopulate()', () => {
    it('should return a bevis.zen sup dude', () => {
      let expectedResult = '\n' + cowsay.say({text: 'sup dude', f: this.cowCtrl.activeCow});
      this.cowCtrl.cowPopulate('sup dude');
      expect(this.cowCtrl.newText).toEqual(expectedResult);
      expect(this.cowCtrl.cowTexts[0]).toEqual(expectedResult);
    });

    it('should return an array with 3 phrases in it', () => {
      let expectedResult = '\n' + cowsay.say({text: 'this array three phrases long?', f: this.cowCtrl.activeCow});
      this.cowCtrl.cowPopulate('sup dude');
      this.cowCtrl.cowPopulate('yo man');
      this.cowCtrl.cowPopulate('this array three phrases long?');
      expect(this.cowCtrl.cowTexts.length).toEqual(3);
      expect(this.cowCtrl.cowTexts[2]).toEqual(expectedResult);
    });
  });

  describe('testing #revertText()', () => {
    it('should return a bevis.zen yo man', () => {
      let expectedResult = '\n' + cowsay.say({text: 'yo man', f: this.cowCtrl.activeCow});
      this.cowCtrl.cowPopulate('watch a');
      this.cowCtrl.cowPopulate('disappearing act');
      this.cowCtrl.revertText();
      this.cowCtrl.revertText();
      expect(this.cowCtrl.cowTalk('yo man')).toEqual(expectedResult);
      expect(this.cowCtrl.cowTexts.length).toEqual(0);
    });
  });
});

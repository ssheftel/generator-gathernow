'use strict';
var yeoman = require('yeoman-generator');
var s = require("underscore.string");
var utils = require('../utils');
console.log(utils)

/*

yo gathernow:state 'localTwo' --tab='localOne' --parentState='localOne' --url='/:id'
yo gathernow:state 'stateName' --tab='tabName' --parentState='parentState' --url='url'

*/
module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('stateName', {
      required: true,
      type: String,
      desc: 'The subgenerator stateName'
    });
    this.option('tabName', {
      defaults: '',
      alias: 'tab',
      type: String,
      desc: 'The the tab the state is inserted in - will be name of ionic-tab-view name'
    });
    this.tabName = this.options.tabName
    this.option('parentState', {
      defaults: '',
      alias: 'parent',
      type: String,
      desc: 'The the parent state can be dotted, dont include tab'
    });
    this.parentState = this.options.parentState

    this.option('url', {
      defaults: '',
      type: String,
      desc: 'url'
    });
    this.url = this.options.url

    this.parentStates = ['tab'];
    if (this.parentState) {
      this.parentStates.push(this.parentState)
    }
    if (!this.tabName) {
      this.tabName = this.stateName
    }
    if (!this.url) {
      this.url = '/' + this.stateName;
    }

    this.fileName = this.stateName + 'State.coffee';
    this.jsFileName = this.stateName + 'State.js';
    this.ctrlName = s(this.stateName).capitalize().value()+'Ctrl';
    this.ctrlInstsName = s(this.ctrlName).decapitalize().value();
    this.stateNamePrefix = this.parentStates.join('.');
    this.fullStateName = this.stateNamePrefix + '.' + this.stateName;


    this.log('You called the Gathernow subgenerator with the argument ' + this.stateName + '.');
    this.log('You called the Gathernow subgenerator with the argument ' + this.tabName + '.');
  },

  writing: function () {
    var stateName, fileName, jsFileName, ctrlName, ctrlInstsName,stateNamePrefix, fullStateName, tabName, url, indexFilePath, insertBeforeLineFn, scriptPath,destPath;
    indexFilePath = 'www_src/index.html';
    insertBeforeLineFn = utils.insertBeforeLine.bind(this);
    scriptPath = 'js/states/';
    destPath = 'www_src/js/states/';

    stateName = this.stateName
    fileName = this.fileName
    jsFileName = this.jsFileName
    ctrlName = this.ctrlName
    ctrlInstsName = this.ctrlInstsName
    stateNamePrefix = this.stateNamePrefix
    fullStateName = this.fullStateName
    tabName = this.tabName
    url = this.url


    //State File
    this.fs.copyTpl(
      this.templatePath('_state.coffee'),
      this.destinationPath(destPath + this.fileName),
      {stateName:stateName, fileName:fileName, jsFileName:jsFileName, ctrlName:ctrlName, ctrlInstsName:ctrlInstsName, stateNamePrefix:stateNamePrefix, fullStateName:fullStateName, tabName:tabName, url:url}
    );
    this.log(utils.makeScriptTag(scriptPath + this.jsFileName))
    insertBeforeLineFn(indexFilePath, '  <!-- STATE_INSERT_POINT -->', utils.makeScriptTag(scriptPath + this.jsFileName));

  }
});

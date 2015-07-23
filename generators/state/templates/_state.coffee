###
  EventDetails State Config - EventDetails List index state of eventDetails
  stateName = <%= stateName %>
  fileName = <%= fileName %>
  jsFileName = <%= jsFileName %>
  ctrlName = <%= ctrlName %>
  ctrlInstsName = <%= ctrlInstsName %>
  stateNamePrefix = <%= stateNamePrefix %>
  fullStateName = <%= fullStateName %>
  tabName = <%= tabName %>
  url = <%= url %>
###

stateName = "<%= stateName %>"
tabName = "<%= tabName %>"
url = "<%= url %>" # derived - but may need to change
ctrlName = "<%= ctrlName %>"
ctrlInstName = "<%= ctrlInstsName %>"
fullStateName = "<%= fullStateName %>"

###Template###
tpl = """
<ion-view view-title="{{ <%= ctrlInstsName %>.headerTitle }}">
  <ion-content class="padding">
    <h1>{{ <%= ctrlInstsName %>.name }}</h1>
  </ion-content>
</ion-view>
"""

###Resolve Functions###
rslvs = {}

###Controller###
Ctrl = ($log, $scope, cfg) ->
  vm = @
  $log.log("Instantiating instance of <%= ctrlName %>")

  vm.name = "<%= ctrlName %>"
  vm.headerTitle = "<%= stateName %>"


  # activation fn
  vm.activate = ->
    return

  vm.activate() # run activate fn
  return

###State Config###
stateCfg = {
  url: "<%= url %>"
  resolve: rslvs
  views: "<%= tabName %>@tab": {
  template: tpl
  controller: "<%= ctrlName %> as <%= ctrlInstsName %>"}
}



# ------------------------------Add To App-------------------------------------
gatherNowStates = angular.module('gatherNow.states')
gatherNowStates.controller("<%= ctrlName %>", Ctrl)
gatherNowStates.config(($stateProvider) -> $stateProvider.state("<%= fullStateName %>", stateCfg);return;)

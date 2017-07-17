/*
 * ELASTICSEARCH CONFIDENTIAL
 *
 * Copyright (c) 2017 Elasticsearch BV. All Rights Reserved.
 *
 * Notice: this software, and all information contained
 * therein, is the exclusive property of Elasticsearch BV
 * and its licensors, if any, and is protected under applicable
 * domestic and foreign law, and international treaties.
 *
 * Reproduction, republication or distribution without the
 * express written consent of Elasticsearch BV is
 * strictly prohibited.
 */

// the tooltip descriptions are located in tooltips.json

import tooltips from './tooltips.json';
import './styles/main.less';

import { uiModules } from 'ui/modules';
const module = uiModules.get('apps/ml');
// service for retrieving text from the tooltip.json file
// to add a tooltip to any element:
// <... tooltip="{{mlJsonTooltipService.text('my_id')}}" ...>
module.service('mlJsonTooltipService', function () {
  this.text = function (id) {
    if (tooltips[id]) {
      return tooltips[id].text;
    } else {
      return '';
    }
  };
})

// directive for placing an i icon with a popover tooltip anywhere on a page
// tooltip format: <i ml-info-icon="the_id" />
// the_id will match an entry in tooltips.json
.directive('mlInfoIcon', function () {
  return {
    scope: {
      id: '@mlInfoIcon',
    },
    restrict: 'AE',
    replace: true,
    template: '<i aria-hidden="true" class="fa fa-info-circle" tooltip="{{text}}"></i>',
    controller: function ($scope) {
      $scope.text = (tooltips[$scope.id]) ? tooltips[$scope.id].text : '';
    }
  };

});

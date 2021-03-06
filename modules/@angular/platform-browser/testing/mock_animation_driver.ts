/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {AnimationPlayer} from '@angular/core';
import {MockAnimationPlayer} from '@angular/core/testing/testing_internal';

import {AnimationKeyframe, AnimationStyles} from '../core_private';
import {AnimationDriver} from '../src/dom/animation_driver';
import {StringMapWrapper} from '../src/facade/collection';

export class MockAnimationDriver extends AnimationDriver {
  log: any[] /** TODO #9100 */ = [];
  animate(
      element: any, startingStyles: AnimationStyles, keyframes: AnimationKeyframe[],
      duration: number, delay: number, easing: string): AnimationPlayer {
    var player = new MockAnimationPlayer();
    this.log.push({
      'element': element,
      'startingStyles': _serializeStyles(startingStyles),
      'keyframes': keyframes,
      'keyframeLookup': _serializeKeyframes(keyframes),
      'duration': duration,
      'delay': delay,
      'easing': easing,
      'player': player
    });
    return player;
  }
}

function _serializeKeyframes(keyframes: AnimationKeyframe[]): any[] {
  return keyframes.map(keyframe => [keyframe.offset, _serializeStyles(keyframe.styles)]);
}

function _serializeStyles(styles: AnimationStyles): {[key: string]: any} {
  var flatStyles = {};
  styles.styles.forEach(
      entry => StringMapWrapper.forEach(
          entry, (val: any /** TODO #9100 */, prop: any /** TODO #9100 */) => {
            (flatStyles as any /** TODO #9100 */)[prop] = val;
          }));
  return flatStyles;
}

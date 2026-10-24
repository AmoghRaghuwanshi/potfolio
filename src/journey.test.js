import test from 'node:test';
import assert from 'node:assert/strict';
import { journeyState } from './journey.js';

test('camera journey is reversible and independent of scroll history', () => {
  const initial = journeyState(.18);
  [.5,.9,1,.7,.18].forEach(journeyState);
  assert.deepEqual(journeyState(.18), initial);
  assert.ok(journeyState(.9).position[2] < initial.position[2]);
  assert.deepEqual(journeyState(-1), journeyState(0));
  assert.deepEqual(journeyState(2), journeyState(1));
});
test('reduced motion keeps camera fixed while project content remains accessible', () => {
  assert.deepEqual(journeyState(1,1.6,false).position, journeyState(0,1.6,false).position);
  assert.equal(journeyState(1,1.6,false).screen,1);
  assert.equal(journeyState(1,1.6,false).reveal,1);
});
test('mobile camera preserves a wider framing and all outputs stay finite', () => {
  for (const progress of [0, 1]) assert.ok(journeyState(progress,.59).position[2] > journeyState(progress,.72).position[2]);
  assert.ok(journeyState(1,.5).position[2] > journeyState(1,1.6).position[2]);
  for(let p=0;p<=1;p+=.01) {
    const state=journeyState(p,.45);
    assert.ok([...state.position,...state.target,state.screen].every(Number.isFinite));
    assert.ok(state.screen >= 0 && state.screen <= 1);
  }
});

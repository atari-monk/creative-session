export const SharedTypes = {
  BasicRenderer: Symbol.for('BasicRenderer'),
  EventEmitter: Symbol.for('EventEmitter'),
  GameObjsManager: Symbol.for('GameObjectManager'),
};

export const AppTypes = {
  AppHelper: Symbol.for('AppHelper'),
};

const PlayerNpcId = 'PlayerNpc';
export const PlayerNpcTypes = {
  Player: Symbol.for(PlayerNpcId),
  Model: Symbol.for(PlayerNpcId + 'Model'),
  Colors: Symbol.for(PlayerNpcId + 'Colors'),
  Renderer: Symbol.for(PlayerNpcId + 'Renderer'),
};

const PlayerId = 'Player';
export const PlayerTypes = {
  Player: Symbol.for(PlayerId),
  Model: Symbol.for(PlayerId + 'Model'),
  Renderer: Symbol.for(PlayerId + 'Renderer'),
  KeyboardInput: Symbol.for(PlayerId + 'KeyboardInput'),
  Keys: Symbol.for(PlayerId + 'Keys'),
  DirectionFromKeyboard: Symbol.for(PlayerId + 'DirectionFromKeyboard'),
  PositionEmitter: Symbol.for(PlayerId + 'PositionEmitter'),
  IPlayerUpdater: Symbol.for(PlayerId + 'IPlayerUpdater'),
};

const BallId = 'Ball';
export const BallTypes = {
  Ball: Symbol.for(BallId),
  Model: Symbol.for(BallId + 'Model'),
  Renderer: Symbol.for(BallId + 'Renderer'),
  MovementEmitter: Symbol.for(BallId + 'MovementEmitter'),
  VelocityEmitter: Symbol.for(BallId + 'VelocityEmitter'),
};

const FieldId = 'Field';
export const FieldTypes = {
  Field: Symbol.for(FieldId),
  Model: Symbol.for(FieldId + 'Model'),
  Renderer: Symbol.for(FieldId + 'Renderer'),
};

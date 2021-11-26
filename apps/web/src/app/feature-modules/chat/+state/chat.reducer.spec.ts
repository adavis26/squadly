import { Chat } from '../../../../../../../libs/core/src/lib/interfaces';
import * as ChatActions from './chat.actions';
import { State, initialState, reducer } from './chat.reducer';

const emptyChat: Chat = {
  messages: [],
  members: [],
};
describe('Chat Reducer', () => {
  const createChatEntity = (id: string, name = '') =>
    ({
      messages: [],
      members: [],
    } as Chat);

  beforeEach(() => {});

  describe('valid Chat actions', () => {
    it('loadChatSuccess should return set the list of known Chat', () => {
      const chat = [
        createChatEntity('PRODUCT-AAA'),
        createChatEntity('PRODUCT-zzz'),
      ];
      const action = ChatActions.loadChatSuccess({ chat: emptyChat });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});

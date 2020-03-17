import * as fromMessaging from '../reducers/messaging.reducer';
import { selectMessagingState } from './messaging.selectors';

describe('Messaging Selectors', () => {
  it('should select the feature state', () => {
    const result = selectMessagingState({
      [fromMessaging.messagingFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});

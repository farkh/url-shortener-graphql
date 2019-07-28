import * as authHandlers from './handlerGenerators/auth';
import * as urlHandlers from './handlerGenerators/url';

export default {
    ...authHandlers,
    ...urlHandlers,
};

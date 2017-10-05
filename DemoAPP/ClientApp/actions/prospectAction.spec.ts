import * as ProspectActionType from '../../constants/actionTypes';
import * as ProspectAction from '../prospectAction';
describe('actions', () => {
    it('fetch prospect', () => {
      const id = 1963;
      const expectedAction = {
        type: ProspectActionType.GET_PROSPECT_REQUEST,
        id
      }
      expect(ProspectAction.fetchProspectRequest(id)).toEqual(expectedAction)
    })
    it('fetch states', async () =>{
      const expectedAction = {
        type: ProspectActionType.GET_STATES_REQUEST
      }
      expect.assertions(1);
      await expect(ProspectAction.fetchStatesRequest()).toEqual(expectedAction)
    })    
  });

  // beforeAll(() => {
  //   //return GetStates();
  // });
  
  // afterAll(() => {
  //   //return ClearStore();
  // });
  
/*


  import configureMockStore from 'redux-mock-store'
  import thunk from 'redux-thunk'
  import * as ProspectAction from '../prospectAction';
  import * as types from '../../constants/ActionTypes'
  import nock from 'nock'
  import expect from 'expect' // You can use any testing library


  
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  
  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })
  
    xit('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
      nock('http://example.com/')
        .get('/todos')
        .reply(200, { body: { todos: ['do something'] } })
  
      const expectedActions = [
        { type: types.FETCH_TODOS_REQUEST },
        { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something'] } }
      ]
      const store = mockStore({ todos: [] })
  
      return store.dispatch(actions.fetchTodos()).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })*/
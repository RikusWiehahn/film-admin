import { combineReducers } from 'redux';

import TeamsReducer from '../teams/teams-reducers/TeamsReducer';
import ProductsReducer from '../products/products-reducers/ProductsReducer';
import CustomersReducer from '../customers/customers-reducers/CustomersReducer';
import ItemsReducer from '../items/items-reducers/ItemsReducer';
import TasksReducer from '../tasks/tasks-reducers/TasksReducer';

const reducers = combineReducers({
  teams: TeamsReducer,
  customers: CustomersReducer,
  products: ProductsReducer,
  items: ItemsReducer,
  tasks: TasksReducer,
});

export default reducers;
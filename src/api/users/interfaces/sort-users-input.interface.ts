import { OrderDirection } from '../../../common/dtos/common-query.dto';
import { UsersFields } from '../dtos/query-users.dto';

export interface SortUsersInput {
  orderBy: UsersFields;
  orderDirection: OrderDirection;
}

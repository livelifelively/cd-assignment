import React, { useEffect, useState, useCallback } from 'react';
import { FormControl, TextField, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { cloneDeep, sortBy, debounce } from 'lodash';

import { fetchUsers } from '../../../application/state/users/users.actions';
import { searchUsers } from '../../../application/state/search/search.actions';
import DefaultLayout from '../../layouts/default';
import UsersTable from './components/users-table';

// A custom hook that builds on useLocation to parse
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    'users-list__controls': {
      textAlign: 'right',
    },
  })
);

const UsersList = () => {
  const classes = useStyles();

  const queryParams = useQuery();
  const dispatch = useDispatch();

  const users = useSelector((state: any) => state?.users);
  const usersSearchResults = useSelector((state: any) => state?.search);

  const history = useHistory();

  const [query, setQuery] = useState('');
  const [sortUsersBy, setSortUsersBy] = useState(() => '');

  const [sortedUsers, setSortedUsers] = useState(() => {
    return cloneDeep(users);
  });
  const [usersList, setUsersList] = useState<{ searchResults: User[]; searchString: string } | null>(() => null);

  useEffect(() => {
    if (usersSearchResults && usersSearchResults.searchString?.length) {
      setUsersList(usersSearchResults.searchResults);
    } else {
      setUsersList(users);
    }
  }, [usersSearchResults, users]);

  // fetch users onload. sort them by query param sortBy or name.
  useEffect(() => {
    dispatch(fetchUsers());
    const sortByQueryParam = queryParams.get('sortBy');
    setSortUsersBy(sortByQueryParam ? sortByQueryParam : 'name');
  }, []);

  // add sortBy to query params
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) {
      params.append('sortBy', query);
    } else {
      params.delete('sortBy');
    }
    history.push({ search: params.toString() });
  }, [query, history]);

  // handle changes to sortUsersBy.
  // set query param sortBy
  // set new sorted users
  useEffect(() => {
    setQuery(sortUsersBy);
    // sort feed
    setSortedUsers(sortBy(usersList, sortUsersBy));
  }, [sortUsersBy, usersList]);

  // do text search
  const performTextSearchOnUsers = useCallback(
    debounce(async (searchText: string) => {
      console.log(searchText);
      dispatch(searchUsers(searchText, users));
    }, 500),
    [users]
  );

  // handle text search input
  const onSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    performTextSearchOnUsers(searchText);
  };

  return (
    <DefaultLayout>
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={12} sm={6}>
          <h1>Users</h1>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes['users-list__controls']}>
            <TextField
              label="Search"
              variant="outlined"
              onChange={onSearchTextChange}
              style={{ margin: 8 }}
              size="small"
            />
            <FormControl className={classes.formControl}>
              <TextField
                select
                label="Sort Users"
                value={sortUsersBy}
                onChange={(e: any) => {
                  setSortUsersBy(e.target.value);
                }}
                SelectProps={{
                  native: true,
                }}
                variant="outlined"
                size="small"
              >
                <option key="name" value="name">
                  Name
                </option>
                <option key="username" value="username">
                  Username
                </option>
                <option key="email" value="email">
                  Email
                </option>
              </TextField>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12}>
          <UsersTable sortedUsers={sortedUsers} searchQuery={usersSearchResults?.searchString} />
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default UsersList;

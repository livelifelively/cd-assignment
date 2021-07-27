import React, { useEffect, useState, useCallback } from 'react';
import { MenuItem, Select, FormControl, InputLabel, TextField, Grid } from '@material-ui/core';
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
      <Grid container>
        <Grid item xs={12}>
          <h2>Users list</h2>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Search" variant="outlined" onChange={onSearchTextChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel>Sort Users</InputLabel>
            <Select
              value={sortUsersBy}
              onChange={(e: any) => {
                setSortUsersBy(e.target.value);
              }}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="username">Username</MenuItem>
              <MenuItem value="email">Email</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <UsersTable sortedUsers={sortedUsers} searchQuery={usersSearchResults?.searchString} />
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default UsersList;

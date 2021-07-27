import React from 'react';
import { Table, TableContainer, TableBody, TableRow, TableHead, TableCell, Paper } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { isNil } from 'lodash';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    'users-table--heading': {
      fontWeight: 'bold',
    },
    search__highlight: { background: '#5fcbfb' },
  })
);

const UsersTable = ({ sortedUsers, searchQuery }: { sortedUsers: User[]; searchQuery?: string }) => {
  const history = useHistory();
  const classes = useStyles();

  const showUserDetails = (id: number) => {
    history.push(`/user/${id}`);
  };

  const highlightText = (startIndex: number, value: string) => {
    if (!searchQuery) {
      return <span>{value}</span>;
    }

    const endIndex = startIndex + searchQuery.length;

    const preSection = value.substring(0, startIndex);
    const highlightedText = value.substring(startIndex, endIndex);
    const postSection = value.substring(endIndex);

    return (
      <>
        <span>{preSection}</span>
        <span className={classes['search__highlight']}>{highlightedText}</span>
        <span>{postSection}</span>
      </>
    );
  };

  const handleEmailLinkClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes['users-table--heading']} align="left">
              Name
            </TableCell>
            <TableCell className={classes['users-table--heading']} align="left">
              Username
            </TableCell>
            <TableCell className={classes['users-table--heading']} align="right">
              Email
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map((val: User) => (
            <TableRow
              key={val.id}
              onClick={() => {
                showUserDetails(val.id);
              }}
              style={{
                cursor: 'pointer',
              }}
            >
              <TableCell align="left">
                {!isNil(searchQuery) && val.nameMatchIndex !== -1
                  ? highlightText(val.nameMatchIndex, val.name)
                  : val.name}
              </TableCell>
              <TableCell align="left">
                {!isNil(searchQuery) && val.usernameMatchIndex !== -1
                  ? highlightText(val.usernameMatchIndex, val.username)
                  : val.username}
              </TableCell>
              <TableCell align="right">
                <a onClick={handleEmailLinkClick} href={`mailto:${val.email}`}>
                  {!isNil(searchQuery) && val.emailMatchIndex !== -1
                    ? highlightText(val.emailMatchIndex, val.email)
                    : val.email}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;

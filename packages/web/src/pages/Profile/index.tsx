import * as React from 'react';

import { useHistory } from 'react-router-dom';
import { FC, useCallback, useEffect } from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import { useDispatch } from '@share-redux/redux-common';
import { clearAuth } from '@share-redux/redux-common/lib/common/auth/slice';
import { useRetrieveAuthProfile } from '@share-redux/redux-common/lib/common/auth/selectors';

import { combine } from 'utils/formatter/formatString';

const Profile: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useRetrieveAuthProfile();

  useEffect(() => {
    if (!profile.firstName) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    dispatch(clearAuth());
    history.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack>
      <Box>Hello {combine(profile.firstName, profile.lastName)}</Box>
      <Button onClick={logout}>Log out</Button>
    </Stack>
  );
};

export default Profile;

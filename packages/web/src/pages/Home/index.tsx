import * as React from 'react';

import { useHistory } from 'react-router-dom';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch } from '@share-redux/redux-common';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input, Heading, Stack, Button } from '@chakra-ui/react';
import { signIn } from '@share-redux/redux-common/lib/common/auth/slice';
import {
  useRetrieveAuthProfile,
  useRetrieveAuthLoadingState,
} from '@share-redux/redux-common/lib/common/auth/selectors';

interface IFormProps {
  email: string;
  password: string;
}

const Home: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useRetrieveAuthProfile();
  const loadingState = useRetrieveAuthLoadingState();

  const isSubmitting = loadingState === 'loading';

  useEffect(() => {
    if (profile.firstName) {
      history.push('/profile');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { register, handleSubmit } = useForm<IFormProps>({
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
  });

  const signInSuccessCallback = useCallback(() => {
    history.push('/profile');
  }, [history]);

  const onSubmit: SubmitHandler<IFormProps> = useCallback((data) => {
    dispatch(
      signIn({
        data,
        callback: signInSuccessCallback,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack spacing={12} w='100%'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Heading>Email</Heading>
          <Input name='email' ref={register} />
        </Stack>
        <Stack>
          <Heading>Password</Heading>
          <Input name='password' type='password' ref={register} />
        </Stack>
        <Button type='submit' isLoading={isSubmitting}>
          Submit
        </Button>
      </form>
    </Stack>
  );
};

export default Home;

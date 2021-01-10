import * as React from 'react';

import { FC, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import { useDispatch } from '@share-redux/redux-common';
import { Input, Layout, Button } from '@ui-kitten/components';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from '@share-redux/redux-common/lib/common/auth/slice';

import { signInButtonStyles } from './styles';

interface IFormProps {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<IFormProps> = useCallback(
    ({ email, password }) => {
      dispatch(
        signIn({
          data: {
            email,
            password,
          },
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <SafeAreaView>
      <Layout>
        <Controller
          name='email'
          control={control}
          render={({ onChange, onBlur, value }) => {
            return (
              <Input
                value={value}
                onBlur={onBlur}
                placeholder='Email'
                autoCapitalize='none'
                onChangeText={(value) => onChange(value)}
              />
            );
          }}
        />
        <Controller
          name='password'
          control={control}
          render={({ onChange, onBlur, value }) => {
            return (
              <Input
                value={value}
                onBlur={onBlur}
                autoCapitalize='none'
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={(value) => onChange(value)}
              />
            );
          }}
        />
        <Button style={signInButtonStyles} onPress={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default SignIn;

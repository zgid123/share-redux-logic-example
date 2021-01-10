import * as React from 'react';

import { FC } from 'react';
import { Spinner } from '@chakra-ui/react';

const Preloader: FC = () => {
  return (
    <Spinner
      size='xl'
      speed='0.5s'
      thickness='4px'
      color='blue.500'
      emptyColor='gray.200'
    />
  );
};

export default Preloader;

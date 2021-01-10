interface IEnvProps {
  port: number | string;
}

const env: IEnvProps = {
  port: process.env.PORT || 3000,
};

export default env;

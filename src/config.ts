type AppConfig<C> = C extends (...args: any[]) => infer Res
  ? Res
  : C extends Record<any, any>
  ? {
      [K in keyof C]: AppConfig<C[K]>;
    }
  : C;

// our app
const validateConfig = <T extends Record<string, () => any>>(
  config: T
): AppConfig<T> => {
  const confObj = {} as T;
  const errors = [] as string[];

  for (let key in config) {
    try {
      // lazy resolve errors
      confObj[key] = config[key]();
    } catch (err) {
      errors.push(err.toString());
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  return confObj as AppConfig<T>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getStringFromEnvParser = (envName: string) => () => {
  const value = process.env[envName];
  if (!value || value === "") {
    throw new Error(`env variable: ${envName} is invalid`);
  }
  console.log(value);
  return value;
};

const getNumberFromEnvParser = (envName: string) => () => {
  const value = parseFloat(process.env[envName] ?? "");
  console.log(value);
  return value;
};

export const config = validateConfig({
  DEFAULT_SPEED: getNumberFromEnvParser("REACT_APP_DEFAULT_SPEED"),
});

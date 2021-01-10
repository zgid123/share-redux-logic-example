interface ICombineOptionsProps {
  joinWith: string;
}

const compact = (source: (string | undefined)[]): string[] => {
  return source.filter((s) => !!s) as string[];
};

export const toSentence = (source: string[]): string => {
  return compact(source)
    .join(', ')
    .replace(/,(?=[^,]*$)/, ' and');
};

export const combine = (
  opts: ICombineOptionsProps | string | undefined = '',
  ...params: (string | undefined)[]
): string => {
  let options: ICombineOptionsProps = { joinWith: ' ' };

  if (typeof opts === 'object') {
    options = opts;
  } else {
    params = [opts, ...params];
  }

  const { joinWith } = options;

  return compact(params).join(joinWith);
};

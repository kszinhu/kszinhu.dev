// on '.' append the object attribute you want to group by
// 'company.name' in this case
// { company: { name: 'Google' } } => { Google: [{ company: { name: 'Google' } }]

type DeepKeyOfWithAppendedDot<T> = T extends object
  ? {
      [K in keyof T]-?: `${string & K}` | `${string & K}.${DeepKeyOfWithAppendedDot<T[K]>}`;
    }[keyof T]
  : never;

export default function groupBy<T>(
  array: T[],
  key: DeepKeyOfWithAppendedDot<T> & string
): Record<string, T[]> {
  return array.reduce(
    (acc, item) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const groupKey = key.split('.').reduce((acc: any, key) => acc[key], item);
      return {
        ...acc,
        [groupKey]: [...(acc[groupKey] || []), item],
      };
    },
    {} as Record<string, T[]>
  );
}

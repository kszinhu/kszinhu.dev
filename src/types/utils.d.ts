export type RemoveLastItemFromType<T extends any[]> = T extends [...infer Head, any] ? Head : any[];
export type TypeIndex<A extends any[], I> = { [K in keyof A]: A[K] extends I ? K : never }[number];
export type RemoveItemsByType<T extends any[], I> = { [K in TypeIndex<T, I>]?: never } extends {
  [key: number]: never;
}
  ? T[number]
  : RemoveItemsByType<RemoveLastItemFromType<T>, I>;
export type RemoveItemsByTypes<T extends any[], Types extends any[]> = {
  [K in keyof Types]: RemoveItemsByType<T, Types[K]>;
}[number];

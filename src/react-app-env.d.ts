/// <reference types="react-scripts" />

interface ImmutableMap<T> extends Map<string, any> {
  get<K extends keyof T>(name: K): T[K];
  getIn<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
    path: [K1, K2, K3],
  ): T[K1][K2][K3];
  getIn<K1 extends keyof T, K2 extends keyof T[K1]>(path: [K1, K2]): T[K1][K2];
  getIn<K1 extends keyof T>(path: [K1]): T[K1];
  getIn(keyPath: any[], notSetValue?: any): any;
  toJS(): {};
}

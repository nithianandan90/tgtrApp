import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";





type EagerItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Item, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly price?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Item, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly price?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Item = LazyLoading extends LazyLoadingDisabled ? EagerItem : LazyItem

export declare const Item: (new (init: ModelInit<Item>) => Item) & {
  copyOf(source: Item, mutator: (draft: MutableModel<Item>) => MutableModel<Item> | void): Item;
}

type EagerDeal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Deal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly radius?: string | null;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly location?: string | null;
  readonly image?: string | null;
  readonly maxRadius?: number | null;
  readonly expiryDate?: string | null;
  readonly userID: string;
  readonly User?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDeal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Deal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly radius?: string | null;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly location?: string | null;
  readonly image?: string | null;
  readonly maxRadius?: number | null;
  readonly expiryDate?: string | null;
  readonly userID: string;
  readonly User: AsyncItem<User | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Deal = LazyLoading extends LazyLoadingDisabled ? EagerDeal : LazyDeal

export declare const Deal: (new (init: ModelInit<Deal>) => Deal) & {
  copyOf(source: Deal, mutator: (draft: MutableModel<Deal>) => MutableModel<Deal> | void): Deal;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly sub?: string | null;
  readonly image?: string | null;
  readonly address?: string | null;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly email?: string | null;
  readonly fcmToken?: string | null;
  readonly status?: string | null;
  readonly Deals?: (Deal | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly sub?: string | null;
  readonly image?: string | null;
  readonly address?: string | null;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly email?: string | null;
  readonly fcmToken?: string | null;
  readonly status?: string | null;
  readonly Deals: AsyncCollection<Deal>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}
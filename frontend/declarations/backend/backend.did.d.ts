import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Post {
  'id' : bigint,
  'title' : string,
  'content' : string,
  'timestamp' : Time,
}
export type Result = { 'ok' : bigint } |
  { 'err' : string };
export type Time = bigint;
export interface _SERVICE {
  'createPost' : ActorMethod<[string, string], Result>,
  'getPost' : ActorMethod<[bigint], [] | [Post]>,
  'getPosts' : ActorMethod<[], Array<Post>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

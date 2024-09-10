import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Error "mo:base/Error";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
  type Post = {
    id: Nat;
    title: Text;
    content: Text;
    timestamp: Time.Time;
  };

  stable var nextPostId: Nat = 0;
  stable var postEntries: [(Nat, Post)] = [];

  let posts = HashMap.fromIter<Nat, Post>(postEntries.vals(), 0, Nat.equal, Hash.hash);

  public func createPost(title: Text, content: Text) : async Result.Result<Nat, Text> {
    let id = nextPostId;
    let post: Post = {
      id = id;
      title = title;
      content = content;
      timestamp = Time.now();
    };
    posts.put(id, post);
    nextPostId += 1;
    #ok(id)
  };

  public query func getPosts() : async [Post] {
    Iter.toArray(posts.vals())
  };

  public query func getPost(id: Nat) : async ?Post {
    posts.get(id)
  };

  system func preupgrade() {
    postEntries := Iter.toArray(posts.entries());
  };

  system func postupgrade() {
    postEntries := [];
  };
}

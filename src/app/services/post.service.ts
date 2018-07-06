import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Post } from '../models/post.model';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated: Subject<Post[]> = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostsListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}

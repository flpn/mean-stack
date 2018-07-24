import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../models/post.model';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated: Subject<{ posts: Post[], postsCount: number }> = new Subject<{ posts: Post[], postsCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(pageSize: number, currentPage: number) {
    const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;

    return this.http.get<{ posts: any, maxPosts: number }>('http://localhost:3000/api/posts' + queryParams)
      .pipe(map(postData => {
        return {
          posts: postData.posts.map(post => {
          return {
            id: post._id,
            title: post.title,
            content: post.content,
            imagePath: post.imagePath
          };
        }),
        maxPosts: postData.maxPosts
      };
      }))
      .subscribe(postsData => {
        // console.log(postsData);
        this.posts = postsData.posts;
        this.postsUpdated.next({posts: [...this.posts], postsCount: postsData.maxPosts});
      });
  }

  getPost(id: string) {
    return this.http.get<Post>(`http://localhost:3000/api/posts/${id}`);
  }

  getPostsListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);


    this.http.post<Post>('http://localhost:3000/api/posts', postData)
      .subscribe(newPost => {
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: FormData | Post;

    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = { id: id, title: title, content: content, imagePath: image };
    }

    this.http.put(`http://localhost:3000/api/posts/${id}`, postData)
      .subscribe(result => {
        this.router.navigate(['/']);
      });
  }

  deletePost(id: string) {
    return this.http.delete(`http://localhost:3000/api/posts/${id}`);
  }
}

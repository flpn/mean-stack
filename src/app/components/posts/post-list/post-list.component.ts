import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Post } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  postList: Post[] = [];
  postsSubscription: Subscription;

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts();
    this.postsSubscription = this.postService.getPostsListener()
      .subscribe(posts => {
        this.postList = posts;
      });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}

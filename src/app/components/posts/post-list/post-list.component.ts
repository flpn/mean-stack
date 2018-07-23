import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';

import { Subscription } from 'rxjs';

import { Post } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  postList: Post[] = [];
  postsSubscription: Subscription;
  totalPost = 10;
  postsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postsSubscription = this.postService.getPostsListener()
      .subscribe(posts => {
        this.postList = posts;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

  onDelete(id: string) {
    this.postService.deletePost(id);
  }

  onChangedPage(pageData: PageEvent) {

  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';

import { Subscription } from 'rxjs';

import { Post } from '../../../models/post.model';

import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  isAuthenticated = false;
  postList: Post[] = [];
  postsSubscription: Subscription;
  authStatusSubscription: Subscription;

  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSubscription = this.postService.getPostsListener()
      .subscribe((postData: { posts: Post[], postsCount: number }) => {
        this.postList = postData.posts;
        this.totalPosts = postData.postsCount;
        this.isLoading = false;
      });

    this.isAuthenticated = this.authService.getIsAuthenticated();

    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.authStatusSubscription.unsubscribe();
  }

  onDelete(id: string) {
    this.isLoading = true;
    this.postService.deletePost(id)
      .subscribe(() => {
        this.postService.getPosts(this.postsPerPage, this.currentPage);
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;

    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }
}

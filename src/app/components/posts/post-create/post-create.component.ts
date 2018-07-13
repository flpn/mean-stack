import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../../../services/post.service';

import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  private mode: string;
  post: Post;
  isLoading: Boolean;

  constructor(public postService: PostService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this. mode = 'create';
    this.isLoading = false;

    this.activatedRoute.paramMap
    .subscribe((paramMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        const id = paramMap.get('postId');

          this.isLoading = true;
          this.postService.getPost(id)
            .subscribe(post => {
              this.post = post;
              this.isLoading = false;
            });

        }
      });
  }

  onSavePost(postForm: NgForm) {
    if (!postForm.valid) {
      return;
    }

    this.isLoading = true;
    const title = postForm.value.title;
    const content = postForm.value.content;

    if (this.mode === 'create') {
      this.postService.addPost(title, content);
    } else {
      this.postService.updatePost(this.post.id, title, content);
    }

    postForm.resetForm();
  }

}

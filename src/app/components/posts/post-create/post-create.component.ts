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
  titleInput: string;
  contentInput: string;

  constructor(public postService: PostService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.titleInput = '';
    this.contentInput = '';
    this. mode = 'create';

    this.activatedRoute.paramMap
      .subscribe((paramMap) => {
        if (paramMap.has('postId')) {
          this.mode = 'edit';
          const id = paramMap.get('postId');

          this.postService.getPost(id)
            .subscribe(post => this.post = post);

        }
      });
  }

  onSavePost(postForm: NgForm) {
    if (!postForm.valid) {
      return;
    }

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

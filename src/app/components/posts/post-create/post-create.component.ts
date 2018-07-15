import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  form: FormGroup;
  post: Post;
  isLoading: Boolean;

  constructor(public postService: PostService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this. mode = 'create';
    this.isLoading = false;

    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null, {validators: [Validators.required]})
    });

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

              this.form.setValue({
                'title': this.post.title,
                'content': this.post.content
              });
            });
        }
      });
  }

  onSavePost() {
    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;
    const title = this.form.value.title;
    const content = this.form.value.content;

    if (this.mode === 'create') {
      this.postService.addPost(title, content);
    } else {
      this.postService.updatePost(this.post.id, title, content);
    }

    this.form.reset();
  }

}

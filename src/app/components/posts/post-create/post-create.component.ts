import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  titleInput: string;
  contentInput: string;

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.titleInput = '';
    this.contentInput = '';
  }

  onAddPost(postForm: NgForm) {
    if (!postForm.valid) {
      return;
    }

    this.postService.addPost(postForm.value.title, postForm.value.content);
    postForm.resetForm();
  }

}

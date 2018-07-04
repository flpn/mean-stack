import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  titleInput: string;
  contentInput: string;
  @Output() postCreated: EventEmitter<Post> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.titleInput = '';
    this.contentInput = '';
  }

  onAddPost(postForm: NgForm) {
    if (!postForm.valid) {
      return;
    }

    const post: Post = {
      title: postForm.value.title,
      content: postForm.value.content
    };

    this.postCreated.emit(post);
  }

}

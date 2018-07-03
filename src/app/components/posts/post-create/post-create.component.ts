import { Component, OnInit, EventEmitter, Output } from '@angular/core';

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

  onAddPost() {
    const post: Post = {
      title: this.titleInput,
      content: this.contentInput
    };

    this.postCreated.emit(post);
  }

}

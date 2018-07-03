import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  titleInput: string;
  contentInput: string;
  @Output() postCreated = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.titleInput = '';
    this.contentInput = '';
  }

  onAddPost() {
    const post = {
      title: this.titleInput,
      content: this.contentInput
    };

    this.postCreated.emit(post);
  }

}

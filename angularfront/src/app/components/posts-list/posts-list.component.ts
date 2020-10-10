import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts: any;
  title = "";
  currentPost = null;
  currentIndex = -1;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.retrievePosts();
  }

  retrievePosts(): void {
    this.postService.getAll()
      .subscribe(
        data => {
          this.posts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrievePosts();
    this.currentIndex = -1;
    this.currentPost = null;
  }

  setActivePost(post, index): void {
    this.currentPost = post;
    this.currentIndex = index;
  }

  removeAllPosts(): void {
    this.postService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrievePosts();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.postService.findByTitle(this.title)
      .subscribe(
        data => {
          this.posts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}

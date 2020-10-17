import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  currentPost = null;
  message = '';

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router  
  ) {  }

  ngOnInit(): void {
    this.message = "";
    this.getPost(this.route.snapshot.paramMap.get('id'));
  }

  getPost(id): void {
    this.postService.get(id)
    .subscribe(
      data => {
        this.currentPost = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
    }

    updatePost(): void {
      this.postService.update(this.currentPost.id, this.currentPost)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'Esta postagem foi atualizada com sucesso.';
        },
        error => {
          console.log(error);
        });
    }

    deletePost(): void {
      this.postService.delete(this.currentPost.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/posts'])
        },
        error => {
          console.log(error);
        });
    }

    updatePublished(status): void {
      const data = {
        title: this.currentPost.title,
        description: this.currentPost.description,
        published: status
      };

      this.postService.update(this.currentPost.id, data)
      .subscribe(
        response => {
          this.currentPost.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
    }
}

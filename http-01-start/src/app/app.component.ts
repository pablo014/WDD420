import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import {Posts} from './post.model'
import { PostService} from './post.service'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,OnDestroy{
  loadedPosts: Posts[] = [];
  isFetching = false
  error = null
  private errorSub = new Subscription

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage
    })
    this.isFetching = true
    this.postService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false
        this.loadedPosts = posts
      }, error => {
        this.error = error.message
      }
    )
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe()
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content)
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true
    this.postService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false
        this.loadedPosts = posts
      }, error => {
        this.error = error.message
      })
    }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(
      () => {
        this.loadedPosts = [];

      }
    )
  }
  onHandleError() {
    this.error = null
  }
}

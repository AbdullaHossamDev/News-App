import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NewsService } from 'src/app/services/news/news.service';
import { ErrorHandlerService } from 'src/app/services/errorHandler/error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { NewViewComponent } from '../new-view/new-view.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  status: String;

  allNews: Array<any>;
  displayedNews: Array<any>;

  numDisplayNews: number;

  userName: String;
  constructor(
    private authServ: AuthService,
    private newsServ: NewsService,
    private errServ: ErrorHandlerService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.userName = this.authServ.getName();
  }

  ngOnInit(): void {
    this.numDisplayNews = 10;
    this.activatedRoute.params.subscribe((params) => {
      this.status = params.status;
      if (this.status == 'news') {
        this.getAll()
      }
      else if (this.status == 'favorites' && this.authServ.isLoggedIn()) {
        this.getMyFav()
      }
      else{
        this.router.navigate(['/home/news'])
      }
    })
  }

  getAll() {
    this.newsServ.getAll().subscribe(
      (data) => {
        if (data.status == 200) {
          this.allNews = data.body;
          this.addToDisplay()
        }
      },
      (err) => {
        if (err.status == 500) {
          this.errServ.showError(err.error.msg)
        } else {
          this.errServ.showError('Please check your network')
        }
      }
    )
  }

  getMyFav() {
    this.newsServ.getFav().subscribe(
      (data) => {
        if (data.status == 200) {
          if (data.body.length > 0) {
            this.allNews = data.body;
            this.displayedNews = [...data.body]
            this.numDisplayNews = 10;
            this.filterDisplayed()
          }else{
            this.authServ.snackBar(`You don't have any new in your favorite list`, 5000)
            setTimeout(()=>{
              this.router.navigate(['/home/news'])
            },5000)
          }
        }
      },
      (err) => {
        if (err.status == 500) {
          this.errServ.showError(err.error.msg)
        } else {
          this.errServ.showError('Please check your network')
        }
      }
    )
  }

  addToDisplay() {
    console.log(this.allNews)
    this.displayedNews = [...this.allNews[0], ...this.allNews[1], ...this.allNews[2], ...this.allNews[3]]
    this.filterDisplayed();
  }

  filterDisplayed() {
    this.displayedNews.sort((a, b) => {
      var dateA = new Date(a.publishedAt), dateB = new Date(b.publishedAt);
      return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
    })
    this.displayedNews = this.displayedNews.filter(nw => {
      return nw.source.name && nw.author && nw.title && nw.description && nw.url && nw.urlToImage && nw.publishedAt;
    })
  }

  addToFav(newData) {
    if (this.authServ.isLoggedIn()) {
      this.newsServ.addToFav(newData).subscribe(
        (data) => {
          if (data.status == 200) {
            newData._id = data.body._id
            this.authServ.snackBar('New added successfully to your favorites list')
          }
        },
        (err) => {
          if (err.status == 500) {
            this.errServ.showError(err.error.msg)
          } else if (err.status == 400) {
            this.errServ.showError('This new miss some important data!')
          } else {
            this.errServ.showError('Please check your network')
          }
        }
      )
    } else {
      this.errServ.showError('You should login first to be able to add news to your favorites list')
    }
  }

  newView(newData) {
    const dialogRef = this.dialog.open(NewViewComponent, {
      width: '550px',
      height: '600px',
      data: newData,
      panelClass: 'custom-modalbox'

    });
  }

  deleteFromFav(newData, ind) {
    this.newsServ.removeFromFav(newData).subscribe(
      (data) => {
        if (data.status == 200) {
          this.authServ.snackBar('New deleted successfully from your favorites list')
          delete newData._id
          if(this.status == 'favorites'){
            this.displayedNews.splice(ind, 1)
          }
        }
      },
      (err) => {
        if (err.status == 500) {
          this.errServ.showError(err.error.msg)
        } else {
          this.errServ.showError('Please check your network')
        }
      }
    )
  }

  filter(formData) {
    this.displayedNews = [];
    this.numDisplayNews = 10;
    if (formData.egypt) {
      if ((formData.business && formData.sports) || (!formData.business && !formData.sports)) {
        this.displayedNews.push(...this.allNews[0])
        this.displayedNews.push(...this.allNews[1])
      } else if (formData.business) {
        this.displayedNews.push(...this.allNews[0])
      } else {
        this.displayedNews.push(...this.allNews[1])
      }
    }

    if (formData.uae) {
      if ((formData.business && formData.sports) || (!formData.business && !formData.sports)) {
        this.displayedNews.push(...this.allNews[2])
        this.displayedNews.push(...this.allNews[3])
      } else if (formData.business) {
        this.displayedNews.push(...this.allNews[2])
      } else {
        this.displayedNews.push(...this.allNews[3])
      }
    }

    if (!formData.egypt && !formData.uae) {
      if (formData.business) {
        this.displayedNews.push(...this.allNews[0])
        this.displayedNews.push(...this.allNews[2])
      }
      if (formData.sports) {
        this.displayedNews.push(...this.allNews[1])
        this.displayedNews.push(...this.allNews[3])
      }
    }

    if (this.displayedNews.length == 0) {
      this.addToDisplay()
    }

    this.filterDisplayed()

  }

  increasePostDisplay() {
    this.numDisplayNews += 5;
  }

}

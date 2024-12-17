import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-slt-ctg',
  imports: [FormsModule],
  templateUrl: './slt-ctg.component.html',
  styleUrl: './slt-ctg.component.css'
})
export class SltCtgComponent implements OnInit {

  categoryId: string = '';
  difficulty:string = '';
  categoryList: any[] = []

  http = inject(HttpClient)
  route = inject(Router)

  apiUrl: string = `https://opentdb.com/api_category.php`

  ngOnInit(): void {
    // Fetch categories from API
    this.http.get(this.apiUrl).subscribe({
      next: (response: any) => {
        if (response && response.trivia_categories) {
          this.categoryList = response.trivia_categories;
          console.log(response)
        } else {
          this.categoryList = [];
        }
      },
      error: (error) => {
        console.error("Error fetching categories:", error);
        this.categoryList = [];
      }
    });
  }

  onSubmit():void{
    this.route.navigate(['/quiz'], {
      queryParams: {categoryId: this.categoryId, difficulty: this.difficulty}
    })
  }
}  

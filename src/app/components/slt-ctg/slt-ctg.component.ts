import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';

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
  isLoading = false;
  
  route = inject(Router)
  apiService = inject(ApiServiceService)


  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.getCategories().subscribe({
      next: (response: any) => {
        if (response && response.trivia_categories) {
          this.categoryList = response.trivia_categories;
          this.isLoading = false;
        } else {
          this.categoryList = [];
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error("Error fetching categories:", error);
        this.categoryList = [];
        this.isLoading = false;
      }
    });
  }

  onSubmit():void{
    this.route.navigate(['/quiz'], {
      queryParams: {categoryId: this.categoryId, difficulty: this.difficulty}
    })
  }
}  

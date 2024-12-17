import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
  standalone:true
})
export class QuizComponent implements OnInit {
  categoryId: string = '';
  difficulty: string = '';
  questions: any[] = []; 
  options:string[] = []
  currentQuestionIndex:number = 0

  route = inject(ActivatedRoute);
  http = inject(HttpClient);

  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.difficulty = params['difficulty'];
      
      this.http.get(`https://opentdb.com/api.php?amount=10&category=${this.categoryId}&difficulty=${this.difficulty}&type=multiple`)
      .subscribe((res: any) => {
        if (res && Array.isArray(res.results)) {
          console.log(res.results)
          this.questions = res.results;
          this.provideOptions()
          console.log(this.options)

          } else {
            this.questions = [];
          }
        });
    });
  }

  provideOptions(){
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
    this.options = this.shuffleOptions(this.options)
  }

  shuffleOptions(options:string[]):string[] {
    return options.sort(() => Math.random() - 0.5)
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.provideOptions();
    }
  }

}

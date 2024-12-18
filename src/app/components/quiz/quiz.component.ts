import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
  standalone: true
})
export class QuizComponent implements OnInit {

  constructor(private cdRef: ChangeDetectorRef){}

  categoryId: string = '';
  difficulty: string = '';
  questions: any[] = [];
  options: string[] = []
  currentQuestionIndex: number = 0

  isLoading = false;

  route = inject(ActivatedRoute);
  navigator = inject(Router)
  apiService = inject(ApiServiceService);


  ngOnInit(): void {
    this.isLoading = true;

    this.startTimer()

    this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.difficulty = params['difficulty'];

      this.apiService.getQuestions(this.categoryId, this.difficulty).subscribe((res: any) => {
        if (res && Array.isArray(res.results)) {
          this.questions = res.results;
          this.provideOptions()
          this.startTimer()
          this.isLoading = false
        } else {
          this.questions = [];
          this.isLoading = false;
        }
      }, (err)=>{
        this.isLoading = false;
        this.questions = []
        console.log(err)
      });
    });

  }

 

  provideOptions() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
    this.options = this.shuffleOptions(this.options)
    this.correctAnswer = currentQuestion.correct_answer
  }

  shuffleOptions(options: string[]): string[] {
    return options.sort(() => Math.random() - 0.5)
  }

  // Next Question

  nextQuestion(): void {
    this.isLoading = true
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.provideOptions();
      this.startTimer()
      this.isLoading = false
    }
    else{
      this.isLoading = false
      this.onComplete()
    }

  }

  // Submit

  correctAnswer:string = ''
  selectedAnswer:string = ''

  isCorrect:boolean= false
  result:string = ''
  points:number = 0
  

  selectedOption(option:string){
    this.selectedAnswer = option;
  }
  
  onSubmit(){
    
    this.isCorrect = this.selectedAnswer === this.correctAnswer
    this.result = this.isCorrect ? "correct" : "incorrect"
    this.isCorrect ? this.points += 5 : this.points += 0

    setTimeout(() => {
      this.nextQuestion()
      this.result = ''
    }, 1000);
  }




//Timer

  countdownTIme:number = 30
  isValidTime:any = '' 

  startTimer(){
    if(this.isValidTime){
      clearInterval(this.isValidTime)
    }

    this.countdownTIme = 30
    this.isValidTime = setInterval(() => {
      if(this.countdownTIme > 0){
        this.countdownTIme --
      }
      else{
        clearInterval(this.isValidTime)
        this.nextQuestion();
      }
    }, 1000);
  }

onComplete(){
  if(this.currentQuestionIndex >= this.questions.length - 1){
     this.navigator.navigate(['/result'], {
      queryParams: {points: this.points}
     })
  }
}

}

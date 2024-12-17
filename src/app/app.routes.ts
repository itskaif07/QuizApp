import { Routes } from '@angular/router';
import { SltCtgComponent } from './components/slt-ctg/slt-ctg.component';
import { QuizComponent } from './components/quiz/quiz.component';

export const routes: Routes = 
[
    {
        path:"",
        redirectTo:"slt-ctg",
        pathMatch: "full"
    },
    {
        path:"slt-ctg",
        component:SltCtgComponent
    },
    {
        path: "quiz",
        component:QuizComponent
    }
];

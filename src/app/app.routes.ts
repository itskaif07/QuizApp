import { Routes } from '@angular/router';
import { SltCtgComponent } from './components/slt-ctg/slt-ctg.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';

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
    },
    {
        path: "result",
        component:ResultComponent
    }
];

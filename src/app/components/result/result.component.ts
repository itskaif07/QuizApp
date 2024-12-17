import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-result',
  imports: [CommonModule, RouterLink],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {

  points: number = 0;  // Set a default value instead of null

  route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Retrieve the 'points' from the query parameters
    const pointsParam = this.route.snapshot.queryParamMap.get('points');

    if (pointsParam !== null) {
      // Convert the points from string to number
      this.points = parseInt(pointsParam, 10);
    }
   
  }
}


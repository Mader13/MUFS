import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  @Input()
  visible = false;
  @Input()
  notFoundMessage = 'Ничего не найдено!';
  @Input()
  resetLinkText = 'Сброс';
  @Input()
  resetLinkRoute = '/';

  constructor() {}

  ngOnInit(): void {}
}

import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Photo } from '../../../core/models/photo.model';

@Component({
  selector: 'app-photo-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.scss',
})
export class PhotoCardComponent {
  photo = input.required<Photo>();
  isFavorite = input(false);
  // 'add' = stream (clicking adds to favorites), 'view' = favorites page (clicking opens detail)
  viewMode = input<'add' | 'view'>('add');

  cardClicked = output<Photo>();
}

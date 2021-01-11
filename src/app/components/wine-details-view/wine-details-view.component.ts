import { AfterViewInit, Component, Input } from '@angular/core';
import { Wine } from '../../model/wine';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PictureService } from '../../service/picture.service';
import { DetailSection } from '../../model/detailSection';
import { DetailViewService } from '../../service/detail-view.service';

@Component({
  selector: 'app-wine-details-view',
  templateUrl: './wine-details-view.component.html',
  styleUrls: ['./wine-details-view.component.css'],
  animations: [trigger('detailExpand', [
    state('collapsed', style({ height: '0px', minHeight: '0' })),
    state('expanded', style({ height: '*' })),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ])]
})
export class WineDetailsViewComponent implements AfterViewInit {

  @Input()
  wine: Wine;
  detailsDataSections: Array<DetailSection> = new Array<DetailSection>();


  constructor(public pictureService: PictureService, public detailViewService: DetailViewService) {
  }

  ngAfterViewInit(): void {
    const wineFields = this.detailViewService.getWineFields(this.wine);
    const opticalValueFields = this.detailViewService.getOpticalValueFields(this.wine);
    const noseValueFields = this.detailViewService.getNoseValueFields(this.wine);
    const flavorValueFields = this.detailViewService.getFlavorValueFields(this.wine);

    this.detailsDataSections.push(new DetailSection('Allgeimein', wineFields));
    this.detailsDataSections.push(new DetailSection('Optischer Eindruck', opticalValueFields));
    this.detailsDataSections.push(new DetailSection('Nase', noseValueFields));
    this.detailsDataSections.push(new DetailSection('Geschmack', flavorValueFields));
  }
}

import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ListLayoutComponent } from '../../../layouts/list-layout/list-layout.component';
import { Tech } from '@/@types/tech.type';
import { TechsService } from '@/services/techs.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-techs-list',
  imports: [ListLayoutComponent, MatButtonModule],
  templateUrl: './techs-list.component.html',
  styleUrl: './techs-list.component.scss',
})
export class TechsListComponent implements OnInit {
  private techsService = inject(TechsService);
  private router = inject(Router);

  protected data: Tech[] = [];
  protected loading = false;
  protected pageSize = 10;
  protected pageIndex = 0;
  protected length = 50;

  @ViewChild('name', { static: true }) nameTemplate!: TemplateRef<unknown>;

  ngOnInit(): void {
    this.getTechs();
  }

  getTechs() {
    this.loading = true;

    this.techsService.getAllTechs().subscribe(({ items, total }) => {
      this.data = items;
      this.length = total;
      this.loading = false;
    });
  }

  createTech() {
    this.router.navigate([`/create-tech`]);
  }

  handlePageChange(e: PageEvent) {
    console.log(e);
  }

  showTechInfo({ id }: Tech) {
    this.router.navigate([`/tech/${id}`]);
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {FormBuilder} from '@angular/forms';
import {of, Subscription} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companies: ICompany[] = [];
  page = 1;
  itemsPerPage: number;
  totalItems: number;
  displayedColumns: string[] = ['name', 'sector', 'siren', 'action'];
  column = 'name';
  direction = 'asc';
  searchForm = this.fb.group({
    name: [''],
    sector: [''],
    siren: ['']
  });
  sectorList: ISector[];
  subs: Subscription[] = [];
  constructor(private companyService: CompanyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.companyService.getSectorList().subscribe((sector: ISector[]) => {
      this.sectorList = sector;
    });
    this.setInfoPage();
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  /**
   * Change la page de la liste
   * @param page number
   */
  pageChanged(page: number) {
    this.page = page;
    this.setInfoPage();
  }

  /**
   * Récupère les données à afficher
   */
  setInfoPage() {
    const data = this.searchForm.value;
    data.page = this.page;
    data.direction = this.direction;
    data.column = this.column;
    const searchSub = this.companyService.searchCompanie(data).pipe(
      tap((companies: IPaginateResponse<ICompany[]>) => {
        this.companies = companies.data;
        this.itemsPerPage = companies.per_page;
        this.totalItems = companies.total;
      }),
      catchError((err) => {
        return of();
      })).subscribe();
    this.subs.push(searchSub);
  }

  /**
   * Filtre le tableau
   */
  filterBy(column: string) {
    if (column === this.column) {
      this.direction = (this.direction === 'asc') ? 'desc' : 'asc';
    } else {
      this.column = column;
      this.direction = 'asc';
      this.page = 1;
    }
    this.setInfoPage();
  }

  onSubmit() {
    this.setInfoPage();
  }

}
